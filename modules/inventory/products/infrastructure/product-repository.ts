import { db } from "@/lib/db";
import { Prisma } from "@/generated/inventory-client-v2";
import { ProductSearchParams } from "../domain/types";

export const ProductRepository = {
  async countAndFetchIds(params: ProductSearchParams) {
    const { 
      page, limit, startSerial, endSerial, 
      searchScope, startDate, endDate, type 
    } = params;
    
    const skip = (page - 1) * limit;

    const whereConditions: Prisma.Sql[] = [];
    let joinClause = Prisma.sql``;

    // 1. Type Filter
    if (type && type !== "all") {
        whereConditions.push(Prisma.sql`p.type = ${type}`);
    }

    // 2. Date Filter
    if (startDate && endDate) {
        whereConditions.push(Prisma.sql`p.timestamp >= ${new Date(startDate)} AND p.timestamp <= ${new Date(endDate)}`);
    }

    // 3. Search Scope Logic
    if (startSerial) {
        const isRange = !!endSerial;

        if (searchScope === "serial") {
            if (isRange) {
                whereConditions.push(Prisma.sql`p.serial >= ${startSerial} AND p.serial <= ${endSerial}`);
            } else {
                // AUTO DETECT OPTIMIZATION
                const [productMatch, moduleMatch, boxMatch, palletMatch] = await Promise.all([
                    db.product.findFirst({ where: { serial: { startsWith: startSerial } }, select: { id: true } }),
                    db.product.findFirst({ where: { module_serial: { startsWith: startSerial } }, select: { id: true } }),
                    db.box.findFirst({ where: { serial: { startsWith: startSerial } }, select: { id: true } }),
                    db.pallete.findFirst({ where: { serial: { startsWith: startSerial } }, select: { id: true } })
                ]);

                const orConditions: Prisma.Sql[] = [];
                
                if (productMatch) orConditions.push(Prisma.sql`p.serial LIKE ${`${startSerial}%`}`);
                if (moduleMatch) orConditions.push(Prisma.sql`p.module_serial LIKE ${`${startSerial}%`}`);
                if (boxMatch) orConditions.push(Prisma.sql`b.serial LIKE ${`${startSerial}%`}`);
                if (palletMatch) orConditions.push(Prisma.sql`pal.serial LIKE ${`${startSerial}%`}`);

                if (orConditions.length > 0) {
                    whereConditions.push(Prisma.sql`(${Prisma.join(orConditions, ' OR ')})`);
                    
                    if (palletMatch) {
                         joinClause = Prisma.sql`LEFT JOIN box b ON p.box_id = b.id LEFT JOIN pallete pal ON b.pallete_id = pal.id`;
                    } else if (boxMatch) {
                         joinClause = Prisma.sql`LEFT JOIN box b ON p.box_id = b.id`;
                    }
                } else {
                    whereConditions.push(Prisma.sql`1=0`);
                }
            }
        } 
        else if (searchScope === "module_serial") {
            if (isRange) {
                whereConditions.push(Prisma.sql`p.module_serial >= ${startSerial} AND p.module_serial <= ${endSerial}`);
            } else {
                whereConditions.push(Prisma.sql`p.module_serial LIKE ${`${startSerial}%`}`);
            }
        }
        else if (searchScope === "box") {
            joinClause = Prisma.sql`JOIN box b ON p.box_id = b.id`;
            if (isRange) {
                whereConditions.push(Prisma.sql`b.serial >= ${startSerial} AND b.serial <= ${endSerial}`);
            } else {
                whereConditions.push(Prisma.sql`b.serial LIKE ${`${startSerial}%`}`);
            }
        }
        else if (searchScope === "pallet") {
            joinClause = Prisma.sql`JOIN box b ON p.box_id = b.id JOIN pallete pal ON b.pallete_id = pal.id`;
            if (isRange) {
                whereConditions.push(Prisma.sql`pal.serial >= ${startSerial} AND pal.serial <= ${endSerial}`);
            } else {
                whereConditions.push(Prisma.sql`pal.serial LIKE ${`${startSerial}%`}`);
            }
        }
    }

    const whereClause = whereConditions.length > 0 
        ? Prisma.sql`WHERE ${Prisma.join(whereConditions, ' AND ')}` 
        : Prisma.sql``;

    // 4. Optimize Sorting
    let orderByClause = Prisma.sql`ORDER BY p.timestamp DESC`;

    if (startSerial && endSerial) {
        if (searchScope === "serial") {
             orderByClause = Prisma.sql`ORDER BY p.serial ASC`;
        } else if (searchScope === "module_serial") {
             orderByClause = Prisma.sql`ORDER BY p.module_serial ASC`;
        } else if (searchScope === "box") {
             orderByClause = Prisma.sql`ORDER BY b.serial ASC, p.id ASC`;
        } else if (searchScope === "pallet") {
             orderByClause = Prisma.sql`ORDER BY pal.serial ASC, p.id ASC`;
        }
    }

    const countQuery = Prisma.sql`
        SELECT COUNT(p.id) as total 
        FROM product p 
        ${joinClause} 
        ${whereClause}
    `;
    
    const idsQuery = Prisma.sql`
        SELECT p.id 
        FROM product p 
        ${joinClause} 
        ${whereClause}
        ${orderByClause}
        LIMIT ${limit} OFFSET ${skip}
    `;

    const [totalResult, idsResult] = await Promise.all([
        db.$queryRaw(countQuery) as Promise<{ total: bigint }[]>,
        db.$queryRaw(idsQuery) as Promise<{ id: number }[]>
    ]);

    const total = Number(totalResult[0]?.total || 0);
    const ids = idsResult.map(row => row.id);

    return { total, ids };
  },

  async findByIds(ids: number[]) {
    return await db.product.findMany({
        where: { id: { in: ids } },
        orderBy: { timestamp: "desc" },
    });
  },

  async findBoxes(ids: number[]) {
     return await db.box.findMany({ where: { id: { in: ids } } });
  },

  async findPallets(ids: number[]) {
     return await db.pallete.findMany({ where: { id: { in: ids } } });
  },

  async findAttachments(ids: number[]) {
     return await db.attachment.findMany({ 
         where: { id: { in: ids } },
         select: { id: true, nomor: true }
     });
  },

  async findAttachment2s(ids: number[]) {
     return await db.attachment2.findMany({ 
         where: { id: { in: ids } },
         select: { id: true, nomor: true, area: true } 
     });
  }
};
