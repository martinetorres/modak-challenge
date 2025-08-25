import { themeColors } from "@/utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface ApiErrorMessageProps {
    message: string;
    retry?: () => void;
}

export const ApiErrorMessage = ({message, retry} : ApiErrorMessageProps) => {
    return (
        <View className="p-4 flex-1 items-center">
            <Text className="text-lg mb-5 mt-10">
                {message}
            </Text>
            {retry &&
                <Pressable className="items-center" onPress={retry}>
                    <Text>Retry</Text>
                    <MaterialIcons name='refresh' size={50} color={themeColors.brand}/>
                </Pressable>
            }
        </View>
    )
}