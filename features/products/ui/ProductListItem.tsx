import { themeColors } from '@/utils/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Text, View } from "react-native";
import { ProductCardVM } from "../types/products.vm";
import { PriceTag } from './PriceTag';

interface ProductListItemProps {
    product: ProductCardVM;
}

export const ProductListItem = ({product} : ProductListItemProps) => {
    return(
        <View className='flex flex-row pl-2 pr-2 bg-secondaryBg rounded-3xl'>
            <Image 
                source={product.thumbnailUrl} 
                style={{ width: 80, height: 80 }} 
                contentFit='cover' 
            />
            <View className='flex flex-col justify-center flex-1 gap-1 p-6 pr-4 pl-3'>
                <Text className='text-lg shrink text-primary'>{product.title}</Text>
                
                <View className='flex-row justify-between'>
                    <PriceTag 
                        price={product.priceFormatted}
                        previousPrice={product.previousPriceFormatted}
                        discountPercentage={product.discountPercentage} 
                    />

                    <View className='flex-row items-center gap-1'>
                        <MaterialIcons name='star' color={themeColors.stars} />
                        <Text className='text-md font-bold text-secondary'>{product.rating}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}