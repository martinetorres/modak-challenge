import { useProductDetails } from "@/features/products/hooks/useProductDetails";
import { ProductDetails } from "@/features/products/ui/ProductDetails";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function ProductDetailsScreen() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const product = useProductDetails({id: id});
    
    if (product.isLoading) return <View className="flex-1 items-center justify-center"><ActivityIndicator /></View>;
    if (product.isError) return <View className="p-4"><Text>Ocurrió un error</Text></View>;
    
    if (product.data) {
        return(
            <ProductDetails product={product.data} />
        )
    }
}