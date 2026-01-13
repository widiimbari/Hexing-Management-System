import { BrandRepository } from "../infrastructure/brand-repository";
import { BrandSearchParams, CreateBrandInput, UpdateBrandInput, BrandListResult } from "../domain/types";
import { logActivity } from "@/lib/activity-logger";

export const BrandService = {
  async getBrands(params: BrandSearchParams): Promise<BrandListResult> {
    const { data, total } = await BrandRepository.findAll(params);

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

  async createBrand(data: CreateBrandInput, currentUser?: any) {
    const brand = await BrandRepository.create(data);
    
    await logActivity(
      'CREATE',
      'Brand',
      String(brand.id),
      `Created brand: ${brand.name}`,
      currentUser
    );

    return brand;
  },

  async updateBrand(id: string | bigint, data: UpdateBrandInput, currentUser?: any) {
    const bigIntId = typeof id === 'string' ? BigInt(id) : id;
    const brand = await BrandRepository.update(bigIntId, data);

    await logActivity(
      'UPDATE',
      'Brand',
      String(brand.id),
      `Updated brand: ${brand.name}`,
      currentUser
    );

    return brand;
  },

  async deleteBrand(id: string | bigint, currentUser?: any) {
    const bigIntId = typeof id === 'string' ? BigInt(id) : id;
    
    const brand = await BrandRepository.findById(bigIntId);
    if (!brand) throw new Error("Brand not found");

    await BrandRepository.delete(bigIntId);

    await logActivity(
      'DELETE',
      'Brand',
      String(id),
      `Deleted brand: ${brand.name}`,
      currentUser
    );

    return true;
  }
};
