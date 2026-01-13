import { PLSlaveRepository } from "../infrastructure/pl-slave-repository";
import { PLSlaveSearchParams, CreatePLSlaveInput, PLSlaveListResult } from "../domain/types";
import { createInventoryLog } from "@/lib/activity-logger";

export const PLSlaveService = {
  async getPLSlaves(params: PLSlaveSearchParams): Promise<PLSlaveListResult> {
    const { total, items, countMap } = await PLSlaveRepository.findAll(params);

    const data = items.map(att => ({
        ...att,
        total: countMap.get(att.id) || 0,
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

  async createPLSlave(data: CreatePLSlaveInput) {
    const newAttachment = await PLSlaveRepository.create(data);
    
    await createInventoryLog(
        "CREATE", 
        "PL Slave", 
        String(newAttachment.id), 
        `Created PL Slave: ${newAttachment.nomor} (${newAttachment.type})`
    );

    return newAttachment;
  }
};
