import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { AuthContext } from "@/context/authContext";
import { useUpdateInstructorBio } from "@/features/user/hooks/useUsers";
import { useTheme } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Alert, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
    const { colors } = useTheme();
    const authContext = useContext(AuthContext);
    const queryClient = useQueryClient();
    const isInstructor = authContext.user?.role === "INSTRUCTOR";

    const [bio, setBio] = useState("");
    const { mutate: updateBio, isPending } = useUpdateInstructorBio();

    function logOut() {
        authContext.logOut();
        queryClient.clear();
    }

    function handleSaveBio() {
        updateBio(bio, {
            onSuccess: () => Alert.alert("Saved", "Your bio has been updated."),
            onError: () => Alert.alert("Error", "Failed to update bio."),
        });
    }

    return (
        <SafeAreaView className="flex-1 p-4" style={{ backgroundColor: colors.background }}>
            <ThemedText className="text-2xl font-bold mb-6">Account</ThemedText>

            {isInstructor && (
                <View className="mb-6">
                    <ThemedText className="text-base font-semibold mb-2">Your bio</ThemedText>
                    <ThemedTextInput
                        value={bio}
                        onChangeText={setBio}
                        placeholder="Write a short bio..."
                        multiline
                        numberOfLines={4}
                        style={{ minHeight: 100, textAlignVertical: "top" }}
                    />
                    <Button title={isPending ? "Saving..." : "Save bio"} onPress={handleSaveBio} disabled={isPending} />
                </View>
            )}

            <Button title="Log out" onPress={logOut} />
        </SafeAreaView>
    );
}
