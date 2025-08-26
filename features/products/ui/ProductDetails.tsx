import { scheduleLocalInMinutes } from "@/lib/localNotifications";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ProductDetailVM } from "../types/products.vm";
import ImagesSlider from "./ImagesSlider";
import { PriceTag } from "./PriceTag";
import { ProductReviews } from "./ProductReviews";
import { RatingStars } from "./RatingStars";
import { ThemedButton } from "./ThemedButton";

interface ProductDetailProps {
    product: ProductDetailVM
}

export const ProductDetails = ({product} : ProductDetailProps) => {
    const [notifScheduled, setNotifScheduled] = useState(false);
    const [catNotifScheduled, setCatNotifScheduled] = useState(false);

    const createNotification = () => {
        if (!notifScheduled) {
            scheduleLocalInMinutes(
                0.1,
                "Purchase reminder",
                product.title,
                { url: `/product/${product.id}` }
            );

            setNotifScheduled(true);
        }
    }

    const createCategoryNotification = () => {
        if (!catNotifScheduled) {
            scheduleLocalInMinutes(
                0.1,
                "Category deeplink",
                product.categoryLabel,
                { url: `/category/${product.categorySlug}` }
            );

            setCatNotifScheduled(true);
        }
    }

    return(
        <ScrollView className='p-5'>
            <View className="flex flex-row justify-between">
                <View className="flex-row gap-2">
                    <Text className='text-secondary'>Brand: {product.brand}</Text>
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
            
            <View className="flex-row justify-between pb-2 pt-4">
                <Text className='text-lg text-secondary'>{product.shippingInformation}</Text>
                <Text className='text-lg text-secondary'>{product.warrantyInformation}</Text>
            </View>

            <Text className='font-bold text-xl text-primary'>{product.availabilityStatus}</Text>

            <Text className='pt-6 pb-2 text-xl font-bold text-primary'>Description</Text>
            <Text className='pb-7 text-secondary text-justify leading-6'>{product.description}</Text>

            <View className='flex-column gap-5'>
                <ThemedButton onPress={createNotification} enabled={!notifScheduled}>
                    {notifScheduled ?
                        <Text className="text-lg text-primaryBg">Notification scheduled</Text>
                        :
                        <Text className="text-lg text-primaryBg">Quick reminder</Text>
                    }
                </ThemedButton>

                <ThemedButton onPress={createCategoryNotification} enabled={!catNotifScheduled}>
                    {catNotifScheduled ?
                        <Text className="text-lg text-primaryBg">Notification scheduled</Text>
                        :
                        <Text className="text-lg text-primaryBg">Test category deeplink</Text>
                    }
                </ThemedButton>
            </View>

            <ProductReviews reviews={product.reviews} />
        </ScrollView>
    )
}