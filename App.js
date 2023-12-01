import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import Supabase from "../utils/Supabase";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from "./app/LoginScreen.js";
import ProfileScreen from "./app/profile.js";
import SignupScreen from "./app/signup.js";
import HomeScreen from "./app/addMoment.js";
import Archive from "./app/archive.js";
import BuildProfile from "./app/BuildProfile.js"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [authSession, setAuthSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      // get session
      const { data, error } = await Supabase.auth.getSession();

      if (error) {
        console.log("error getting Supabase session");
      } else if (data) {
        setAuthSession(data.session);
      }
    }

    fetchSession();

    // listen to onAuthStateChange and update authSession
    Supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
      setAuthSession(session);
    })
  }, []);


  return (
    <NavigationContainer independent>
      {authSession ?
        <Stack.Navigator initialRouteName="MainTab" screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="MainTab" component={HomeScreen} />
          <Stack.Screen name="YourProfile" component={ProfileScreen} />
          <Stack.Screen name="YourArchive" component={Archive} />
        </Stack.Navigator>
        :
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BuildProfile" component={BuildProfile} options={{ headerShown: false }} />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}

function MainTab() {
  return <Tab.Navigator tabBarOptions={{ showLabel: false }}>
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
  </Tab.Navigator>
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 32,
  },
});

