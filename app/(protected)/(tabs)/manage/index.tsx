import { ThemedText } from "@/components/ThemedText";
import { AuthContext } from "@/context/authContext";
import { useGetRides } from "@/features/rides/hooks/useRides";
import Feather from '@expo/vector-icons/Feather';
import { Redirect, useRouter } from "expo-router";
import { useContext } from "react";
import { Button, FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Manage() {
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
    const { data, isLoading, refetch, isFetching } = useGetRides(
        isAdmin ? undefined : { instructorId: user!.id }
    );

    if (user?.role === "USER") {
        return <Redirect href="/" />;
    }


    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ThemedText className="text-lg">Loading rides...</ThemedText>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1">
            <ThemedText className="text-2xl font-bold my-4 mx-4">
                Manage your rides
            </ThemedText>

            {isAdmin && (
                <Button title="Create ride" onPress={() => router.push('/manage/create')} />
            )}

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="flex-row justify-between bg-blue-200 rounded-xl p-4 m-4">
                        <View className="flex-1 pr-4">
                            <ThemedText color="#000" className="text-lg font-semibold mb-1">
                                {item.theme ? item.theme : "Ride"}
                            </ThemedText>
                            <ThemedText color="#000" className="text-base">
                                Instructor: {item.instructor.firstName}
                            </ThemedText>
                        </View>
                        <View className={isAdmin ? "justify-between" : "justify-center"}>
                            <Pressable
                                onPress={() => router.push(`/manage/${item.id}/checkIn`)}
                            >
                                <Feather name="check-square" size={24} color="black" />
                            </Pressable>
                            {isAdmin && (
                                <Pressable
                                    onPress={() => router.push(`/manage/${item.id}/edit`)}
                                >
                                    <Feather name="edit" size={24} color="black" />
                                </Pressable>
                            )}
                        </View>
                    </View>
                )}
                refreshing={isFetching}
                onRefresh={refetch}
                contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
            />
        </SafeAreaView>
    );
}