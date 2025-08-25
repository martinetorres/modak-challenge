import { productApi } from "@/utils/apiClient";
import { useQuery } from "@tanstack/react-query";
import { dtoListToCardVMList } from "../mappers/products.mapper";

export function useProducts(params: { limit?: number; skip?: number; category?: string } = {}) {
  const { limit = 30, skip = 0, category = 'all' } = params;
  return useQuery({
    queryKey: ["products", limit, skip, category],
    queryFn: () => productApi.list({ limit, skip, category }),
    staleTime: 60_000,
    select: dtoListToCardVMList,
  });
}
