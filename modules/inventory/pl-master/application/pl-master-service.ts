import { PLMasterRepository } from "../infrastructure/pl-master-repository";
import { PLMasterSearchParams, CreatePLMasterInput, PLMasterListResult } from "../domain/types";
import { createInventoryLog } from "@/lib/activity-logger";

export const PLMasterService = {
  async getPLMasters(params: PLMasterSearchParams): Promise<PLMasterListResult> {
    const { total, items } = await PLMasterRepository.findAll(params);

    const data = items.map(att => ({
        ...att,
        total: att.qty,
        tersedia: att.qty - att.used_qty
    }));

    return {
        data,
        metadata: {
            total,
            page: params.page,
            limit: params.limit,
            totalPages: Math.ceil(total / params.limit)
        }
    };
  },

  async createPLMaster(data: CreatePLMasterInput) {
    const newAttachment = await PLMasterRepository.create(data);
    
    await createInventoryLog(
        "CREATE", 
        "PL Master", 
        String(newAttachment.id), 
        `Created PL Master: ${newAttachment.nomor} (${newAttachment.type})`
    );

    return newAttachment;
  }
};
