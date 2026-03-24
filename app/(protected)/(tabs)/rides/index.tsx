import { ThemedText } from "@/components/ThemedText";
import { useGetRides } from "@/features/rides/hooks/useRides";
import { Ride } from "@/types/spinning.types";
import { useRouter } from "expo-router";
import { FlatList, Pressable, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Rides() {
    const router = useRouter();
    const { data, isLoading, refetch, isFetching } = useGetRides();

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ThemedText className="text-lg">Loading rides...</ThemedText>
            </SafeAreaView>
        );
    }

    function RideCard({ item, onPress }: { item: Ride; onPress: () => void }) {
        const isDark = useColorScheme() === "dark";

        return (
            <Pressable
                onPress={onPress}
                className={`
                    rounded-xl pb-4 pt-0 m-2
                    ${isDark ? "bg-gray-800 shadow-lg" : "bg-white shadow-md"}
                `}
            >
                <View
                    className={`
                        h-4 rounded-t-xl items-center
                        ${item.rideType === 'EVENT' ? "bg-red-500" : ""}
                        ${item.rideType === 'INTRO' ? "bg-blue-600" : ""}
                    `}>
                        <ThemedText className="font-extralight">
                            {item.rideType === 'EVENT' ? "Event" : item.rideType === 'INTRO' ? "Intro" : ""}
                        </ThemedText>
                </View>
                <View className="flex-row justify-between mb-2 px-4">
                    <ThemedText className="font-semibold text-lg">
                        {item.theme ? item.theme : "Ride"}
                    </ThemedText>
                    <ThemedText className="font-semibold text-lg">
                        Spots left: {item.availableSpots}
                    </ThemedText>
                </View>
                <View className="flex-row justify-between mt-2 px-4">
                    <ThemedText className="text-sm">
                        Instructor: {item.instructor.firstName}
                    </ThemedText>
                    <ThemedText className="text-sm">
                        {new Date(item.startAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                        {new Date(item.endAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </ThemedText>
                </View>
            </Pressable>
        );
    }

    return (
        <SafeAreaView className="flex-1">
            <ThemedText className="text-2xl font-bold my-4 mx-4">
                Browse available rides
            </ThemedText>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                // renderItem={({ item }) => (
                //     <Pressable
                //         onPress={() => router.push(`/rides/${item.id}`)}
                //         className="bg-blue-200 rounded-xl p-4 m-4"
                //     >
                //         <View className="justify-center items-center">
                //             <ThemedText color="#000" className="text-lg font-semibold mb-1">
                //                 {item.theme ? item.theme : 'Ride'}
                //             </ThemedText>
                //             <ThemedText color="#000">
                //                 Instructor: {item.instructor.firstName}
                //             </ThemedText>
                //             <ThemedText color="#000">
                //                 Spots left: {item.availableSpots}
                //             </ThemedText>
                //         </View>
                //     </Pressable>
                // )}
                renderItem={({ item }) => (
                    <RideCard item={item} onPress={() => router.push(`/rides/${item.id}`)} />
                )}
                refreshing={isFetching}
                onRefresh={refetch}
                contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
            />
        </SafeAreaView>
    );
}