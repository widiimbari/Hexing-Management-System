import { NextRequest, NextResponse } from 'next/server';
import { dbAsset } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sap_id = searchParams.get('sap_id');
    const exclude_id = searchParams.get('exclude_id');

    if (!sap_id) {
      return NextResponse.json({ error: 'SAP ID is required' }, { status: 400 });
    }

    // Check if SAP ID exists (excluding current asset if editing)
    const existingAsset = await dbAsset.assets.findFirst({
      where: {
        sap_id: sap_id,
        ...(exclude_id && { id: { not: BigInt(exclude_id) } })
      }
    });

    return NextResponse.json({ 
      exists: !!existingAsset 
    });
  } catch (error) {
    console.error('Error checking SAP ID:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}