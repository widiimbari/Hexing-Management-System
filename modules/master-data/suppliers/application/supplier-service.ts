import { SupplierRepository } from "../infrastructure/supplier-repository";
import { SupplierSearchParams, CreateSupplierInput, UpdateSupplierInput } from "../domain/types";
import { logActivity } from "@/lib/activity-logger";

export const SupplierService = {
  async getSuppliers(params: SupplierSearchParams) {
    const { data, total } = await SupplierRepository.findAll(params);
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

  async createSupplier(data: CreateSupplierInput, currentUser?: any) {
    const supplier = await SupplierRepository.create(data);
    await logActivity('CREATE', 'Supplier', String(supplier.id), `Created supplier: ${supplier.name}`, currentUser);
    return supplier;
  },

  async updateSupplier(id: string | bigint, data: UpdateSupplierInput, currentUser?: any) {
    const bigIntId = typeof id === 'string' ? BigInt(id) : id;
    const supplier = await SupplierRepository.update(bigIntId, data);
    await logActivity('UPDATE', 'Supplier', String(supplier.id), `Updated supplier: ${supplier.name}`, currentUser);
    return supplier;
  },

  async deleteSupplier(id: string | bigint, currentUser?: any) {
    const bigIntId = typeof id === 'string' ? BigInt(id) : id;
    const supplier = await SupplierRepository.findById(bigIntId);
    if (!supplier) throw new Error("Supplier not found");

    await SupplierRepository.delete(bigIntId);
    await logActivity('DELETE', 'Supplier', String(id), `Deleted supplier: ${supplier.name}`, currentUser);
    return true;
  }
};
