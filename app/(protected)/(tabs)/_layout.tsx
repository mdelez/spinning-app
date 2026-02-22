import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import React from "react";

export default function BottomTabsLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "teal" }}
      backBehavior="order"
    >
      <Tabs.Screen
        name="index"
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
        name="sessions"
        options={{
          title: "Sessions",
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
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="numeric-3-box-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}