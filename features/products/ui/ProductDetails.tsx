import { ScrollView, Text, View } from "react-native";
import { ProductDetailVM } from "../types/products.vm";
import ImagesSlider from "./ImagesSlider";
import { RatingStars } from "./RatingStars";

interface ProductDetailProps {
    product: ProductDetailVM
}

export const ProductDetails = ({product} : ProductDetailProps) => {
    return(
        <ScrollView className='p-5'>
            <View className="flex flex-row justify-between">
                <View className="flex-row gap-2">
                    <Text>Brand: {product.brand}</Text>
                    <Text>|</Text>
                    <Text>{product.categoryLabel}</Text>
                </View>
                <RatingStars rating={product.rating} />
            </View>

            <Text className='text-2xl font-bold'>{product.title}</Text>
            <ImagesSlider images={product.images} />

            <View className='flex-row gap-2 items-center'>
                <Text className='text-5xl pt-2 pb-3'>{product.priceFormatted}</Text>
                {product.discountPercentage > 0 &&
                    <Text className='text-xl'>{`${product.discountPercentage}% OFF`}</Text>
                }
            </View>
            <Text className='text-xl'>{product.shippingInformation}</Text>
            <Text className='text-lg'>{product.warrantyInformation}</Text>

            <Text className='font-bold text-xl'>{product.availabilityStatus}</Text>

            <Text className='pt-6 pb-2 text-xl font-bold'>Description</Text>
            <Text className='pb-20'>{product.description}</Text>
        </ScrollView>
    )
}