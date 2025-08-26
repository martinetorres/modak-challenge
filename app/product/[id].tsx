import { useProductDetails } from "@/features/products/hooks/useProductDetails";
import { ApiErrorMessage } from "@/features/products/ui/ApiErrorMessage";
import { ProductDetails } from "@/features/products/ui/ProductDetails";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function ProductDetailsScreen() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const product = useProductDetails({id: id});
    const navigation = useNavigation();

    useLayoutEffect(() => {
        if (product.data) { 
            navigation.setOptions({ headerTitle: product.data?.title });
        }
    }, [navigation, product.data]);
    
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