import { ThemedDateTimePicker } from "@/components/ThemedDatePicker";
import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { useDeleteSession, useGetSession, useUpdateSession } from "@/features/sessions/hooks/useSessions";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ManageSession() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const { data, isLoading } = useGetSession(id);
    const updateSession = useUpdateSession();
    const deleteSession = useDeleteSession();

    const [sessionData, setSessionData] = useState({
        name: "",
        description: "",
        startAt: new Date(),
        endAt: new Date(),
    });

    // TODO: prompt user on back navigation if unsaved changes exist
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // populate local state when session data loads
    useEffect(() => {
        if (data) {
            setSessionData({
                name: data.name,
                description: data.description,
                startAt: new Date(data.startAt),
                endAt: new Date(data.endAt),
            });
        }
    }, [data]);

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ThemedText className="text-lg">Loading session...</ThemedText>
            </SafeAreaView>
        );
    }

    const handleSave = async () => {
        console.log('sessionData: ', sessionData.startAt.toISOString());
        try {
            await updateSession.mutateAsync({
                id,
                updateData: {
                    ...sessionData,
                    startAt: sessionData.startAt.toISOString(),
                    endAt: sessionData.endAt.toISOString()
                },
            });
            setHasUnsavedChanges(false);
            Alert.alert("Saved!", "Your changes have been saved.");
        } catch (error) {
            console.log("Failed to save:", error);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete Session",
            "Are you sure you want to delete this session?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        deleteSession.mutate({ sessionId: id, instructorId: data!.instructor.id }, {
                            onSuccess: () => router.back(),
                        });
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 p-4">
            <ScrollView>
                {/* Name */}
                <ThemedText className="text-lg font-semibold">Name</ThemedText>
                <ThemedTextInput
                    value={sessionData.name}
                    onChangeText={(text) => {
                        setSessionData((prev) => ({ ...prev, name: text }));
                        setHasUnsavedChanges(true);
                    }}
                    className="border p-2 mb-4 rounded"
                />

                {/* Description */}
                <ThemedText className="text-lg font-semibold">Description</ThemedText>
                <ThemedTextInput
                    value={sessionData.description}
                    onChangeText={(text) => {
                        setSessionData((prev) => ({ ...prev, description: text }));
                        setHasUnsavedChanges(true);
                    }}
                    className="border p-2 mb-4 rounded"
                    multiline
                />

                {/* Date */}
                <ThemedDateTimePicker
                    label="Date"
                    mode="date"
                    value={sessionData.startAt} // use start date as base
                    onChange={(date) => {
                        setSessionData((prev) => ({
                            ...prev,
                            startAt: new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDate(),
                                prev.startAt.getHours(),
                                prev.startAt.getMinutes()
                            ),
                            endAt: new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDate(),
                                prev.endAt.getHours(),
                                prev.endAt.getMinutes()
                            ),
                        }));
                        setHasUnsavedChanges(true);
                    }}
                />

                {/* Start Time */}
                <ThemedText className="text-lg font-semibold">Start Time</ThemedText>
                <ThemedDateTimePicker
                    label="Start Time"
                    mode="time"
                    value={sessionData.startAt}
                    onChange={(date) => {
                        setSessionData((prev) => ({ ...prev, startAt: date }));
                        setHasUnsavedChanges(true);
                    }}
                />

                {/* End Time */}
                <ThemedDateTimePicker
                    label="End Time"
                    mode="time"
                    value={sessionData.endAt}
                    onChange={(date) => {
                        setSessionData((prev) => ({ ...prev, endAt: date }));
                        setHasUnsavedChanges(true);
                    }}
                />

                {/* Buttons */}
                <View className="flex-row justify-between mt-4">
                    <Button title="Delete Session" color="red" onPress={handleDelete} />
                    <Button title="Save Changes" onPress={handleSave} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}