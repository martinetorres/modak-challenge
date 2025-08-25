import { productApi } from "@/utils/apiClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { dtoListToCardVMList } from "../mappers/products.mapper";
import type { ProductsListDTO } from "../types/products.dto";

export function useProductsInfinite(params: { category?: string; limit?: number; sortBy?: string } = {}) {
  const { category = "all", limit = 20, sortBy } = params;

  const q = useInfiniteQuery<ProductsListDTO>({
    queryKey: ["productsInfinite", category, limit, sortBy],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      productApi.list({ limit, skip: Number(pageParam ?? 0), category, sortBy }),
    getNextPageParam: (last) => {
      const next = last.skip + last.limit;
      return next < last.total ? next : undefined;
    },
    staleTime: 60_000,
  });

  const items = useMemo(
    () => (q.data?.pages ?? []).flatMap((p) => dtoListToCardVMList(p).items),
    [q.data]
  );

  return { ...q, items };
}
