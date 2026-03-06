import { ThemedText } from "@/components/ThemedText";
import { useGetSession } from "@/features/sessions/hooks/useSessions";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckIn() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const { data, isLoading } = useGetSession(id);

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ThemedText className="text-lg">Loading session...</ThemedText>
            </SafeAreaView>
        );
    }

    // const handleSave = async () => {
    //     try {
    //         await updateSession.mutateAsync({
    //             id,
    //             updateData: {
    //                 ...sessionData,
    //                 startAt: sessionData.startAt.toISOString(),
    //                 endAt: sessionData.endAt.toISOString()
    //             },
    //         });
    //         setHasUnsavedChanges(false);
    //         Alert.alert("Saved!", "Your changes have been saved.");
    //     } catch (error) {
    //         console.log("Failed to save:", error);
    //     }
    // };

    return (
        <SafeAreaView className="flex-1 p-4">
            <ThemedText>Check in</ThemedText>
        </SafeAreaView>
    );
}