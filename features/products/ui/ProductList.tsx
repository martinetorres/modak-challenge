import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useProducts } from "../hooks/useProducts";
import { ProductListItem } from "./ProductListItem";

export const ProductList = () => {
    
    const products = useProducts({ limit: 20, skip: 0 });

    if (products.isLoading) return <View className="flex-1 items-center justify-center"><ActivityIndicator /></View>;
    if (products.isError) return <View className="p-4"><Text>Ocurrió un error</Text></View>;

    return(
        <FlatList
            className="px-4"
            data={products.data?.items ?? []}
            keyExtractor={(it) => it.id}
            renderItem={({ item }) => (
                <ProductListItem product={item} />
            )}
            contentContainerStyle={{ paddingVertical: 16 }}
        />
    )
}