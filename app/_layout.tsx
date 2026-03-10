import { AuthProvider } from '@/context/authContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const queryClient = new QueryClient();
    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <SafeAreaProvider>
                        <StatusBar style="auto" />
                        <Stack>
                            <Stack.Screen
                                name="(protected)"
                                options={{
                                    headerShown: false,
                                    animation: "none"
                                }} />
                            <Stack.Screen
                                name="login"
                                options={{
                                    animation: "none"
                                }}
                            />
                            <Stack.Screen
                                name="signup"
                            />
                        </Stack>
                    </SafeAreaProvider>
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}