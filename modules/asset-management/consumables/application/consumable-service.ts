import { ConsumableRepository } from "../infrastructure/consumable-repository";
import { AssetLog } from "@/lib/system-logger";
import { CreateConsumableInput } from "../domain/types";
import { join } from "path";
import { writeFile } from "fs/promises";

export const ConsumableService = {
  getConsumables: async (search: string) => {
    const data = await ConsumableRepository.findAll({ search });
    // Serialize BigInt if necessary (though usually handled by framework or custom serializer, 
    // the original code did it explicitly. We'll return raw data and let the Controller handle serialization 
    // or do it here. The original Controller did it. Let's return raw here and let Controller serialize.)
    return data;
  },

  createRequest: async (
    data: Omit<CreateConsumableInput, 'document_number' | 'status' | 'request_date'>,
    file?: File | null,
    existingDocNumber?: string | null
  ) => {
    // 1. Generate or use existing Doc Number
    let targetDocNumber = existingDocNumber;
    
    if (!targetDocNumber) {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const prefix = `REQ/${year}/${month}/`;
        
        const lastDoc = await ConsumableRepository.findLastDocument(prefix);
        let nextNumber = 1;
        
        if (lastDoc && lastDoc.document_number) {
            const parts = lastDoc.document_number.split('/');
            const lastSeq = parseInt(parts[parts.length - 1]);
            if (!isNaN(lastSeq)) {
                nextNumber = lastSeq + 1;
            }
        }
        targetDocNumber = `${prefix}${nextNumber.toString().padStart(3, '0')}`;
    }

    // 2. Handle File
    let item_image = data.item_image;
    if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `req-${Date.now()}-${file.name.replace(/\s/g, '_')}`;
        const path = join(process.cwd(), 'public/uploads', filename);
        await writeFile(path, buffer);
        item_image = `/uploads/${filename}`;
    }

    // 3. Prepare full data
    const finalData: CreateConsumableInput = {
        ...data,
        document_number: targetDocNumber,
        status: 'PENDING',
        request_date: new Date(),
        item_image
    };

    // 4. Save to DB
    const newItem = await ConsumableRepository.create(finalData);

    // 5. Log
    await AssetLog.create(
        'ConsumableRequest', 
        newItem.id.toString(), 
        `Created request for ${newItem.item_name} (Doc: ${newItem.document_number})`, 
        {
            item_name: newItem.item_name,
            qty: newItem.qty_estimated,
            document_number: newItem.document_number
        }
    );

    return newItem;
  }
};
