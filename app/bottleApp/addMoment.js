import React from "react";
import { Text, View, Image, ImageBackground } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AppStyles } from "../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



export default function addMoment() {
  const styles = AppStyles();
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
          <Text style={styles.subHeading}>Add Moment</Text>
          <Link to href="text.js" style={styles.mediaButton}>
            <MaterialCommunityIcons name="pencil" size={24} color="black" />
            <Text>Text</Text>
          </Link>
          <Link to href="photoVideo.js" style={styles.mediaButton}>
            <Ionicons name="camera" size={24} color="black" />
            <Text>Photo/Video</Text>
          </Link>
          <Link to href="audio.js" style={styles.mediaButton}>
            <FontAwesome name="microphone" size={24} color="black" />
            <Text>Voice</Text>
          </Link>
        </View>
      </SafeAreaView>
    </ImageBackground>

  );
}
