import React from "react";
import { Text, View, Image, ImageBackground } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AppStyles } from "../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function addMoment() {
  const styles = AppStyles();
  <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          display: route.name === 'example' ? 'none' : 'flex',
        },
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="(root)" options={{ href: null, }} />
</Tabs>
  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      opacity="0.5"
      style={styles.backgroundImage}
    >
      <SafeAreaView>
        <View style={styles.headerContainer}>
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
        </View>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: '#23AFBB'
          }}
          source={require('../../assets/people/selena.jpg')}
        />
        <Text style={styles.subHeading}>Selena</Text>
        <Image
          source={require("../../assets/graphics/bottle-cropped.png")}
          style={styles.bottleImage}
        />
        <View style={styles.selectMedia}>
          <Text>Hello world</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>

  );
}
