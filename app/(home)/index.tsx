import { useCategories } from "@/features/products/hooks/useCategories";
import { useProductsInfinite } from "@/features/products/hooks/useProducts";
import { dtoListToCardVMList } from "@/features/products/mappers/products.mapper";
import { ApiErrorMessage } from "@/features/products/ui/ApiErrorMessage";
import CategoriesFilter from "@/features/products/ui/CategoriesFilter";
import { ProductList } from "@/features/products/ui/ProductList";
import { SortProductsOptions } from "@/features/products/ui/SortProductsOptions";
import { themeColors } from "@/utils/colors";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function HomeScreen() {
    const [category, setCategory] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>('');
    const categories = useCategories();
    const productsQuery = useProductsInfinite({ category, limit: 20, sortBy });

    const items = useMemo(
        () => productsQuery.data?.pages.flatMap((prod) => dtoListToCardVMList(prod).items) ?? [],
        [productsQuery.data]
    );

    const onEnd = useCallback(() => {
        if (productsQuery.hasNextPage && !productsQuery.isFetchingNextPage) 
            productsQuery.fetchNextPage();
    }, [productsQuery.hasNextPage, productsQuery.isFetchingNextPage, productsQuery.fetchNextPage]);

    if (productsQuery.isError && !productsQuery.isFetching) return (
        <ApiErrorMessage
            message="Error obtaining products list"
            retry={() => productsQuery.refetch()}
        />
    );

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

            {
                productsQuery.isLoading && 
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size={'large'} color={themeColors.brand} />
                </View>
            }

            {items &&
                <ProductList
                    products={items} 
                    onEnded={onEnd}
                    onRefresh={productsQuery.refetch}
                    refreshing={productsQuery.isRefetching && !productsQuery.isFetchingNextPage}
                    fetchingNextPage={productsQuery.isFetchingNextPage}
                />
            }
        </View>
    ) 
}