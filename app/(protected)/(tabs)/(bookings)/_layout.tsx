import { Stack } from "expo-router";

export default function BookingsLayout() {
  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ title: "My Bookings", animation: "none", headerBackVisible: false, gestureEnabled: false }} />
      <Stack.Screen name="[bookingId]" options={{ title: "Manage booking" }} />
    </Stack>
  );
}