import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { AuthContext } from "@/context/AuthContext";
import { useAddRideTokens, useGetRideTokensBalance } from "@/features/ride-tokens/hooks/use-ride-tokens";
import { useUpdateUser } from "@/features/user/hooks/use-users";
import { unitsToTokens } from "@/lib/ride-tokens";
import { useTheme } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
    const { colors } = useTheme();
    const authContext = useContext(AuthContext);
    const isInstructor = authContext.user?.role === "INSTRUCTOR";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [shoeSize, setShoeSize] = useState("");
    const [bio, setBio] = useState("");
    const [spotifyLink, setSpotifyLink] = useState("");

    const { mutate: updateUser, isPending } = useUpdateUser();
    const { data: rideTokensBalance } = useGetRideTokensBalance();
    const { mutate: addRideTokens } = useAddRideTokens();

    useEffect(() => {
        setFirstName(authContext.user?.firstName ?? "");
        setLastName(authContext.user?.lastName ?? "");
        setShoeSize(String(authContext.user?.shoeSize ?? ""));
        setBio(authContext.user?.instructorProfile?.bio ?? "");
        setSpotifyLink(authContext.user?.instructorProfile?.spotifyLink ?? "");
    }, [authContext.user, authContext.user?.instructorProfile]);

    function logOut() {
        authContext.logOut();
    }

    function handleSave() {
        Keyboard.dismiss();
        updateUser(
            {
                firstName,
                lastName,
                shoeSize: Number(shoeSize),
                ...(isInstructor && { bio, spotifyLink }),
            },
            {
                onSuccess: () => Alert.alert("Saved", "Your profile has been updated."),
                onError: () => Alert.alert("Error", "Failed to update profile."),
            }
        );
    }

    function handleAddTokens() {
        addRideTokens(
            {
                amountUnits: 100
            },
            {
                onSuccess: () => Alert.alert("Success", "Tokens have been added to your account!"),
                onError: () => Alert.alert("Error", "Token purchase failed."),
            }
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className="flex-1 p-4" style={{ backgroundColor: colors.background }}>
                <ThemedText className="text-2xl font-bold mb-6">Account</ThemedText>
                <View className="flex-row justify-between">
                    <ThemedText className="text-2xl font-bold mb-6">Ride tokens: {rideTokensBalance != null ? unitsToTokens(rideTokensBalance.balance) : "—"}</ThemedText>
                    <Button title="Add tokens" onPress={handleAddTokens}/>
                </View>

                <View className="mb-6 gap-3">
                    <View>
                        <ThemedText className="text-base font-semibold mb-1">First name</ThemedText>
                        <ThemedTextInput value={firstName} onChangeText={setFirstName} placeholder="First name" />
                    </View>
                    <View>
                        <ThemedText className="text-base font-semibold mb-1">Last name</ThemedText>
                        <ThemedTextInput value={lastName} onChangeText={setLastName} placeholder="Last name" />
                    </View>
                    <View>
                        <ThemedText className="text-base font-semibold mb-1">Shoe size</ThemedText>
                        <ThemedTextInput
                            value={shoeSize}
                            onChangeText={setShoeSize}
                            placeholder="Shoe size"
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                {isInstructor && (
                    <View className="mb-6 gap-3">
                        <ThemedText className="text-lg font-bold">Instructor profile</ThemedText>
                        <View>
                            <ThemedText className="text-base font-semibold mb-1">Bio</ThemedText>
                            <ThemedTextInput
                                value={bio}
                                onChangeText={setBio}
                                placeholder="Write a short bio..."
                                multiline
                                numberOfLines={4}
                                style={{ minHeight: 100, textAlignVertical: "top" }}
                            />
                        </View>
                        <View>
                            <ThemedText className="text-base font-semibold mb-1">Spotify link</ThemedText>
                            <ThemedTextInput
                                value={spotifyLink}
                                onChangeText={setSpotifyLink}
                                placeholder="https://open.spotify.com/..."
                                autoCapitalize="none"
                            />
                        </View>
                    </View>
                )}

                <Button title={isPending ? "Saving..." : "Save"} onPress={handleSave} disabled={isPending} />
                <View className="mt-3">
                    <Button title="Log out" onPress={logOut} />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
