import { ThemedText } from "@/components/ThemedText";
import { useGetInstructors } from "@/features/user/hooks/useUsers";
import { Instructor } from "@/types/spinning.types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FlatList, Pressable, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Instructors() {
    const router = useRouter();
    const { data, isLoading, refetch, isFetching } = useGetInstructors();

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ThemedText className="text-lg">Loading instructors...</ThemedText>
            </SafeAreaView>
        );
    }

    function InstructorCard({ item }: { item: Instructor }) {
        const isDark = useColorScheme() === "dark";
        return (
            <Pressable
                onPress={() => router.push(`/instructors/${item.id}`)}
                className={`flex-row items-center rounded-xl p-4 m-2 gap-4 ${isDark ? "bg-gray-800" : "bg-white shadow-md"}`}
            >
                {item.instructorProfile?.image ? (
                    <Image
                        source={{ uri: item.instructorProfile.image }}
                        style={{ width: 48, height: 48, borderRadius: 24 }}
                        contentFit="cover"
                    />
                ) : (
                    <View className="w-12 h-12 rounded-full bg-gray-300 items-center justify-center">
                        <ThemedText className="text-lg font-bold text-gray-600">
                            {item.firstName[0]}
                        </ThemedText>
                    </View>
                )}
                <ThemedText className="text-lg font-semibold">
                    {item.firstName} {item.lastName}
                </ThemedText>
            </Pressable>
        );
    }

    return (
        <SafeAreaView className="flex-1">
            <ThemedText className="text-2xl font-bold my-4 mx-4">Instructors</ThemedText>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <InstructorCard item={item} />}
                refreshing={isFetching}
                onRefresh={refetch}
                contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
            />
        </SafeAreaView>
    );
}
