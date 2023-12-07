import React from "react";
import { Tabs, useSegments } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AppStyles } from "../../../utils/styles";


export default function Layout() {
  const styles = AppStyles();
  const segments = useSegments();
  // if screen is in the home or live stack, hide the tab bar
  const hide = segments.includes("confirmation") || segments.includes("insertTextMoment") || segments.includes("cameraScreen") || segments.includes("insertphotovideo")
  
  // if screen is in the home or live stack, hide the tab bar
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: hide ? "none" : "flex",
          backgroundColor: "white",
          height: 200,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          overflow: "hidden",
          position: "absolute",
          alignItems: 'center',
        },
        tabBarItemStyle: {
          backgroundColor: 'white',
          margin: 20,
          marginTop: 30,
          width: 50,
          height: 100,
          borderWidth: 2,
          borderColor: '#D9D9D9',
          borderRadius: 20,
          shadowColor: '#D9D9D9',
          padding: 8,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.5,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          color: "#23AFBB",
        }
      }}
    >
      <Tabs.Screen
        name="addMoment"
        options={{
          tabBarLabel: "text",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="" size={40} color={color} />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="text"
        options={{
          tabBarLabel: "text",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pencil" size={40} color="#23AFBB" />),
        }}
      />
      <Tabs.Screen
        name="photovideo"
        options={{
          tabBarLabel: "camera",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="camera" size={40} color="#23AFBB" />
          ),
        }}
      />
      <Tabs.Screen
        name="audio"
        options={{
          tabBarLabel: "audio",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="microphone" size={30} color="#23AFBB" />
          ),
        }}
      />
      <Tabs.Screen
        name="confirmation"
        options={{
          tabBarLabel: "Confirmation",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={40} color={color} />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="insertTextMoment"
        options={{
          tabBarLabel: "insertTextMoment",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={40} color={color} />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="cameraScreen"
        options={{
          tabBarLabel: "cameraScreen",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={40} color={color} />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="insertphotovideo"
        options={{
          tabBarLabel: "insertphotovideo",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={40} color={color} />
          ),
          href: null,
        }}
      />
    </Tabs>
  );
}
