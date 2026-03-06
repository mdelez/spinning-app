import { ThemedText } from "@/components/ThemedText";
import { useGetSessions } from "@/features/sessions/hooks/useSessions";
import { useRouter } from "expo-router";
import { FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Sessions() {
    const router = useRouter();
    const { data, isLoading, refetch, isFetching } = useGetSessions();

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ThemedText className="text-lg">Loading sessions...</ThemedText>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1">
            <ThemedText className="text-2xl font-bold my-4 mx-4">
                Browse available sessions
            </ThemedText>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => router.push(`/sessions/${item.id}`)}
                        className="bg-blue-200 rounded-xl p-4 m-4"
                    >
                        <View className="justify-center items-center">
                            <ThemedText color="#000" className="text-lg font-semibold mb-1">
                                {item.theme ? item.theme : 'Ride'}
                            </ThemedText>
                            <ThemedText color="#000" className="text-base">
                                Instructor: {item.instructor.firstName}
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