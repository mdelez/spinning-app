import { ThemedDateTimePicker } from "@/components/ThemedDatePicker";
import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { useCreateSession } from "@/features/sessions/hooks/useSessions";
import { useGetStudios } from "@/features/studios/hooks/useStudios";
import { useGetInstructors } from "@/features/user/hooks/useUsers";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateSession() {
    const { data: instructors } = useGetInstructors();
    const { data: studios } = useGetStudios();
    const createSession = useCreateSession();
    const router = useRouter();

    // TODO: add studio id
    const [sessionData, setSessionData] = useState({
        name: "",
        description: "",
        instructorId: "",
        studioId: "",
        startAt: new Date(),
        endAt: new Date(),
    });

    const handleSave = async () => {
        try {
            await createSession.mutateAsync({
                ...sessionData,
                startAt: sessionData.startAt.toISOString(),
                endAt: sessionData.endAt.toISOString(),
                instructorId: sessionData.instructorId,
                studioId: sessionData.studioId
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

                {/* Studio */}
                <Picker
                    selectedValue={sessionData.studioId}
                    onValueChange={(itemValue) => setSessionData({
                        ...sessionData,
                        studioId: itemValue
                    })}
                >
                    <Picker.Item label="Select a studio" value={null} />
                    {studios?.map((studio) => (
                        <Picker.Item
                            key={studio.id}
                            label={studio.name}
                            value={studio.id}
                        />
                    ))}
                </Picker>

                {/* Instructor */}
                <Picker
                    selectedValue={sessionData.instructorId}
                    onValueChange={(itemValue) => setSessionData({
                        ...sessionData,
                        instructorId: itemValue
                    })}
                >
                    <Picker.Item label="Select an instructor" value={null} />
                    {instructors?.map((instructor) => (
                        <Picker.Item
                            key={instructor.id}
                            label={`${instructor.firstName} ${instructor.lastName}`}
                            value={instructor.id}
                        />
                    ))}
                </Picker>

                {/* Buttons */}
                <View className="flex-row justify-between mt-4">
                    <Button title="Create session" onPress={handleSave} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}