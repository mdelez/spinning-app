import { ThemedText } from "@/components/ThemedText";
import { useCheckInUser } from "@/features/bookings/hooks/useBookings";
import { useGetSession, useGetSessionBookings } from "@/features/sessions/hooks/useSessions";
import { useTheme } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckIn() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { dark } = useTheme();
    const { data, isLoading } = useGetSession(id);
    const { data: bookings } = useGetSessionBookings(id);
    const { mutate: toggleCheckIn } = useCheckInUser(id);

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ThemedText className="text-lg">Loading session...</ThemedText>
            </SafeAreaView>
        );
    }

    const borderColor = dark ? "border-white" : "border-black";

    return (
        <SafeAreaView className="flex-1 p-4">
            <ThemedText>Check in</ThemedText>
            {bookings?.map(booking => {
                return (
                    <View key={booking.id} className={`flex-row justify-between items-center p-2 m-2 border rounded ${borderColor}`}>
                        <View>
                            <ThemedText>{booking.user.firstName}</ThemedText>
                            <ThemedText>Bike: {booking.bike.bikeNumber}</ThemedText>
                        </View>
                        <Switch onValueChange={() => toggleCheckIn({ bookingId: booking.id })} value={!!booking.checkedIn} />
                    </View>
                )
            })}
        </SafeAreaView>
    );
}