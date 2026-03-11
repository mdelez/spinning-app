import { ThemedText } from "@/components/ThemedText";
import { AuthContext } from "@/context/authContext";
import { useGetBookingsForUser } from "@/features/bookings/hooks/useBookings";
import { Booking } from "@/types/spinning.types";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, SectionList, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function formatDateHeader(dateStr: string) {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-CH", options); // e.g., Monday 23.2.2026
}

function groupBookingsByDate(bookings: Booking[]) {
    const grouped: Record<string, Booking[]> = {};
    bookings.forEach((booking) => {
        const dateKey = booking.ride.startAt.split("T")[0]; // YYYY-MM-DD
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(booking);
    });

    return Object.entries(grouped)
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .map(([date, bookings]) => ({ title: formatDateHeader(date), data: bookings }));
}

function BookingCard({ item, onPress }: { item: Booking; onPress: () => void }) {
  const isDark = useColorScheme() === "dark";

  return (
    <Pressable
      onPress={onPress}
      className={`
        rounded-xl p-4 m-2
        ${isDark ? "bg-gray-800 shadow-lg" : "bg-white shadow-md"}
      `}
    >
      <View className="flex-row justify-between mb-2">
        <ThemedText className="font-semibold text-lg">
          {item.ride.theme ? item.ride.theme : "Ride"}
        </ThemedText>
        <ThemedText className="font-semibold text-lg">
          Bike {item.bike.bikeNumber}
        </ThemedText>
      </View>
      <View className="flex-row justify-between mt-2">
        <ThemedText className="text-sm">
          Instructor: {item.ride.instructor.firstName}
        </ThemedText>
        <ThemedText className="text-sm">
          {new Date(item.ride.startAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
          {new Date(item.ride.endAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </ThemedText>
      </View>
    </Pressable>
  );
}

export default function Bookings() {
    const { user } = useContext(AuthContext);
    const { data: bookings, isLoading, refetch, isFetching } = useGetBookingsForUser(user!.id);
    const router = useRouter();

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ThemedText className="text-lg">Loading your rides...</ThemedText>
            </SafeAreaView>
        );
    }

    const sections = groupBookingsByDate(bookings || []);

    return (
        <SafeAreaView className="flex-1">
          <ThemedText className="text-2xl font-bold my-4 mx-4">
                {`Hi ${user?.firstName}!`}
            </ThemedText>
            <ThemedText className="text-2xl font-bold my-4 mx-4">
                Your upcoming rides
            </ThemedText>

            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderSectionHeader={({ section: { title } }) => (
                    <ThemedText className="text-xl font-semibold mt-4 mb-2 mx-4">{title}</ThemedText>
                )}
                renderItem={({ item }) => (
                    <BookingCard item={item} onPress={() => router.push(`/${item.id}`)} />
                )}
                refreshing={isFetching}
                onRefresh={refetch}
                contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
            />
        </SafeAreaView>
    );
}
