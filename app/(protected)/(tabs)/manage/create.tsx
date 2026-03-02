import { ThemedDateTimePicker } from "@/components/ThemedDatePicker";
import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { AuthContext } from "@/context/authContext";
import { useCreateSession } from "@/features/sessions/hooks/useSessions";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Button, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateSession() {
    const { user } = useContext(AuthContext);
    const createSession = useCreateSession();
    const router = useRouter();

    // TODO: add studio id
    const [sessionData, setSessionData] = useState({
        name: "",
        description: "",
        startAt: new Date(),
        endAt: new Date(),
    });

    const handleSave = async () => {
        try {
            await createSession.mutateAsync({
                ...sessionData,
                startAt: sessionData.startAt.toISOString(),
                endAt: sessionData.endAt.toISOString(),
                instructorId: user!.id,
                studioId: '2d7e4c91-3b5f-4a8a-8d1e-1f2a3b4c4444'
            },
                {
                    onSuccess: () => {
                        Alert.alert(
                            "Success!",
                            "Your session has been created.",
                            [
                                {
                                    text: "Okay",
                                    style: 'default',
                                    onPress: () => {
                                        router.back();
                                    },
                                },
                            ]
                        );
                    }
                }
            )
        } catch (error) {
            console.log("Failed to create session: ", error)
        }
    }

    return (
        <SafeAreaView className="flex-1 p-4">
            <ScrollView>
                {/* Name */}
                <ThemedText className="text-lg font-semibold">Name</ThemedText>
                <ThemedTextInput
                    value={sessionData.name}
                    onChangeText={(text) => {
                        setSessionData((prev) => ({ ...prev, name: text }));
                        // setHasUnsavedChanges(true);
                    }}
                    className="border p-2 mb-4 rounded"
                />

                {/* Description */}
                <ThemedText className="text-lg font-semibold">Description</ThemedText>
                <ThemedTextInput
                    value={sessionData.description}
                    onChangeText={(text) => {
                        setSessionData((prev) => ({ ...prev, description: text }));
                        // setHasUnsavedChanges(true);
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
                        // setHasUnsavedChanges(true);
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
                        // setHasUnsavedChanges(true);
                    }}
                />

                {/* End Time */}
                <ThemedDateTimePicker
                    label="End Time"
                    mode="time"
                    value={sessionData.endAt}
                    onChange={(date) => {
                        setSessionData((prev) => ({ ...prev, endAt: date }));
                        // setHasUnsavedChanges(true);
                    }}
                />

                {/* Buttons */}
                <View className="flex-row justify-between mt-4">
                    <Button title="Create session" onPress={handleSave} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}