import { ScrollView, Text, View } from "react-native";
import { ProductDetailVM } from "../types/products.vm";
import ImagesSlider from "./ImagesSlider";
import { PriceTag } from "./PriceTag";
import { RatingStars } from "./RatingStars";

interface ProductDetailProps {
    product: ProductDetailVM
}

export const ProductDetails = ({product} : ProductDetailProps) => {
    return(
        <ScrollView className='p-5'>
            <View className="flex flex-row justify-between">
                <View className="flex-row gap-2">
                    <Text className='text-secondary'>Brand: {product.brand}</Text>
                    <Text>|</Text>
                    <Text className='text-secondary'>{product.categoryLabel}</Text>
                </View>
                <RatingStars rating={product.rating} />
            </View>

            <Text className='text-2xl font-bold text-primary'>{product.title}</Text>
            <View className='mt-5 mb-5 bg-secondaryBg rounded-2xl'>
                <ImagesSlider images={product.images} />
            </View>
            
            <PriceTag 
                big
                price={product.priceFormatted}
                previousPrice={product.previousPriceFormatted}
                discountPercentage={product.discountPercentage.toString()} 
            />
            
            <View className="flex-row justify-between py-2">
                <Text className='text-lg text-secondary'>{product.shippingInformation}</Text>
                <Text className='text-lg text-secondary'>{product.warrantyInformation}</Text>
            </View>

            <Text className='font-bold text-xl text-primary'>{product.availabilityStatus}</Text>

            <Text className='pt-6 pb-2 text-xl font-bold text-primary'>Description</Text>
            <Text className='pb-20 text-secondary text-justify leading-6'>{product.description}</Text>
        </ScrollView>
    )
}