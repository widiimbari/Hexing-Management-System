import { AreaRepository } from "../infrastructure/area-repository";
import { AreaSearchParams, CreateAreaInput, UpdateAreaInput } from "../domain/types";
import { logActivity } from "@/lib/activity-logger";

export const AreaService = {
  async getAreas(params: AreaSearchParams) {
    const { data, total } = await AreaRepository.findAll(params);
    return {
      data: data as any,
      metadata: {
        total,
        page: params.page,
        limit: params.limit,
        totalPages: Math.ceil(total / params.limit),
      },
    };
  },

  async createArea(data: CreateAreaInput, currentUser?: any) {
    const area = await AreaRepository.create(data);
    await logActivity('CREATE', 'Area', String(area.id), `Created area: ${area.name}`, currentUser);
    return area;
  },

  async updateArea(id: string | bigint, data: UpdateAreaInput, currentUser?: any) {
    const bigIntId = typeof id === 'string' ? BigInt(id) : id;
    const area = await AreaRepository.update(bigIntId, data);
    await logActivity('UPDATE', 'Area', String(area.id), `Updated area: ${area.name}`, currentUser);
    return area;
  },

  async deleteArea(id: string | bigint, currentUser?: any) {
    const bigIntId = typeof id === 'string' ? BigInt(id) : id;
    const area = await AreaRepository.findById(bigIntId);
    if (!area) throw new Error("Area not found");

    await AreaRepository.delete(bigIntId);
    await logActivity('DELETE', 'Area', String(id), `Deleted area: ${area.name}`, currentUser);
    return true;
  }
};
