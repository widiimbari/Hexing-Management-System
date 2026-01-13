import { CategoryRepository } from "../infrastructure/category-repository";
import { CategorySearchParams, CreateCategoryInput, UpdateCategoryInput, CategoryListResult } from "../domain/types";

export const CategoryService = {
  async getCategories(params: CategorySearchParams): Promise<CategoryListResult> {
    const { data, total } = await CategoryRepository.findAll(params);

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

  async createCategory(data: CreateCategoryInput) {
    return await CategoryRepository.create(data);
  },

  async updateCategory(id: string | bigint, data: UpdateCategoryInput) {
    const bigIntId = typeof id === 'string' ? BigInt(id) : id;
    return await CategoryRepository.update(bigIntId, data);
  },

  async deleteCategory(id: string | bigint) {
    const bigIntId = typeof id === 'string' ? BigInt(id) : id;
    return await CategoryRepository.delete(bigIntId);
  }
};
