import { ThemedText } from "@/components/ThemedText";
import { useGetInstructor } from "@/features/user/hooks/useUsers";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Linking, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InstructorBio() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data, isLoading } = useGetInstructor(id);

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ThemedText className="text-lg">Loading...</ThemedText>
            </SafeAreaView>
        );
    }

    const openSpotify = async () => {
        const supported = await Linking.canOpenURL(data?.instructorProfile?.spotifyLink ?? "");

        if (supported) {
            await Linking.openURL(data?.instructorProfile?.spotifyLink ?? "");
        } else {
            // fallback (optional)
            await Linking.openURL("https://open.spotify.com");
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <View className="items-center mb-6">
                    {data?.instructorProfile?.image ? (
                        <Image
                            source={{ uri: data.instructorProfile.image }}
                            style={{ width: 120, height: 120, borderRadius: 60 }}
                            contentFit="cover"
                        />
                    ) : (
                        <View className="w-28 h-28 rounded-full bg-gray-300 items-center justify-center">
                            <ThemedText className="text-4xl font-bold text-gray-600">
                                {data?.firstName[0]}
                            </ThemedText>
                        </View>
                    )}
                </View>
                <ThemedText className="text-2xl font-bold mb-2">
                    {data?.firstName} {data?.lastName}
                </ThemedText>
                <ThemedText className="text-base leading-6">
                    {data?.instructorProfile?.bio ?? "No bio yet."}
                </ThemedText>
                {data?.instructorProfile?.spotifyLink && (
                    <>
                    <ThemedText>
                        Spotify Link
                    </ThemedText>
                    <Pressable onPress={openSpotify}>
                        <ThemedText style={{ color: "green", textDecorationLine: "underline" }}>
                            {data.instructorProfile.spotifyLink}
                        </ThemedText>
                    </Pressable>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
