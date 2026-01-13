import { NextResponse } from 'next/server';
import { dbAsset } from '@/lib/db';
import { AssetLog } from '@/lib/system-logger';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { consumable_id, qty_used, location, remarks, usage_date } = body;

    if (!consumable_id || !qty_used) {
      return NextResponse.json({ message: "Consumable ID and Qty are required" }, { status: 400 });
    }

    // 1. Check current stock
    const item = await dbAsset.consumables.findUnique({
        where: { id: BigInt(consumable_id) },
        include: { usage_history: true }
    });

    if (!item) return NextResponse.json({ message: "Item not found" }, { status: 404 });

    const totalUsed = item.usage_history.reduce((sum, u) => sum + u.qty_used, 0);
    const available = (item.qty_actual || 0) - totalUsed;

    if (qty_used > available) {
        return NextResponse.json({ message: `Insufficient stock. Available: ${available}` }, { status: 400 });
    }

    // 2. Create usage record
    const usage = await dbAsset.consumable_usage.create({
      data: {
        consumable_id: BigInt(consumable_id),
        qty_used: parseInt(qty_used),
        location: location || '',
        remarks: remarks || '',
        usage_date: usage_date ? new Date(usage_date) : new Date(),
      }
    });

    await AssetLog.update('Consumable', consumable_id, `Stock Out: ${qty_used} unit(s) used at ${location || 'Unknown'}`, {
        prev_available: available,
        new_available: available - qty_used,
        usage_id: usage.id.toString()
    });

    // Serialize BigInt to string to avoid serialization error
    const serializedUsage = JSON.parse(JSON.stringify(usage, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ));

    return NextResponse.json({ message: "Usage recorded successfully", data: serializedUsage });

  } catch (error: any) {
    console.error("Usage Recording Error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
