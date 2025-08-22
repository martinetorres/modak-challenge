import { productApi } from "@/utils/apiClient";
import { useQuery } from "@tanstack/react-query";
import { dtoListToCardVMList } from "../mappers/products.mapper";
import { ProductCardVM } from "../types/products.vm";

export function useProducts(params: { limit?: number; skip?: number } = {}) {
  const { limit = 20, skip = 0 } = params;
  return useQuery({
    queryKey: ["products", limit, skip],
    queryFn: () => productApi.list({ limit, skip }),
    staleTime: 60_000,
    select: (res): { items: ProductCardVM[]; total: number; skip: number; limit: number } =>
      dtoListToCardVMList(res),
  });
}
