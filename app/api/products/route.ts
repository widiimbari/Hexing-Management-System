import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "100");
    const search = searchParams.get("search") || "";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const type = searchParams.get("type");
    const groupBy = searchParams.get("groupBy"); // 'box' or 'pallet'

    const skip = (page - 1) * limit;

    // 1. Build Product Filter (applies to Product rows or grouping lookups)
    const productWhere: Prisma.productWhereInput = {
      AND: [
        search
          ? {
              OR: [
                { serial: { contains: search } },
                { type: { contains: search } },
                { orderno: { contains: search } },
              ],
            }
          : {},
        type && type !== "all" ? { type: { equals: type } } : {},
        startDate && endDate
          ? {
              timestamp: {
                gte: new Date(startDate),
                lte: new Date(endDate),
              },
            }
          : {},
      ],
    };

    // --- GROUP BY BOX ---
    if (groupBy === 'box') {
        // ... (Existing Box Grouping Logic - No changes needed here as user asked for Product Detail view updates)
        let matchingBoxIds: number[] = [];
        const hasProductFilters = search || (type && type !== "all") || (startDate && endDate);

        if (hasProductFilters) {
            const products = await db.product.findMany({
                where: productWhere,
                select: { box_id: true },
                distinct: ['box_id']
            });
            matchingBoxIds = products.map(p => p.box_id).filter((id): id is number => id !== null);
        }

        let finalBoxWhere: Prisma.boxWhereInput = {};
        
        if (search) {
             finalBoxWhere = {
                 OR: [
                     { serial: { contains: search } }, // Box matches
                     { id: { in: matchingBoxIds } }    // OR Box contains matching product
                 ]
             };
        } else if (hasProductFilters) {
            finalBoxWhere = { id: { in: matchingBoxIds } };
        }
        
        const [boxes, total] = await Promise.all([
            db.box.findMany({
                where: finalBoxWhere,
                take: limit,
                skip,
                orderBy: { timestamp: 'desc' }
            }),
            db.box.count({ where: finalBoxWhere })
        ]);

        const boxIds = boxes.map(b => b.id);
        const palletIds = boxes.map(b => b.pallete_id).filter((id): id is number => id !== null);

        const [productCounts, pallets] = await Promise.all([
            db.product.groupBy({
                by: ['box_id'],
                _count: true,
                where: { box_id: { in: boxIds } }
            }),
            db.pallete.findMany({
                where: { id: { in: palletIds } }
            })
        ]);

        const mappedData = boxes.map(box => {
            const count = productCounts.find(p => p.box_id === box.id)?._count || 0;
            const pallet = pallets.find(p => p.id === box.pallete_id);
            return {
                id: box.id,
                serial: box.serial,
                type: box.type,
                line: box.line,
                timestamp: box.timestamp,
                count: count,
                pallet_serial: pallet?.serial || '-',
                groupType: 'box'
            };
        });

        return NextResponse.json({
            data: mappedData,
            metadata: { total, page, limit, totalPages: Math.ceil(total / limit) },
            type: 'box'
        });
    }

    // --- GROUP BY PALLET ---
    if (groupBy === 'pallet') {
        // ... (Existing Pallet Grouping Logic - No changes needed)
        let matchingPalletIds: number[] = [];
        const hasProductFilters = search || (type && type !== "all") || (startDate && endDate);

        if (hasProductFilters) {
             const products = await db.product.findMany({
                where: productWhere,
                select: { box_id: true },
                distinct: ['box_id']
            });
            const pBoxIds = products.map(p => p.box_id).filter((id): id is number => id !== null);
            
            if (pBoxIds.length > 0) {
                 const boxes = await db.box.findMany({
                    where: { id: { in: pBoxIds } },
                    select: { pallete_id: true },
                    distinct: ['pallete_id']
                });
                matchingPalletIds = boxes.map(b => b.pallete_id).filter((id): id is number => id !== null);
            }
        }

         let finalPalletWhere: Prisma.palleteWhereInput = {};
        if (search) {
             finalPalletWhere = {
                 OR: [
                     { serial: { contains: search } }, 
                     { id: { in: matchingPalletIds } } 
                 ]
             };
        } else if (hasProductFilters) {
            finalPalletWhere = { id: { in: matchingPalletIds } };
        }

        const [palletsData, total] = await Promise.all([
            db.pallete.findMany({
                where: finalPalletWhere,
                take: limit,
                skip,
                orderBy: { timestamp: 'desc' }
            }),
            db.pallete.count({ where: finalPalletWhere })
        ]);

        const pIds = palletsData.map(p => p.id);
        const boxCounts = await db.box.groupBy({
            by: ['pallete_id'],
            _count: true,
            where: { pallete_id: { in: pIds } }
        });

        const mappedData = palletsData.map(pallet => {
             const count = boxCounts.find(b => b.pallete_id === pallet.id)?._count || 0;
             return {
                id: pallet.id,
                serial: pallet.serial,
                type: pallet.type,
                line: pallet.line,
                timestamp: pallet.timestamp,
                count: count,
                groupType: 'pallet'
             };
        });

         return NextResponse.json({
            data: mappedData,
            metadata: { total, page, limit, totalPages: Math.ceil(total / limit) },
            type: 'pallet'
        });
    }

    // --- DEFAULT: PRODUCT LIST ---
    
    // 1. Fetch Products
    const [products, total] = await Promise.all([
      db.product.findMany({
        where: productWhere,
        take: limit,
        skip,
        orderBy: {
          timestamp: "desc",
        },
      }),
      db.product.count({ where: productWhere }),
    ]);

    // 2. Manual Join for Box, Pallet, Attachment, Attachment2
    const boxIds = products.map(p => p.box_id).filter((id): id is number => id !== null);
    const attIds = products.map(p => p.attachment_id).filter((id): id is number => id !== null);
    const att2Ids = products.map(p => p.attachment2_id).filter((id): id is number => id !== null);
    
    let boxes: any[] = [];
    if (boxIds.length > 0) {
        boxes = await db.box.findMany({
            where: { id: { in: boxIds } }
        });
    }

    const palletIds = boxes.map(b => b.pallete_id).filter((id): id is number => id !== null);
    
    let pallets: any[] = [];
    if (palletIds.length > 0) {
        pallets = await db.pallete.findMany({
            where: { id: { in: palletIds } }
        });
    }

    // Fetch Attachments
    let attachments: any[] = [];
    if (attIds.length > 0) {
        attachments = await db.attachment.findMany({
            where: { id: { in: attIds } },
            select: { id: true, nomor: true } // We only need id and nomor
        });
    }

    // Fetch Attachment2s
    let attachment2s: any[] = [];
    if (att2Ids.length > 0) {
        attachment2s = await db.attachment2.findMany({
            where: { id: { in: att2Ids } },
             select: { id: true, nomor: true }
        });
    }

    // 4. Map everything together
    const flatData = products.map(p => {
        const box = boxes.find(b => b.id === p.box_id);
        const pallet = box ? pallets.find(pal => pal.id === box.pallete_id) : null;
        const att = p.attachment_id ? attachments.find(a => a.id === p.attachment_id) : null;
        const att2 = p.attachment2_id ? attachment2s.find(a => a.id === p.attachment2_id) : null;

        return {
            ...p,
            box_serial: box ? box.serial : '-',
            pallet_serial: pallet ? pallet.serial : '-',
            attachment_nomor: att ? att.nomor : '-',
            attachment2_nomor: att2 ? att2.nomor : '-'
        };
    });

    return NextResponse.json({
      data: flatData,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      type: 'product'
    });
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}