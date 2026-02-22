import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/features/sessions/hooks/useSessions";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Details() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { data, isLoading } = useSession(id);
    // console.log(data);

    const start = new Date(data?.startAt ?? new Date());
    const end = new Date(data?.endAt ?? new Date());

    const formattedDate = new Intl.DateTimeFormat("en-CH", {
        weekday: "long",
        day: "numeric",
        month: "long",
    }).format(start);

    const formattedStartTime = new Intl.DateTimeFormat("en-CH", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(start);

    const formattedEndTime = new Intl.DateTimeFormat("en-CH", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(end);

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ThemedText className="text-lg">Loading sessions...</ThemedText>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1">
            <ThemedText className="text-2xl font-bold my-4 mx-4">Date: {formattedDate}</ThemedText>
            <ThemedText className="text-2xl font-bold my-4 mx-4">Name: {data?.name}</ThemedText>
            <ThemedText className="text-2xl font-bold my-4 mx-4">Instructor: {data?.instructor.firstName}</ThemedText>
            <ThemedText className="text-2xl font-bold my-4 mx-4">Start time: {formattedStartTime}</ThemedText>
            <ThemedText className="text-2xl font-bold my-4 mx-4">End time: {formattedEndTime}</ThemedText>
            <Button
                title="Book now"
                onPress={() => router.push(`/sessions/${id}/book`)}
            />
        </SafeAreaView>
    );
}
