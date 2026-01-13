import { ProductRepository } from "../infrastructure/product-repository";
import { ProductSearchParams, ProductListResult, ProductDto } from "../domain/types";

export const ProductService = {
  async getProducts(params: ProductSearchParams): Promise<ProductListResult> {
    const { total, ids } = await ProductRepository.countAndFetchIds(params);

    if (ids.length === 0) {
      return {
        data: [],
        metadata: {
          total: 0,
          page: params.page,
          limit: params.limit,
          totalPages: 0,
        }
      };
    }

    const products = await ProductRepository.findByIds(ids);

    // Fetch related entities
    const boxIds = products.map(p => p.box_id).filter((id): id is number => id !== null);
    const attIds = products.map(p => p.attachment_id).filter((id): id is number => id !== null);
    const att2Ids = products.map(p => p.attachment2_id).filter((id): id is number => id !== null);

    const [boxes, attachments, attachment2s] = await Promise.all([
      boxIds.length > 0 ? ProductRepository.findBoxes(boxIds) : [],
      attIds.length > 0 ? ProductRepository.findAttachments(attIds) : [],
      att2Ids.length > 0 ? ProductRepository.findAttachment2s(att2Ids) : []
    ]);

    // Fetch pallets (nested relation via boxes)
    const palletIds = boxes.map(b => b.pallete_id).filter((id): id is number => id !== null);
    const pallets = palletIds.length > 0 ? await ProductRepository.findPallets(palletIds) : [];

    // Map to Flat Data
    const flatData: ProductDto[] = products.map(p => {
        const box = boxes.find(b => b.id === p.box_id);
        const pallet = box ? pallets.find(pal => pal.id === box.pallete_id) : null;
        const att = p.attachment_id ? attachments.find(a => a.id === p.attachment_id) : null;
        const att2 = p.attachment2_id ? attachment2s.find(a => a.id === p.attachment2_id) : null;

        return {
            ...p,
            box_serial: box ? box.serial : '-',
            pallet_serial: pallet ? pallet.serial : '-',
            attachment_nomor: att ? att.nomor : '-',
            attachment2_nomor: att2 ? att2.nomor : '-',
            area: att2 ? att2.area : '-', 
            status: p.attachment2_id ? 'Delivery' : 'Warehouse'
        };
    });

    return {
      data: flatData,
      metadata: {
        total,
        page: params.page,
        limit: params.limit,
        totalPages: Math.ceil(total / params.limit),
      }
    };
  }
};
