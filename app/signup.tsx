import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
    const { isLoading, signUp } = useContext(AuthContext);
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 px-6">
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
                    className="border border-gray-300 rounded-md px-4 py-3 mb-4"
                />

                <View className="flex-1 gap-4">
                    <Pressable
                        onPress={() => signUp(name, email, password, passwordConfirm)}
                        disabled={isLoading}
                        className={`bg-blue-600 py-3 rounded-md ${isLoading ? 'opacity-50' : 'opacity-100'}`}
                    >
                        <ThemedText className="text-white text-center text-lg font-semibold">
                            {isLoading ? "Signing up..." : "Sign Up"}
                        </ThemedText>
                    </Pressable>
                    <Pressable
                        onPress={() => router.back()}
                        disabled={isLoading}
                        className={`bg-blue-600 py-3 rounded-md ${isLoading ? 'opacity-50' : 'opacity-100'}`}
                    >
                        <ThemedText className="text-white text-center text-lg font-semibold">
                            Cancel
                        </ThemedText>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}