import { ThemedText } from "@/components/ThemedText";
import { useCreateBooking } from "@/features/bookings/hooks/useBookings";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment() {
    const { id: sessionId, bikeId } = useLocalSearchParams<{ id: string; bikeId: string }>();
    const router = useRouter();

    const { mutate } = useCreateBooking();

    const handlePayment = () => {
        mutate(
            {
                userId: '3a8d5f62-1e4c-4c9d-a7b1-6f3e9d5c3333',
                sessionId,
                userBikeId: bikeId,
                paid: true
            },
            {
                onSuccess: () => {
                    router.replace(`/sessions/${sessionId}/confirmation`);
                },
                onError: () => {
                    console.error('payment failed')
                },
            }
        );
    }

    return (
        <SafeAreaView className="flex-1">
            <View>
                <ThemedText>Payment</ThemedText>
                <Button
                    title="Pay"
                    onPress={() => handlePayment()}
                />
            </View>
        </SafeAreaView>
    );
}