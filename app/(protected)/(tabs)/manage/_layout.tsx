import { Stack } from "expo-router";

export default function ManageLayout() {
    return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ title: "Manage", animation: "none", headerBackVisible: false, gestureEnabled: false }} />
      <Stack.Screen name="[id]" options={{ title: "Manage sessions" }} />
    </Stack>
  );
}