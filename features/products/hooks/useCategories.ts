import { categoriesApi } from "@/utils/apiClient";
import { useQuery } from "@tanstack/react-query";
import { dtoToListVM } from "../mappers/categories.mappers";
import { CategoryVM } from "../types/categories.vm";

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => categoriesApi.list(),
        staleTime: 60_000,
        select: (res): CategoryVM[] =>
            dtoToListVM(res),
    })
}