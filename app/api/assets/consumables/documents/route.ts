import { NextResponse } from 'next/server';
import { dbAsset } from '@/lib/db';

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
