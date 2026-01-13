import { LocationRepository } from "../infrastructure/location-repository";
import { LocationSearchParams, CreateLocationInput, UpdateLocationInput } from "../domain/types";
import { logActivity } from "@/lib/activity-logger";

export const LocationService = {
  async getLocations(params: LocationSearchParams) {
    const { data, total } = await LocationRepository.findAll(params);
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

  async createLocation(data: CreateLocationInput, currentUser?: any) {
    const location = await LocationRepository.create(data);
    await logActivity('CREATE', 'Location', String(location.id), `Created location: ${location.name}`, currentUser);
    return location;
  },

  async updateLocation(id: string | bigint, data: UpdateLocationInput, currentUser?: any) {
    const bigIntId = typeof id === 'string' ? BigInt(id) : id;
    const location = await LocationRepository.update(bigIntId, data);
    await logActivity('UPDATE', 'Location', String(location.id), `Updated location: ${location.name}`, currentUser);
    return location;
  },

  async deleteLocation(id: string | bigint, currentUser?: any) {
    const bigIntId = typeof id === 'string' ? BigInt(id) : id;
    const location = await LocationRepository.findById(bigIntId);
    if (!location) throw new Error("Location not found");

    await LocationRepository.delete(bigIntId);
    await logActivity('DELETE', 'Location', String(id), `Deleted location: ${location.name}`, currentUser);
    return true;
  }
};
