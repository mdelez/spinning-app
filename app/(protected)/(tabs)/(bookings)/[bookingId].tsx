import { ThemedText } from "@/components/ThemedText";
import { useBookingById, useDeleteBooking } from "@/features/bookings/hooks/useBookings";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Alert, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ManageBooking() {
    const { bookingId } = useLocalSearchParams<{ bookingId: string; }>();
    const router = useRouter();

    const { data: booking } = useBookingById(bookingId);
    const { mutate: deleteBooking, isPending } = useDeleteBooking();

    const handleDeletePress = () => {
        Alert.alert(
            "Delete Booking",
            "Are you sure you want to delete this booking?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        if (!booking) return;

                        deleteBooking(
                            { bookingId, userId: booking.userId },
                            {
                                onSuccess: () => router.back()
                            }
                        );
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 p-4">
            <ThemedText className="text-xl mb-4">Manage booking</ThemedText>

            <ThemedText className="mb-8">
                Bike Number: {booking?.bike.bikeNumber}
            </ThemedText>

            <Pressable
                onPress={handleDeletePress}
                disabled={isPending}
                className="bg-red-600 py-4 rounded-xl items-center"
            >
                {isPending ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <ThemedText className="text-white font-semibold">
                        Delete booking
                    </ThemedText>
                )}
            </Pressable>
        </SafeAreaView>
    );
}
