import { Text, View } from "react-native";

interface PriceTagProps {
    price: string;
    previousPrice?: string;
    discountPercentage?: string;
    big?: boolean;
}

export const PriceTag = ({price, previousPrice, discountPercentage, big = false} : PriceTagProps) => {

    const priceClass = big ? 'text-5xl' : 'text-xl';
    const previousPriceClass = big ? 'text-2xl' : 'text-md';
    const discountPercentageClass = big ? 'text-lg' : 'text-sm';

    return(
        <View className="flex-row gap-2 items-center">
            <Text className={`${priceClass} font-bold text-primary`}>{price}</Text>
            {previousPrice &&
                <Text className={`${previousPriceClass} line-through text-secondary`}>{previousPrice}</Text>
            }
            {discountPercentage &&
                <View>
                    <Text className={`${discountPercentageClass} text-green-600`}>{discountPercentage}%</Text>
                </View>
            }
        </View> 
    )
}