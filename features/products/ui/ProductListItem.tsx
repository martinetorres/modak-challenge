import { Image } from 'expo-image';
import { Text, View } from "react-native";
import { ProductCardVM } from "../types/products.vm";

interface ProductListItemProps {
    product: ProductCardVM;
}

export const ProductListItem = ({product} : ProductListItemProps) => {
    return(
        <View className='flex flex-row pl-2 pr-2'>
            <Image 
                source={product.thumbnailUrl} 
                style={{ width: 80, height: 80 }} 
                contentFit='cover' 
            />
            <View className='flex flex-column justify-center pl-2'>
                <Text className='text-lg'>{product.title}</Text>
                <Text>{product.priceFormatted}</Text>
            </View>
        </View>
    )
}