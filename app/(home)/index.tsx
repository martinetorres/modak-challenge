import { useCategories } from "@/features/products/hooks/useCategories";
import { useProductsInfinite } from "@/features/products/hooks/useProducts";
import { dtoListToCardVMList } from "@/features/products/mappers/products.mapper";
import CategoriesFilter from "@/features/products/ui/CategoriesFilter";
import { ProductList } from "@/features/products/ui/ProductList";
import { SortProductsOptions } from "@/features/products/ui/SortProductsOptions";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function HomeScreen() {
    const [category, setCategory] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>('');
    const categories = useCategories();
    const q = useProductsInfinite({ category, limit: 20, sortBy });

    const items = useMemo(
        () => q.data?.pages.flatMap((p) => dtoListToCardVMList(p).items) ?? [],
        [q.data]
    );

    const onEnd = useCallback(() => {
        if (q.hasNextPage && !q.isFetchingNextPage) q.fetchNextPage();
    }, [q.hasNextPage, q.isFetchingNextPage, q.fetchNextPage]);

    if (q.isLoading) return <View className="flex-1 items-center justify-center"><ActivityIndicator /></View>;
    if (q.isError) return <View className="p-4"><Text>Error</Text></View>;

    return(
        <View className="flex-1">
            {
                categories.data &&
                <CategoriesFilter 
                    categories={categories.data} 
                    onChange={setCategory} 
                    value={category}
                />
            }

            <SortProductsOptions onChange={setSortBy} value={sortBy}/>

            {items &&
                <ProductList
                    products={items} 
                    onEnded={onEnd}
                    onRefresh={q.refetch}
                    refreshing={q.isRefetching && !q.isFetchingNextPage}
                    fetchingNextPage={q.isFetchingNextPage}
                />
            }
        </View>
    ) 
}