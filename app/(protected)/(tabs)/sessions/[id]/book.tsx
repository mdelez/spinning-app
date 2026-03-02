import { ThemedText } from "@/components/ThemedText";
import { useGetAvailableBikesForSession } from "@/features/sessions/hooks/useSessions";
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Book() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { data: bikes } = useGetAvailableBikesForSession(id);

    const [selectedBikeId, setSelectedBikeId] = useState<string | null>(null);

    const handlePayment = () => {
        if (!selectedBikeId) return alert("Please select a bike");
        router.push(`/sessions/${id}/payment?bikeId=${selectedBikeId}`);
    };

    return (
        <SafeAreaView className="flex-1 p-4">
            <ThemedText className="mb-4">Book Session {id}</ThemedText>

            <View className="mb-6">
                <Picker
                    selectedValue={selectedBikeId}
                    onValueChange={(itemValue) => setSelectedBikeId(itemValue)}
                >
                    <Picker.Item label="Select a bike" value={null} />
                    {bikes?.map((bike) => (
                        <Picker.Item
                            key={bike.id}
                            label={`Bike ${bike.bikeNumber}`}
                            value={bike.id}
                        />
                    ))}
                </Picker>
            </View>

            <Button title="Go to Payment" onPress={handlePayment} />
        </SafeAreaView>
    );
}