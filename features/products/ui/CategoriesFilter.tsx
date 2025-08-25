import { themeColors } from "@/utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";
import { CategoryVM } from "../types/categories.vm";

type Props = {
  categories: CategoryVM[];
  value?: string;
  onChange: (slug: string) => void;
  placeholder?: string;
};

export default function CategoriesFilterNative({
  categories,
  value,
  onChange,
  placeholder = "All categories",
}: Props) {
  const hasValue = categories.some((i) => i.slug === value);
  return (
    <View className="bg-secondaryBg rounded-2xl mt-5 ml-5 mr-5 px-5 flex-row justify-between items-center gap-2">
      <MaterialIcons name="filter-list" color={themeColors.primary} size={20} />
      <Text className="text-lg">
        Category: 
      </Text>
      <View className="flex-1">
        <Picker
          selectedValue={hasValue ? value : "all"}
          onValueChange={(v) => {
            if (v) onChange(String(v));
          }}
          mode='dialog'
        >
          <Picker.Item label={placeholder} value="all" />
          {categories.map(({ slug, name }) => (
            <Picker.Item key={slug} label={name} value={slug} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
