import React from "react";
import { Tabs, useSegments } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Layout() {
  const segments = useSegments();
  // if screen is in the home or live stack, hide the tab bar
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#23AFBB",
        tabBarStyle: {
          backgroundColor: "white",
          height: 100,
          borderRadius: 35,
          overflow: "hidden",
          position: "absolute",
        },
        tabBarItemStyle: {
          margin: 5,
          borderRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        }    
      }}
    >
      <Tabs.Screen
        name="text"
        options={{
          tabBarLabel: "Text",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="home" size={40} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Audio"
        options={{
          tabBarLabel: "Archive",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" size={40} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Photo/Video"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={40} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Confirmation"
        options={{
          tabBarLabel: "Confirmation",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={40} color={color} />
          ),
          href: null,
        }}
      />
    </Tabs>
  );
}
