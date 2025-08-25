import { themeColors } from "@/utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";

interface SortProductsOptionsProps {
    onChange: (sortBy: string) => void;
    value: string;
}

export const SortProductsOptions = ({onChange, value} : SortProductsOptionsProps) => {
    const filterOptions = [
        { label: 'Default', sortQuery: '' },
        { label: 'Lower price', sortQuery: '?sortBy=price&order=asc' },
        { label: 'Higher price', sortQuery: '?sortBy=price&order=desc' },
        { label: 'Lower rating', sortQuery: '?sortBy=rating&order=asc' },
        { label: 'Higher rating', sortQuery: '?sortBy=rating&orer=desc' },
    ];
    
    const hasValue = filterOptions.some((i) => i.sortQuery === value);

    return(
        <View className="bg-secondaryBg rounded-2xl mt-5 ml-5 mr-5 px-5 flex-row justify-between items-center gap-2 mb-5">
            <MaterialIcons name="swap-vert" color={themeColors.primary} size={20} />
            <Text className="text-lg">
                Sort: 
            </Text>
            <View className="flex-1">
                <Picker
                    onValueChange={(v: string) => {
                        if (v) {
                            onChange(String(v));
                        } else onChange(String(''));
                    }}
                    selectedValue={hasValue ? value : ''}
                >
                    {filterOptions.map(({ label, sortQuery}) => (
                        <Picker.Item 
                            key={label} 
                            label={label} 
                            value={sortQuery} 
                        />
                    ))}
                </Picker>
            </View>
        </View>
    )
}