import { authClient } from "@/auth/auth.config";
import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, View } from "react-native";

export default function SignUp() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (password !== passwordConfirm) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            await authClient.signUp.email(
                {
                    email,
                    password,
                    name,
                    callbackURL: "spinningapp://auth/callback",
                },
                {
                    onRequest: () => setLoading(true),
                    onSuccess: () => {
                        setLoading(false);
                        router.replace("/"); // redirect after signup
                    },
                    onError: (ctx) => {
                        setLoading(false);
                        Alert.alert("Sign up failed", ctx.error?.message || "Unknown error");
                    },
                }
            );
        } catch (err) {
            setLoading(false);
            console.error("Unexpected sign up error", err);
            Alert.alert("Sign up failed", "Unexpected error occurred");
        }
    };

    return (
        <View className="flex-1 justify-center px-6">
            <ThemedText className="text-3xl font-bold text-center mb-6">Create Account</ThemedText>

            <ThemedTextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                className="border border-gray-300 rounded-md px-4 py-3 mb-4"
            />

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

            <ThemedTextInput
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry
                className="border border-gray-300 rounded-md px-4 py-3 mb-6"
            />

            <Pressable
                onPress={handleSignUp}
                disabled={loading}
                className={`bg-blue-600 py-3 rounded-md ${loading ? 'opacity-50' : 'opacity-100'}`}
            >
                <ThemedText className="text-white text-center text-lg font-semibold">
                    {loading ? "Signing up..." : "Sign Up"}
                </ThemedText>
            </Pressable>
        </View>
    );
}