import { useProductDetails } from "@/features/products/hooks/useProductDetails";
import { ProductDetails } from "@/features/products/ui/ProductDetails";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function ProductDetailsScreen() {
    const {id, title} = useLocalSearchParams<{ id: string, title: string }>();
    const product = useProductDetails({id: id});
    const navigation = useNavigation();

    useLayoutEffect(() => {
        if (title) { 
            navigation.setOptions({ headerTitle: title });
        }
    }, [navigation, title]);
    
    if (product.isLoading) return <View className="flex-1 items-center justify-center"><ActivityIndicator /></View>;
    if (product.isError) return <View className="p-4"><Text>Ocurrió un error</Text></View>;
    
    if (product.data) {
        return(
            <ProductDetails product={product.data} />
        )
    }
}