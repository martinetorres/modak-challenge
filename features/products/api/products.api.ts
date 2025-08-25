import { ApiClient } from "@/utils/apiClient";
import type { ProductDTO, ProductsListDTO } from "../types/products.dto";

export function initProductApi(api: ApiClient) {
  return {
    list: (params: { limit?: number; skip?: number; category?:string } = {}) => {
      const limit = params.limit ?? 30;
      const skip = params.skip ?? 0;
      const cat = params.category && params.category !== "all" ? params.category : null;

      return cat ?
        api.get<ProductsListDTO>(`/products/category/${cat}`, { limit, skip })
        : api.get<ProductsListDTO>("/products", {limit, skip});
    },

    byId: (id: number | string) =>
      api.get<ProductDTO>(`/products/${id}`),
  };
}
