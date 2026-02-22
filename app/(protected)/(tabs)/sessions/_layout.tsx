import { Stack } from "expo-router";

export default function SessionsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Sessions", animation: "none", headerBackVisible: false, gestureEnabled: false }} />
      <Stack.Screen name="[id]" options={{ title: "Session Details" }} />
      <Stack.Screen name="[id]/book" options={{ title: "Book Session" }} />
      <Stack.Screen name="[id]/payment" options={{ title: "Payment" }} />
      <Stack.Screen name="[id]/[confirmation]/index" options={{ title: "Confirmation", gestureEnabled: false, headerShown: false }} />
    </Stack>
  );
}