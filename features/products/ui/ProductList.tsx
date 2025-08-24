import { router } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { useProducts } from "../hooks/useProducts";
import { ProductListItem } from "./ProductListItem";

export const ProductList = () => {
    
    const products = useProducts({ limit: 30, skip: 0 });

    if (products.isLoading) return <View className="flex-1 items-center justify-center"><ActivityIndicator /></View>;
    if (products.isError) return <View className="p-4"><Text>Ocurrió un error</Text></View>;

    const navigateToProductDetails = (id: string) => {
        router.push({pathname: '/product/[id]', params: {id}});
    }

    return(
        <FlatList
            className="px-4"
            data={products.data?.items ?? []}
            keyExtractor={(it) => it.id}
            renderItem={({ item }) => (
                <Pressable onPress={() => navigateToProductDetails(item.id)}>
                    <ProductListItem product={item} />
                </Pressable>
            )}
            contentContainerStyle={{ paddingVertical: 16 }}
        />
    )
}