import { NextResponse } from 'next/server';
import { dbAsset } from '@/lib/db';
import { AssetLog } from '@/lib/system-logger';

export async function GET(request: Request) {
  try {
    // Fetch all items that have a document number
    const allItems = await dbAsset.consumables.findMany({
      where: {
        document_number: { not: null }
      },
      orderBy: {
        request_date: 'desc',
      },
    });
    
    // Group and aggregate manually
    const groupedDocs = allItems.reduce((acc: any, item) => {
      const docNo = item.document_number!;
      
      if (!acc[docNo]) {
        acc[docNo] = {
          document_number: docNo,
          request_date: item.request_date,
          total_items: 0,
          pending_items: 0,
          completed_items: 0,
          items: [] // Keep track of items just in case, or for validation
        };
      }

      acc[docNo].total_items += 1;
      if (item.status === 'PENDING') {
        acc[docNo].pending_items += 1;
      } else if (item.status === 'COMPLETED') {
        acc[docNo].completed_items += 1;
      }
      
      return acc;
    }, {});

    // Convert object to array
    const data = Object.values(groupedDocs).sort((a: any, b: any) => 
        new Date(b.request_date).getTime() - new Date(a.request_date).getTime()
    );

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const docNo = searchParams.get('doc_no');

    if (!docNo) {
      return NextResponse.json({ message: 'Document Number required' }, { status: 400 });
    }

    // Delete all items with this document number
    const result = await dbAsset.consumables.deleteMany({
      where: {
        document_number: docNo
      }
    });

    await AssetLog.delete('ConsumableRequest', docNo, `Deleted document ${docNo} and ${result.count} items`, {
        count: result.count,
        document_number: docNo
    });

    return NextResponse.json({ message: `Deleted ${result.count} items` });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
