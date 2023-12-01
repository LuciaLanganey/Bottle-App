import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: 100,
          borderRadius: 35,
          overflow: "hidden",
          position: 'absolute',
        },
        tabBarItemStyle:{
          margin: 5,
          borderRadius: 10,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="home" size={40} color="#23AFBB" />
          ),
        }}
      />
      <Tabs.Screen
        name="archive"
        options={{
          tabBarLabel: "Archive",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" size={40} color="#23AFBB" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={40} color="#23AFBB" />
          ),
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          tabBarLabel: "signup",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="addMoment"
        options={{
          tabBarLabel: "addMoment",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          href: null,
        }}
      />
    </Tabs>
  );
}