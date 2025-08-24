import { router } from "expo-router";
import { FlatList, Pressable } from "react-native";
import { ProductCardVM } from "../types/products.vm";
import { ProductListItem } from "./ProductListItem";

interface ProductsListProps {
    products: ProductCardVM[];
}

export const ProductList = ({products}: ProductsListProps) => {

    const navigateToProductDetails = (id: string) => {
        router.push({pathname: '/product/[id]', params: {id}});
    }

    return(
        <FlatList
            className="px-4"
            data={products ?? []}
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