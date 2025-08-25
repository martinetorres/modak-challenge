import { FlatList, Text, View } from "react-native";
import { ReviewVM } from "../types/products.vm";
import { RatingStars } from "./RatingStars";

interface ProductReviewsProps {
    reviews: ReviewVM[];
}

export const ProductReviews = ({reviews} : ProductReviewsProps) => {
    return (
        <>
            <Text className="text-xl font-bold text-primary mb-2">Latest reviews</Text>
            <FlatList 
                data={reviews}
                contentContainerClassName="flex-column gap-5 pb-20"
                renderItem={({item}) => (
                    <View className="bg-secondaryBg p-5 rounded-2xl">
                        <View className="flex-row justify-between mt-1">
                            <Text className="text-lg font-bold">{item.reviewer}</Text>
                            <Text>{item.date}</Text>
                        </View>

                        <Text>{item.comment}</Text>
                        
                        <View className="pt-2">
                            <RatingStars rating={item.rating} />
                        </View>
                    </View>
                )}
            />
        </>
    )
}