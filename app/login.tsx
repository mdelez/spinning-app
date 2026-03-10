import { authClient } from "@/auth/auth.config";
import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Pressable, View } from "react-native";

export default function LoginScreen() {
    const router = useRouter();
    const { isLoggedIn } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await authClient.signIn.email(
                {
                    email,
                    password,
                },
                {
                    onRequest: () => setLoading(true),
                    onSuccess: () => {
                        setLoading(false);
                        router.replace("/"); // AuthProvider will detect session automatically
                    },
                    onError: (ctx) => {
                        setLoading(false);
                        Alert.alert("Login failed", ctx.error?.message || "Unknown error");
                    },
                }
            );
        } catch (err) {
            setLoading(false);
            console.error("Unexpected login error:", err);
            Alert.alert("Login failed", "Unexpected error occurred");
        }
    };

    // Already logged in? Redirect automatically
    if (isLoggedIn) {
        router.replace("/");
        return null;
    }

    return (
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
                className="border border-gray-300 rounded-md px-4 py-3 mb-6"
            />

            <View className="flex-1">
                <Pressable
                    onPress={handleLogin}
                    disabled={loading}
                    className={`bg-blue-600 py-3 rounded-md ${loading ? "opacity-50" : "opacity-100"}`}
                >
                    <ThemedText className="text-white text-center text-lg font-semibold">
                        {loading ? "Logging in..." : "Log In"}
                    </ThemedText>
                </Pressable>
                <Pressable
                    onPress={() => router.push("/signup")}
                    disabled={loading}
                    className={`bg-blue-600 py-3 rounded-md ${loading ? "opacity-50" : "opacity-100"}`}
                >
                    <ThemedText className="text-white text-center text-lg font-semibold">
                        Sign Up
                    </ThemedText>
                </Pressable>
            </View>

        </View>
    );
}