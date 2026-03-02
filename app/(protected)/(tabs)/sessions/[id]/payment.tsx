import { ThemedText } from "@/components/ThemedText";
import { AuthContext } from "@/context/authContext";
import { useCreateBooking } from "@/features/bookings/hooks/useBookings";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment() {
    const { user } = useContext(AuthContext);
    const { id: sessionId, bikeId } = useLocalSearchParams<{ id: string; bikeId: string }>();
    const router = useRouter();

    const { mutate } = useCreateBooking();

    const handlePayment = () => {
        mutate(
            {
                userId: user!.id,
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