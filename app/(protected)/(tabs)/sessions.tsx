import { ThemedText } from "@/components/ThemedText";
import { useSessions } from "@/features/sessions/hooks/useSessions";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Sessions() {
    const { data, isLoading, refetch, isFetching } = useSessions();

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
                    <View className="bg-blue-200 rounded-xl p-4 m-4 justify-center items-center">
                        <ThemedText color="#000" className="text-lg font-semibold mb-1">{item.name}</ThemedText>
                        <ThemedText color="#000" className="text-base">{item.description}</ThemedText>
                        <ThemedText color="#000" className="text-base">Instructor: {item.instructor.firstName}</ThemedText>
                    </View>
                )}
                refreshing={isFetching}
                onRefresh={refetch}
                contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
            />
        </SafeAreaView>
    );
}