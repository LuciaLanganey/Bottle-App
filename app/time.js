import React from "react";
import { Text, SafeAreaView, View, Image, ImageBackground } from "react-native";
import { AppStyles } from "../styles";
import { Icon } from 'react-native-elements'

export default function Time() {
  const styles = AppStyles();

  if (!styles) {
    return null;
  }

  return (
    <ImageBackground source={require("../assets/background.png")} opacity='0.5' style={styles.backgroundImage}>
    <SafeAreaView>
        <Text style={styles.title}>Change time</Text>
        <View style={styles.container}> 
          <View style={{alignItems: 'center'}}>
            <Image
              source={require("../assets/people/profileImage.jpg")}
              style={styles.profileImage}
            />
          </View>
        </View>
        <Text style={styles.personNameText}>Greg</Text>
    </SafeAreaView>
    </ImageBackground>
  );
}