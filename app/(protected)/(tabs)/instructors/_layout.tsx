import { Stack } from "expo-router";

export default function InstructorsLayout() {
    return (
        <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ title: "Instructor Bio" }} />
        </Stack>
    );
}
