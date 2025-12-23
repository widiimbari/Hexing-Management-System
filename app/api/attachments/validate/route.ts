import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { codes, inputType, expectedType, mode = "master" } = body;

    if (!codes || !Array.isArray(codes) || codes.length === 0) {
      return NextResponse.json({ count: 0, alreadyAssigned: 0, conflictingCodes: [] });
    }

    // Parallel queries to find all matching items across tables
    const [products, boxes, pallets] = await Promise.all([
      db.product.findMany({ 
        where: { serial: { in: codes } },
        select: { id: true, serial: true, attachment_id: true, attachment2_id: true, type: true }
      }),
      db.box.findMany({ 
        where: { serial: { in: codes } },
        select: { id: true, serial: true } 
      }),
      db.pallete.findMany({ 
        where: { serial: { in: codes } },
        select: { id: true, serial: true }
      }),
    ]);

    let totalCount = 0;
    let conflictingCodes: string[] = [];
    let invalidTypeCodes: string[] = [];
    let noMasterCodes: string[] = [];
    const usedBoxIds = new Set<number>(); // To track boxes processed from box input

    // 1. Process Direct Serials
    if (products.length > 0) {
      totalCount += products.length;
      products.forEach(p => {
        // Mode Slave: Check if it has a Master
        if (mode === "slave" && p.attachment_id === null) {
          noMasterCodes.push(p.serial);
        }

        const isAssigned = mode === "slave" ? p.attachment2_id !== null : p.attachment_id !== null;
        if (isAssigned) {
          conflictingCodes.push(p.serial);
        }
        if (expectedType && p.type !== expectedType) {
          invalidTypeCodes.push(p.serial);
        }
      });
    }

    // 2. Process Boxes
    if (boxes.length > 0) {
      const boxIds = boxes.map(b => b.id);
      
      // Count products in these boxes
      const boxProducts = await db.product.findMany({
        where: { box_id: { in: boxIds } },
        select: { box_id: true, attachment_id: true, attachment2_id: true, type: true }
      });
      
      totalCount += boxProducts.length;

      // Identify conflicting boxes, invalid types, and missing masters
      const conflictingBoxIds = new Set<number>();
      const invalidTypeBoxIds = new Set<number>();
      const noMasterBoxIds = new Set<number>();

      boxProducts.forEach(p => {
        if (mode === "slave" && p.attachment_id === null) {
          noMasterBoxIds.add(p.box_id!);
        }

        const isAssigned = mode === "slave" ? p.attachment2_id !== null : p.attachment_id !== null;
        if (isAssigned) {
          conflictingBoxIds.add(p.box_id!);
        }
        if (expectedType && p.type !== expectedType) {
          invalidTypeBoxIds.add(p.box_id!);
        }
      });

      boxes.forEach(b => {
        usedBoxIds.add(b.id);
        if (noMasterBoxIds.has(b.id)) {
          noMasterCodes.push(b.serial);
        }
        if (conflictingBoxIds.has(b.id)) {
          conflictingCodes.push(b.serial);
        }
        if (invalidTypeBoxIds.has(b.id)) {
          invalidTypeCodes.push(b.serial);
        }
      });
    }

    // 3. Process Pallets
    if (pallets.length > 0) {
      const palletIds = pallets.map(p => p.id);
      
      // Find boxes in these pallets
      const palletBoxes = await db.box.findMany({
        where: { pallete_id: { in: palletIds } },
        select: { id: true, pallete_id: true }
      });
      
      const palletBoxIds = palletBoxes.map(b => b.id);
      
      if (palletBoxIds.length > 0) {
        
        const uniquePalletBoxIds = palletBoxIds.filter(id => !usedBoxIds.has(id));
        
        if (uniquePalletBoxIds.length > 0) {
          const palletProducts = await db.product.findMany({
             where: { box_id: { in: uniquePalletBoxIds } },
             select: { box_id: true, attachment_id: true, attachment2_id: true, type: true }
          });
          
          totalCount += palletProducts.length;

          const conflictingBoxIds = new Set<number>();
          const invalidTypeBoxIds = new Set<number>();
          const noMasterBoxIds = new Set<number>();

          palletProducts.forEach(p => {
             if (mode === "slave" && p.attachment_id === null) {
                noMasterBoxIds.add(p.box_id!);
             }

             const isAssigned = mode === "slave" ? p.attachment2_id !== null : p.attachment_id !== null;
             if (isAssigned) {
                conflictingBoxIds.add(p.box_id!);
             }
             if (expectedType && p.type !== expectedType) {
                invalidTypeBoxIds.add(p.box_id!);
             }
          });

          // Map back to pallets
          const affectedPalletIds = new Set<number>();
          const invalidTypePalletIds = new Set<number>();
          const noMasterPalletIds = new Set<number>();

          palletBoxes.forEach(b => {
             if (uniquePalletBoxIds.includes(b.id)) {
                if (noMasterBoxIds.has(b.id) && b.pallete_id) {
                    noMasterPalletIds.add(b.pallete_id);
                }
                if (conflictingBoxIds.has(b.id) && b.pallete_id) {
                    affectedPalletIds.add(b.pallete_id);
                }
                if (invalidTypeBoxIds.has(b.id) && b.pallete_id) {
                    invalidTypePalletIds.add(b.pallete_id);
                }
             }
          });

          pallets.forEach(p => {
             if (noMasterPalletIds.has(p.id)) {
                noMasterCodes.push(p.serial);
             }
             if (affectedPalletIds.has(p.id)) {
                conflictingCodes.push(p.serial);
             }
             if (invalidTypePalletIds.has(p.id)) {
                invalidTypeCodes.push(p.serial);
             }
          });
        }
      }
    }

    return NextResponse.json({ 
      count: totalCount, 
      alreadyAssigned: conflictingCodes.length,
      conflictingCodes: [...new Set(conflictingCodes)],
      invalidTypeCount: invalidTypeCodes.length,
      invalidTypeCodes: [...new Set(invalidTypeCodes)],
      noMasterCount: noMasterCodes.length,
      noMasterCodes: [...new Set(noMasterCodes)]
    });
  } catch (error) {
    console.error("[VALIDATE_CODES]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
