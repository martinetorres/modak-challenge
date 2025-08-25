import { useProductDetails } from "@/features/products/hooks/useProductDetails";
import { ApiErrorMessage } from "@/features/products/ui/ApiErrorMessage";
import { ProductDetails } from "@/features/products/ui/ProductDetails";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function ProductDetailsScreen() {
    const {id, title} = useLocalSearchParams<{ id: string, title: string }>();
    const product = useProductDetails({id: id});
    const navigation = useNavigation();

    useLayoutEffect(() => {
        if (title) { 
            navigation.setOptions({ headerTitle: title });
        }
    }, [navigation, title]);
    
    if (product.isLoading) return <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={'large'} />
    </View>;
    
    if (product.isError && !product.isFetching) return (
        <ApiErrorMessage 
            message="Error obtaining product details" 
            retry={() => product.refetch()}
        />
    );
    
    if (product.data) {
        return(
            <ProductDetails product={product.data} />
        )
    }
}