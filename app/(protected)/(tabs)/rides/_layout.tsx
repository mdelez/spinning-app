import { Stack } from "expo-router";

export default function RidesLayout() {
  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ title: "Rides", animation: "none", headerBackVisible: false, gestureEnabled: false }} />
      <Stack.Screen name="[id]" options={{ title: "Ride Details" }} />
      <Stack.Screen name="[id]/book" options={{ title: "Book Ride" }} />
      <Stack.Screen name="[id]/payment" options={{ title: "Payment" }} />
      <Stack.Screen name="[id]/[confirmation]/index" options={{ title: "Confirmation", gestureEnabled: false, headerShown: false }} />
    </Stack>
  );
}