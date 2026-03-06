import { Stack } from "expo-router";

export default function ManageLayout() {
    return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ title: "Manage", animation: "none", headerBackVisible: false, gestureEnabled: false }} />
      <Stack.Screen name="[id]/checkIn" options={{ title: "Check In" }} />
      <Stack.Screen name="[id]/edit" options={{ title: "Edit Session "}} />
      <Stack.Screen name="create" options={{ title: "Create session" }} />
    </Stack>
  );
}