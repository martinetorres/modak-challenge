import { Text, View } from "react-native";

interface PriceTagProps {
    price: string;
    previousPrice?: string;
    discountPercentage?: string;
}

export const PriceTag = ({price, previousPrice, discountPercentage} : PriceTagProps) => {
    return(
        <View className="flex-row gap-2 items-center">
            <Text className="text-xl font-bold text-primary">{price}</Text>
            {previousPrice &&
                <Text className="text-md line-through text-secondary">{previousPrice}</Text>
            }
            {discountPercentage &&
                <View>
                    <Text className="text-sm text-green-500">{discountPercentage}%</Text>
                </View>
            }
        </View> 
    )
}