import { themeColors } from "@/utils/colors";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import { ProductCardVM } from "../types/products.vm";
import { ProductListItem } from "./ProductListItem";

interface ProductsListProps {
    products: ProductCardVM[];
    onEnded: () => void;
    onRefresh: () => void;
    refreshing: boolean;
    fetchingNextPage: boolean;
}

export const ProductList = ({products, onEnded, onRefresh, refreshing, fetchingNextPage}: ProductsListProps) => {

    const navigateToProductDetails = (id: string, title: string) => {
        router.push({pathname: '/product/[id]', params: {id, title}});
    }

    return(
        <View className="flex-1">
            <FlatList
                className="flex-1 px-4"
                data={products ?? []}
                keyExtractor={(it) => it.id}
                renderItem={({ item }) => (
                    <Pressable onPress={() => navigateToProductDetails(item.id, item.title)}>
                        <ProductListItem product={item} />
                    </Pressable>
                )}
                contentContainerStyle={{ paddingVertical: 16, gap:12 }}
                onEndReached={onEnded}
                onEndReachedThreshold={0.4}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListFooterComponent={
                    fetchingNextPage ? (
                    <View className="py-4 items-center">
                        <ActivityIndicator color={themeColors.brand} />
                    </View>
                    ) : null
                }
            />
            
        </View>
    )
}