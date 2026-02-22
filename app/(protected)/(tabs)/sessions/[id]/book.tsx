import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Book() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1">
            <View>
                <ThemedText>Book Session {id}</ThemedText>
                <Button
                    title="Go to Payment"
                    onPress={() => router.push(`/sessions/${id}/payment`)}
                />
            </View>
        </SafeAreaView>
    );
}