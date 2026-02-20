import { useTheme } from "@react-navigation/native";
import { Text, View } from "react-native";

export default function Sessions() {
    const { colors } = useTheme();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.background
            }}
        >
            <Text style={{ color: colors.text }}>Browse available sessions</Text>
        </View>
    );
}