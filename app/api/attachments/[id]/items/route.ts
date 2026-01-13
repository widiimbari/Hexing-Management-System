import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "@/generated/inventory-client-v2";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const attachmentId = parseInt(id);
    const { searchParams } = new URL(req.url);
    const view = searchParams.get("view") || "serial"; // serial, box, pallet
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    
    const skip = (page - 1) * limit;

    if (isNaN(attachmentId)) return new NextResponse("Invalid ID", { status: 400 });

    // --- VIEW: SERIALS ---
    if (view === "serial") {
      let boxIdsFromSearch: number[] = [];

      if (search) {
        // 1. Find boxes matching search
        const matchingBoxes = await db.box.findMany({
            where: { serial: { contains: search } },
            select: { id: true }
        });
        boxIdsFromSearch.push(...matchingBoxes.map(b => b.id));

        // 2. Find pallets matching search, then find their boxes
        const matchingPallets = await db.pallete.findMany({
            where: { serial: { contains: search } },
            select: { id: true }
        });
        
        if (matchingPallets.length > 0) {
            const palletIds = matchingPallets.map(p => p.id);
            const boxesInPallets = await db.box.findMany({
                where: { pallete_id: { in: palletIds } },
                select: { id: true }
            });
            boxIdsFromSearch.push(...boxesInPallets.map(b => b.id));
        }
      }

      const where: Prisma.productWhereInput = {
        attachment_id: attachmentId,
        ...(search ? {
            OR: [
                { serial: { contains: search } },
                { box_id: { in: boxIdsFromSearch } }
            ]
        } : {})
      };

      const [total, products] = await Promise.all([
        db.product.count({ where }),
        db.product.findMany({
          where,
          select: {
            id: true,
            serial: true,
            type: true,
            box_id: true,
          },
          skip,
          take: limit,
          orderBy: { id: 'asc' }
        })
      ]);

      // Manual Join for Box and Pallet Info
      const boxIds = products.map(p => p.box_id).filter((id): id is number => id !== null);
      let boxMap = new Map<number, { serial: string, pallete_id: number | null }>();
      let palletMap = new Map<number, string>();

      if (boxIds.length > 0) {
        const boxes = await db.box.findMany({
            where: { id: { in: boxIds } },
            select: { id: true, serial: true, pallete_id: true }
        });
        
        const palletIds: number[] = [];
        boxes.forEach(b => {
            boxMap.set(b.id, { serial: b.serial, pallete_id: b.pallete_id });
            if (b.pallete_id) palletIds.push(b.pallete_id);
        });

        if (palletIds.length > 0) {
            const pallets = await db.pallete.findMany({
                where: { id: { in: palletIds } },
                select: { id: true, serial: true }
            });
            pallets.forEach(p => palletMap.set(p.id, p.serial));
        }
      }

      return NextResponse.json({
        data: products.map(p => {
            const boxInfo = p.box_id ? boxMap.get(p.box_id) : null;
            const palletSerial = (boxInfo && boxInfo.pallete_id) ? palletMap.get(boxInfo.pallete_id) : "-";
            return {
                id: p.id,
                serial: p.serial,
                type: p.type,
                box: boxInfo ? boxInfo.serial : "-",
                pallet: palletSerial
            };
        }),
        metadata: { total, page, limit, totalPages: Math.ceil(total / limit) }
      });
    }

    // --- VIEW: BOXES ---
    if (view === "box") {
      // Find boxes that have products in this attachment
      // Since no relations, we first find distinct box_ids from product
      const productBoxes = await db.product.groupBy({
        by: ['box_id'],
        where: { 
            attachment_id: attachmentId,
            box_id: { not: null }
        },
        _count: { id: true }
      });
      
      const targetBoxIds = productBoxes.map(pb => pb.box_id as number);
      
      // Filter logic manual if search exists, otherwise use all found IDs
      let finalBoxIds = targetBoxIds;

      if (search) {
         const matchingBoxes = await db.box.findMany({
            where: {
                id: { in: targetBoxIds },
                OR: [
                    { serial: { contains: search } },
                    // Cannot search by pallet serial easily here without join, simplifying to box serial only for now or multi-step
                ]
            },
            select: { id: true }
         });
         finalBoxIds = matchingBoxes.map(b => b.id);
      }

      const total = finalBoxIds.length;
      // Pagination
      const pagedBoxIds = finalBoxIds.slice(skip, skip + limit);

      if (pagedBoxIds.length === 0) {
          return NextResponse.json({
            data: [],
            metadata: { total: 0, page, limit, totalPages: 0 }
          });
      }

      const boxes = await db.box.findMany({
        where: { id: { in: pagedBoxIds } },
        select: { id: true, serial: true, type: true, pallete_id: true }
      });

      // Get Pallet Info
      const palletIds = boxes.map(b => b.pallete_id).filter((id): id is number => id !== null);
      const pallets = await db.pallete.findMany({
        where: { id: { in: palletIds } },
        select: { id: true, serial: true }
      });
      const palletMap = new Map(pallets.map(p => [p.id, p.serial]));

      // Map Counts from GroupBy result
      const countMap = new Map(productBoxes.map(pb => [pb.box_id as number, pb._count.id]));

      return NextResponse.json({
        data: boxes.map(b => ({
          id: b.id,
          serial: b.serial,
          type: b.type,
          pallet: b.pallete_id ? palletMap.get(b.pallete_id) || "-" : "-",
          count: countMap.get(b.id) || 0
        })),
        metadata: { total, page, limit, totalPages: Math.ceil(total / limit) }
      });
    }

    // --- VIEW: PALLETS ---
    if (view === "pallet") {
        // 1. Get all products in attachment to identify boxes
        const productBoxes = await db.product.findMany({
            where: { attachment_id: attachmentId, box_id: { not: null } },
            select: { box_id: true }
        });
        const boxIds = [...new Set(productBoxes.map(p => p.box_id as number))];

        // 2. Get boxes to identify pallets
        const boxes = await db.box.findMany({
            where: { id: { in: boxIds }, pallete_id: { not: null } },
            select: { id: true, pallete_id: true }
        });

        // Calculate box count and product count per pallet manually
        const palletStats = new Map<number, { boxCount: number, productCount: number }>();
        const boxPalletMap = new Map<number, number>(); // boxId -> palletId
        
        boxes.forEach(b => {
            boxPalletMap.set(b.id, b.pallete_id!);
            if (!palletStats.has(b.pallete_id!)) {
                palletStats.set(b.pallete_id!, { boxCount: 0, productCount: 0 });
            }
            const stats = palletStats.get(b.pallete_id!)!;
            stats.boxCount += 1;
        });

        // Count products per pallet
        // Re-query product counts grouped by box
        const productCounts = await db.product.groupBy({
            by: ['box_id'],
            where: { attachment_id: attachmentId, box_id: { in: boxIds } },
            _count: { id: true }
        });

        productCounts.forEach(pc => {
            if (pc.box_id && boxPalletMap.has(pc.box_id)) {
                const palletId = boxPalletMap.get(pc.box_id)!;
                const stats = palletStats.get(palletId)!;
                stats.productCount += pc._count.id;
            }
        });

        let targetPalletIds = Array.from(palletStats.keys());

        // Search Filter
        if (search) {
             const matchingPallets = await db.pallete.findMany({
                where: { 
                    id: { in: targetPalletIds },
                    serial: { contains: search }
                },
                select: { id: true }
             });
             targetPalletIds = matchingPallets.map(p => p.id);
        }

        const total = targetPalletIds.length;
        const pagedIds = targetPalletIds.slice(skip, skip + limit);

        const pallets = await db.pallete.findMany({
            where: { id: { in: pagedIds } },
            select: { id: true, serial: true, type: true }
        });

        const data = pallets.map(p => ({
            id: p.id,
            serial: p.serial,
            type: p.type,
            boxCount: palletStats.get(p.id)?.boxCount || 0,
            productCount: palletStats.get(p.id)?.productCount || 0
        }));

        return NextResponse.json({
            data,
            metadata: { total, page, limit, totalPages: Math.ceil(total / limit) }
        });
    }

    return new NextResponse("Invalid View", { status: 400 });

  } catch (error) {
    console.error("[GET_MASTER_ITEMS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
