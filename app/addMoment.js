import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Icon } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons'; 
import { AppStyles } from "../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function addMoment() {
  const styles = AppStyles();
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      opacity="0.5"
      style={styles.backgroundImage}
    >
        <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.backIconContainer}>
            <Link href="home" asChild>
              <Ionicons
                name="arrow-back-circle"
                size={35}
                color="#23AFBB"
                onPress={() => console.log("back button pressed")}
              />
            </Link>
          </View>
          <Text style={styles.subHeading}>Add Moment</Text>
          {/* Add an empty View or any other components to center the header */}
          <View style={{ flex: 1 }} />
        </View>
        {/* The rest of your component content */}
      </SafeAreaView>
    </ImageBackground>
    
  );
}
