import { useQuery } from "@tanstack/react-query";
import { productApi } from "../api/products.api";
import { dtoToDetailVM } from "../mappers/products.mapper";
import { ProductDetailVM } from "../types/products.vm";

export function useProductDetails(params: { id: string }) {
  const { id } = params;
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.byId( id ),
    staleTime: 60_000,
    select: (res): ProductDetailVM =>
      dtoToDetailVM(res),
  });
}
