import React from "react";
import { Text, View, ImageBackground } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { AppStyles } from "../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function addMoment() {
  const styles = AppStyles();
  return (
    <ImageBackground
          source={require("../../assets/background.png")}
          opacity="0.5"
          style={styles.backgroundImage}
        >
        <SafeAreaView style={styles.headerContainer}>
          <View style={styles.backIconContainer}>
            <Link href={{ pathname: 'bottleApp/home' }} style={{ marginRight: 8 }}>
              <Ionicons
                name="arrow-back-circle"
                size={35}
                color="#23AFBB"
              />
            </Link>
            <Text style={styles.subHeading}>My Bottle</Text>

          </View>
        {/* <View style={styles.titleContainer}>
          <Text style={styles.subHeading}>My Bottle</Text>
        </View> */}


      </SafeAreaView>
    </ImageBackground>
    
  );
}
