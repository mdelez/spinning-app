import { ThemedDateTimePicker } from "@/components/ThemedDatePicker";
import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { useCreateRide } from "@/features/rides/hooks/useRides";
import { useGetStudios } from "@/features/studios/hooks/useStudios";
import { useGetInstructors } from "@/features/user/hooks/useUsers";
import { RideFormData, rideTypes } from "@/types/form.types";
import { RideType } from "@/types/spinning.types";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateRide() {
    const { data: instructors } = useGetInstructors();
    const { data: studios } = useGetStudios();
    const createRide = useCreateRide();
    const router = useRouter();

    // TODO: add studio id
    const [rideData, setRideData] = useState<RideFormData>({
        theme: "",
        description: "",
        instructorId: "",
        studioId: "",
        startAt: new Date(),
        endAt: new Date(),
        rideType: "NORMAL",
        tokenPrice: 1.0
    });

    const handleSave = async () => {
        try {
            await createRide.mutateAsync({
                ...rideData,
                startAt: rideData.startAt.toISOString(),
                endAt: rideData.endAt.toISOString(),
                instructorId: rideData.instructorId,
                studioId: rideData.studioId
            },
                {
                    onSuccess: () => {
                        Alert.alert(
                            "Success!",
                            "Your ride has been created.",
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
            console.log("Failed to create ride: ", error)
        }
    }

    return (
        <SafeAreaView className="flex-1 p-4">
            <ScrollView>
                {/* Theme */}
                <ThemedText className="text-lg font-semibold">Theme</ThemedText>
                <ThemedTextInput
                    value={rideData.theme}
                    onChangeText={(text) => {
                        setRideData((prev) => ({ ...prev, theme: text }));
                        // setHasUnsavedChanges(true);
                    }}
                    className="border p-2 mb-4 rounded"
                />

                {/* Description */}
                <ThemedText className="text-lg font-semibold">Description</ThemedText>
                <ThemedTextInput
                    value={rideData.description}
                    onChangeText={(text) => {
                        setRideData((prev) => ({ ...prev, description: text }));
                        // setHasUnsavedChanges(true);
                    }}
                    className="border p-2 mb-4 rounded"
                    multiline
                />

                {/* Date */}
                <ThemedDateTimePicker
                    label="Date"
                    mode="date"
                    value={rideData.startAt} // use start date as base
                    onChange={(date) => {
                        setRideData((prev) => ({
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
                    value={rideData.startAt}
                    onChange={(date) => {
                        setRideData((prev) => ({ ...prev, startAt: date }));
                        // setHasUnsavedChanges(true);
                    }}
                />

                {/* End Time */}
                <ThemedDateTimePicker
                    label="End Time"
                    mode="time"
                    value={rideData.endAt}
                    onChange={(date) => {
                        setRideData((prev) => ({ ...prev, endAt: date }));
                        // setHasUnsavedChanges(true);
                    }}
                />

                {/* Studio */}
                <Picker
                    selectedValue={rideData.studioId}
                    onValueChange={(itemValue) => setRideData({
                        ...rideData,
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
                    selectedValue={rideData.instructorId}
                    onValueChange={(itemValue) => setRideData({
                        ...rideData,
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

                {/* Ride Type */}
                <Picker
                    selectedValue={rideData.rideType}
                    onValueChange={(itemValue) =>
                        setRideData({
                            ...rideData,
                            rideType: itemValue as RideType,
                        })
                    }
                >
                    {rideTypes.map((type) => (
                        <Picker.Item
                            key={type.value}
                            label={type.label}
                            value={type.value}
                        />
                    ))}
                </Picker>

                {/* Buttons */}
                <View className="flex-row justify-between mt-4">
                    <Button title="Create ride" onPress={handleSave} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}