import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
    const router = useRouter();
    const { isLoading, logIn } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-center px-6">
                <ThemedText className="text-3xl font-bold text-center mb-6">Log In</ThemedText>

                <ThemedTextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    className="border border-gray-300 rounded-md px-4 py-3 mb-4"
                />

                <ThemedTextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    className="border border-gray-300 rounded-md px-4 py-3 mb-4"
                />

                <View className="flex-1 gap-4">
                    <Pressable
                        onPress={() => logIn(email, password)}
                        disabled={isLoading}
                        className={`bg-blue-600 py-3 rounded-md ${isLoading ? "opacity-50" : "opacity-100"}`}
                    >
                        <ThemedText className="text-white text-center text-lg font-semibold">
                            {isLoading ? "Logging in..." : "Log In"}
                        </ThemedText>
                    </Pressable>
                    <Pressable
                        onPress={() => router.push("/signup")}
                        disabled={isLoading}
                        className={`bg-blue-600 py-3 rounded-md ${isLoading ? "opacity-50" : "opacity-100"}`}
                    >
                        <ThemedText className="text-white text-center text-lg font-semibold">
                            Sign Up
                        </ThemedText>
                    </Pressable>
                </View>

            </View>
        </SafeAreaView>
    );
}