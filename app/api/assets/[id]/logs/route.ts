import { NextResponse } from "next/server";
import { dbAsset } from "@/lib/db";

function serializeBigInt(data: any): any {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    


    // 2. Fetch Asset Transactions (Business Logic: Purchase, Move, Condition Change)
    const transactions = await dbAsset.asset_transactions.findMany({
      where: {
        asset_id: BigInt(id)
      },
      include: {
        previous_holder: true,
        new_holder: true
      },
      orderBy: {
        transaction_date: 'desc'
      }
    });

    // 2. Map transactions to common format
    const mappedTransactions = transactions.map(trans => {
      return {
        id: `trans-${trans.id}`,
        action: trans.transaction_type,
        details: trans.remarks || '',
        user_name: trans.creator_name || 'System',
        created_at: trans.transaction_date, // Use transaction_date
        type: 'transaction',
        // Add condition fields for condition changes
        previous_condition: trans.previous_condition,
        new_condition: trans.new_condition,
        // Add location fields for relocation
        previous_location: trans.previous_location,
        new_location: trans.new_location,
        // Add holder fields for assignment
        previous_holder_name: trans.previous_holder?.nama,
        new_holder_name: trans.new_holder?.nama,
      };
    });

    // 3. Sort transactions by date
    const combinedLogs = mappedTransactions.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({
      data: serializeBigInt(combinedLogs)
    });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
