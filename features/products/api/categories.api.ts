import { api, ApiClient } from "@/utils/apiClient";
import { CategoriesDTO } from "../types/categories.dto";

export function initCategoriesApi(api: ApiClient) {
  return {
    list: () =>
      api.get<CategoriesDTO>("/products/categories"),
  }
}

export const categoriesApi = initCategoriesApi(api);