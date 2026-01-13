import { NextResponse } from 'next/server';
import { dbAsset } from '@/lib/db';
import ExcelJS from 'exceljs';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Helper function to extract URL from Excel cell
function extractUrl(cell: any): string {
  if (!cell) return '';
  if (typeof cell === 'string') return cell.trim();
  if (typeof cell === 'object') {
    if ('hyperlink' in cell) return cell.hyperlink;
    if ('text' in cell) return cell.text;
    if ('result' in cell) return cell.result?.toString() || '';
  }
  const str = String(cell);
  if (str === '[object Object]' || str.includes('{"')) return '';
  return str.trim();
}

// Helper function to download image from URL
async function downloadImage(url: string, savePath: string): Promise<boolean> {
  try {
    if (!url || !url.startsWith('http')) return false;

    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!response.ok) return false;

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('image')) return false;

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await writeFile(savePath, buffer);
    return true;
  } catch (error) {
    console.error(`Failed to download image from ${url}:`, error);
    return false;
  }
}

// Helper function to get file extension from URL or content-type
function getExtension(url: string): string {
  const urlPath = url.split('?')[0];
  const ext = urlPath.split('.').pop()?.toLowerCase();
  if (ext && ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
    return ext;
  }
  return 'jpg'; // default
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.getWorksheet(1);

    if (!worksheet) {
      return NextResponse.json({ message: 'Invalid excel file' }, { status: 400 });
    }

    const now = new Date();
    const docNumber = `REQ/${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${Date.now().toString().slice(-6)}`;

    // Parse rows first
    const rowsData: any[] = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // skip header

      const itemName = row.getCell(2).value?.toString()?.trim();
      if (!itemName) return;

      const brandType = row.getCell(3).value?.toString()?.trim() || '';
      const qty = parseInt(row.getCell(4).value?.toString() || '1') || 1;
      const price = parseFloat(row.getCell(5).value?.toString() || '0') || 0;
      const remark = row.getCell(6).value?.toString()?.trim() || '';
      const purchaseLink = extractUrl(row.getCell(7).value);
      const imageUrl = extractUrl(row.getCell(8).value); // Column 8 for image URL

      rowsData.push({
        item_name: itemName,
        brand_type: brandType,
        qty_estimated: qty,
        price_estimated: price,
        purchase_link: purchaseLink,
        remarks: remark,
        document_number: docNumber,
        status: 'PENDING' as const,
        request_date: new Date(),
        _imageUrl: imageUrl, // temporary field for processing
      });
    });

    if (rowsData.length === 0) {
      return NextResponse.json({ message: 'No valid data found' }, { status: 400 });
    }

    // Create items one by one to get IDs for image download
    let successCount = 0;
    let imageDownloadCount = 0;

    for (const rowData of rowsData) {
      const imageUrl = rowData._imageUrl;
      delete rowData._imageUrl; // remove temp field before insert

      // Create the consumable
      const created = await dbAsset.consumables.create({
        data: rowData,
      });

      successCount++;

      // Download image if URL provided
      if (imageUrl) {
        const ext = getExtension(imageUrl);
        const filename = `item-${Date.now()}-imported.${ext}`;
        const uploadDir = join(process.cwd(), 'public/uploads/consumables', created.id.toString());
        const filePath = join(uploadDir, filename);

        await mkdir(uploadDir, { recursive: true });

        const downloaded = await downloadImage(imageUrl, filePath);
        if (downloaded) {
          // Update the consumable with image path
          await dbAsset.consumables.update({
            where: { id: created.id },
            data: { item_image: `/uploads/consumables/${created.id}/${filename}` }
          });
          imageDownloadCount++;
        }
      }
    }

    return NextResponse.json({
      message: `Successfully imported ${successCount} items (${imageDownloadCount} images downloaded)`,
      count: successCount,
      images_downloaded: imageDownloadCount,
      document_number: docNumber
    });

  } catch (error: any) {
    console.error("Import Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
