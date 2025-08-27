import { themeColors } from "@/utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Text, useColorScheme, View } from "react-native";

interface SortProductsOptionsProps {
    onChange: (sortBy: string) => void;
    value: string;
    isFetching: boolean;
}

export const SortProductsOptions = ({onChange, value, isFetching} : SortProductsOptionsProps) => {
    const filterOptions = [
        { label: 'Default', sortQuery: '' },
        { label: 'Lower price', sortQuery: '?sortBy=price&order=asc' },
        { label: 'Higher price', sortQuery: '?sortBy=price&order=desc' },
        { label: 'Lower rating', sortQuery: '?sortBy=rating&order=asc' },
        { label: 'Higher rating', sortQuery: '?sortBy=rating&orer=desc' },
    ];
    
    const hasValue = filterOptions.some((i) => i.sortQuery === value);
    
    const colorScheme = useColorScheme();

    const [pickerFontColor, setPickerFontColor] = useState(themeColors.primary);
    const [pickerBgColor, setPickerBgColor] = useState(themeColors.primaryBg);
    
    useEffect(() => {
        if (colorScheme === 'dark') {
            setPickerFontColor(themeColors.primaryBg);
            setPickerBgColor(themeColors.primary);
        } 
    }, [colorScheme]);

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
                    enabled={!isFetching}
                >
                    {filterOptions.map(({ label, sortQuery}) => {
                        const isSelected = sortQuery === value;
                        return (
                            <Picker.Item 
                                key={label} 
                                label={label} 
                                value={sortQuery} 
                                color={isSelected ? themeColors.secondary : pickerFontColor}
                                style={{backgroundColor: isSelected ? themeColors.secondaryBg : pickerBgColor}}
                            />
                        )
                    })}
                </Picker>
            </View>
        </View>
    )
}