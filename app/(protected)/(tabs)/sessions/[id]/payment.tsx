import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1">
            <View>
                <ThemedText>Payment</ThemedText>
                <Button
                    title="Pay"
                    onPress={() => router.replace(`/sessions/${id}/confirmation`)}
                />
            </View>
        </SafeAreaView>
    );
}