import { AuthContext } from "@/context/authContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { useContext } from "react";

export default function BottomTabsLayout() {
  const { user } = useContext(AuthContext);

  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "teal", headerShown: false }}
      backBehavior="order"
    >
      <Tabs.Screen
        name="(bookings)"
        options={{
          title: "Bookings",
          headerShown: false,
          tabBarLabel: "Bookings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="numeric-1-box-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="numeric-2-box-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="manage"
        options={{
          title: "Manage",
          href: (user?.role === 'INSTRUCTOR' || user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") ? "/manage" : null,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="numeric-3-box-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={(user?.role === 'INSTRUCTOR' || user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") ? "numeric-4-box-outline" : "numeric-3-box-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}