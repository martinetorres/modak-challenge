import { Pressable } from "react-native";

interface ThemedButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    enabled?: boolean;
}

export const ThemedButton = ({
    children, onPress, enabled = true
} : ThemedButtonProps) => {
    return(
        <Pressable 
            className={`py-3 px-5 items-center rounded-lg ${enabled ? 'bg-brand' : 'bg-muted'}`}
            onPress={enabled ? onPress : () => {}}>

            {children}

        </Pressable>
    )
}