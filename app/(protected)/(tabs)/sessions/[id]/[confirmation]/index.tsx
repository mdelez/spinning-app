import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Confirmation() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1">
            <View>
                <ThemedText>Confirmation</ThemedText>
                <Button
                    title="Go back to sessions"
                    onPress={() => router.replace(`/sessions`)}
                />
            </View>
        </SafeAreaView>
    );
}