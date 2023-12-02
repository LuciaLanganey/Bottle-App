import React from "react";
import { Text, View, ImageBackground, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { AppStyles } from "../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";


export default function openBottle() {
  const styles = AppStyles();
  return (
    <ImageBackground
          source={require("../../assets/background.png")}
          opacity="0.5"
          style={styles.backgroundImage}
        >
          <View style={styles.container}>
            <Image
              source={require("../../assets/graphics/bottle-reverse.png")}
              style={{ marginTop: 0, paddingTop: 0}}
            />
          </View>
        <SafeAreaView style={styles.headerContainer}>
          {/* <View style={styles.backIconContainer}>
            <Link href="home" asChild>
              <Ionicons
                name="arrow-back-circle"
                size={35}
                color="#23AFBB"
                onPress={() => console.log("back button pressed")}
              />
            </Link>
          </View> */}
          <Text style={styles.timeSubheadingText}>
              Time to open
          </Text>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../assets/people/profile.jpg")}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.personNameText}>
              Grandma's 
          </Text>
          <Text style={styles.timeSubheadingText}>
              bottle
          </Text>


      </SafeAreaView>
    </ImageBackground>
    
  );
}
