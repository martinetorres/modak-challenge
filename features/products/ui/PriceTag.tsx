import { Text, View } from "react-native";

interface PriceTagProps {
    price: string;
    previousPrice?: string;
    discountPercentage?: string;
}

export const PriceTag = ({price, previousPrice, discountPercentage} : PriceTagProps) => {
    return(
        <View className="flex-row gap-2 items-center">
            <Text className="text-lg font-bold">{price}</Text>
            {previousPrice &&
                <Text className="text-lg line-through">{previousPrice}</Text>
            }
            {discountPercentage &&
                <View>
                    <Text className="text-green-600 text-sm">{discountPercentage}%</Text>
                </View>
            }
        </View> 
    )
}