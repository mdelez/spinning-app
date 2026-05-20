import { ThemedText } from "@/components/ThemedText";
import { useLeaveWaitlist } from "@/features/bookings/hooks/use-bookings";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Alert, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ManageWaitlist() {
    const { rideId, position, status } = useLocalSearchParams<{
        rideId: string;
        position: string;
        status: string;
    }>();
    const router = useRouter();
    const { mutate: leaveWaitlist, isPending } = useLeaveWaitlist();

    const handleLeavePress = () => {
        Alert.alert(
            "Leave Waitlist",
            "Are you sure you want to leave the waitlist?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Leave",
                    style: "destructive",
                    onPress: () => {
                        leaveWaitlist(
                            { rideId },
                            { onSuccess: () => router.back() }
                        );
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 p-4">
            <ThemedText className="text-xl mb-4">Manage waitlist</ThemedText>

            {status === "NOTIFIED" ? (
                <ThemedText className="mb-8">Your spot is ready — book now before it expires!</ThemedText>
            ) : (
                <ThemedText className="mb-8">
                    {position ? `You are at position ${position} on the waitlist.` : "You are on the waitlist."}
                </ThemedText>
            )}

            <Pressable
                onPress={handleLeavePress}
                disabled={isPending}
                className="bg-red-600 py-4 rounded-xl items-center"
            >
                {isPending ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <ThemedText className="text-white font-semibold">
                        Leave waitlist
                    </ThemedText>
                )}
            </Pressable>
        </SafeAreaView>
    );
}
