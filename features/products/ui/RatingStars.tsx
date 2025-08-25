import { themeColors } from "@/utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type Props = {
  rating: number;
  size?: number;
  colorFilled?: string;
  colorEmpty?: string;
};

export const RatingStars = ({
  rating,
  size = 18,
  colorFilled = themeColors.stars,
  colorEmpty = themeColors.muted,
}: Props) => {
  const r = Math.max(0, Math.min(5, Number(rating) || 0));
  return (
    <View className="flex-row">
        <Text className="pr-1 text-secondary">{rating}</Text>

        {Array.from({ length: 5 }).map((_, i) => {
            const v = r - i;
            const name = v >= 1 ? "star" : v >= 0.5 ? "star-half" : "star";
            const color = v >= 0.5 ? colorFilled : colorEmpty;
            return <MaterialIcons key={i} name={name as any} size={size} color={color} />;
        })}
    </View>
  );
}
