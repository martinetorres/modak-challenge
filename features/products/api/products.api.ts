import { ApiClient } from "@/utils/apiClient";
import type { ProductDTO, ProductsListDTO } from "../types/products.dto";

export function initProductApi(api: ApiClient) {
  return {
    list: (params: { limit?: number; skip?: number } = {}) =>
      api.get<ProductsListDTO>("/products", { limit: params.limit ?? 20, skip: params.skip ?? 0 }),

    byId: (id: number | string) =>
      api.get<ProductDTO>(`/products/${id}`),
  };
}
