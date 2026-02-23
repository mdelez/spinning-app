import { ThemedText } from "@/components/ThemedText";
import { useBookingsForUser } from "@/features/bookings/hooks/useBookings";
import { useRouter } from "expo-router";
import { FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Bookings() {
    const { data: bookings, isLoading, refetch, isFetching } = useBookingsForUser('3a8d5f62-1e4c-4c9d-a7b1-6f3e9d5c3333');
    const router = useRouter();
    
    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ThemedText className="text-lg">Loading your sessions...</ThemedText>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1">
            <ThemedText className="text-2xl font-bold my-4 mx-4">
                Your upcoming sessions
            </ThemedText>

            <FlatList
                data={bookings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => router.push(`/${item.id}`)}
                        className="bg-green-400 rounded-xl p-4 m-4"
                    >
                        <View className="justify-center items-center">
                            <ThemedText color="#000" className="text-lg font-semibold mb-1">
                                {item.session.name}
                            </ThemedText>
                            <ThemedText color="#000" className="text-base">
                                Instructor: {item.session.instructor.firstName}
                            </ThemedText>
                        </View>
                    </Pressable>
                )}
                refreshing={isFetching}
                onRefresh={refetch}
                contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
            />
        </SafeAreaView>
    );
}
