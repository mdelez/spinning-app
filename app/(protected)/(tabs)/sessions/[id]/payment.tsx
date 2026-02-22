import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment() {
    const { id: sessionId, bikeId } = useLocalSearchParams<{ id: string; bikeId: string }>();
    const router = useRouter();

    function executePayment() {
        router.replace(`/sessions/${sessionId}/confirmation`)
    }

    return (
        <SafeAreaView className="flex-1">
            <View>
                <ThemedText>Payment</ThemedText>
                <Button
                    title="Pay"
                    onPress={() => executePayment()}
                />
            </View>
        </SafeAreaView>
    );
}