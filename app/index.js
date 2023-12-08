import React from "react";
import { useState } from "react";
import Supabase from "../utils/Supabase.js";
import { View, Text, SafeAreaView, Pressable, Image, ImageBackground } from "react-native";
import { AppStyles } from "../utils/styles.js";
import { Link } from "expo-router";

// import { LogBox } from 'react-native';

// // Ignore specific warnings
// LogBox.ignoreLogs(['Warning: ...']);

// // Ignore all logs
// LogBox.ignoreAllLogs();


export default function SignUp() {
  const styles = AppStyles();

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      opacity="0.5"
      style={styles.backgroundImage}
    >
      <SafeAreaView style={{ alignItems: 'center' }}>
        <Image
          source={require("../assets/FilledBottle.png")}
          style={{ resizeMode: "contain", height: 400 }}
        />
        <Text style={styles.loginTitle}>Bottle</Text>
        <Text style={styles.loginSubtitle}>Uncap your day with others</Text>
        
        <View style={styles.button}>
          <Link href={{ pathname: 'bottleApp/home' }}>
            <Text style={styles.textStyle}>Log in</Text>
          </Link>
        </View>
        <View style={styles.button}>
          <Link href={{ pathname: 'bottleApp/home' }}>
            <Text style={styles.textStyle}>Sign in</Text>
          </Link>
        </View>
          
      </SafeAreaView>
    </ImageBackground>
  );
}
