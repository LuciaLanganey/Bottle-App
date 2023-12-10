import React from "react";
import { Tabs, useSegments } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Dimensions } from "react-native";

export default function Layout() {
  const segments = useSegments();
  const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

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
          height: windowHeight*0.17,
          borderRadius: 35,
          overflow: "hidden",
          position: "absolute",
        },
        tabBarItemStyle: {
          flexDirection: 'column',
          margin: 20,
          width: windowWidth * 0.3,
          height: windowHeight * 0.1,
          shadowColor: '#D9D9D9',
          padding: 10,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.5,
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
