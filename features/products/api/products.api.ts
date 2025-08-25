import { api, ApiClient } from "@/utils/apiClient";
import type { ProductDTO, ProductsListDTO } from "../types/products.dto";

export function initProductApi(api: ApiClient) {
  return {
    list: (params: { limit?: number; skip?: number; category?:string; sortBy?: string } = {}) => {
      const limit = params.limit ?? 30;
      const skip = params.skip ?? 0;
      const cat = params.category && params.category !== "all" ? params.category : null;
      const sort = params.sortBy ? params.sortBy : '';

      return cat ?
        api.get<ProductsListDTO>(`/products/category/${cat}${sort}`, { limit, skip })
        : api.get<ProductsListDTO>(`/products${sort}`, {limit, skip});
    },

    byId: (id: number | string) =>
      api.get<ProductDTO>(`/products/${id}`),
  };
}

export const productApi = initProductApi(api);