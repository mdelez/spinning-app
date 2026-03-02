import { ThemedText } from "@/components/ThemedText";
import { AuthContext } from "@/context/authContext";
import { useGetSessionsByInstructor } from "@/features/sessions/hooks/useSessions";
import { Redirect, useRouter } from "expo-router";
import { useContext } from "react";
import { FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Manage() {
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const { data, isLoading, refetch, isFetching } = useGetSessionsByInstructor(user!.id);

    if (user?.role !== "INSTRUCTOR") {
        return <Redirect href="/" />;
    }


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
                Manage your sessions
            </ThemedText>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => router.push(`/manage/${item.id}`)}
                        className="bg-blue-200 rounded-xl p-4 m-4"
                    >
                        <View className="justify-center items-center">
                            <ThemedText color="#000" className="text-lg font-semibold mb-1">
                                {item.name}
                            </ThemedText>
                            <ThemedText color="#000" className="text-base">
                                {item.description}
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