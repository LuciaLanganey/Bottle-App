import React from "react";
import { Tabs, useSegments } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Layout() {
  const segments = useSegments();
  // if screen is in the home or live stack, hide the tab bar
  const hide = segments.includes("addMoment") || segments.includes("text") || segments.includes("audio") || segments.includes("photovideo") || segments.includes("confirmation") || segments.includes("openBottle") || segments.includes("cameraScreen") || segments.includes("insertAudioMoment") || segments.includes("audioScreen") || segments.includes("audioMoment")
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#23AFBB",
        tabBarStyle: {
          display: hide ? "none" : "flex",
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
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="home" size={40} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="archive"
        options={{
          tabBarLabel: "Archive",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" size={40} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={40} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addMoment"
        options={{
          tabBarLabel: "addMoment",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={40} color={color} />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="openBottle"
        options={{
          tabBarLabel: "openBottle",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={40} color={color} />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="insertBottle"
        options={{
          tabBarLabel: "insertBottle",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={40} color={color} />
          ),
          href: null,
        }}
      />
    </Tabs>
  );
}
