import React, { useState, } from "react";
import { Text, View, ImageBackground, Image, Pressable, Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AppStyles } from "../../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Camera, CameraType } from 'expo-camera';

export default function openBottle() {
    const styles = AppStyles();
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
    return (
        <ImageBackground
            source={require("../../../assets/background.png")}
            opacity="0.5"
            style={styles.backgroundImage}
        >
        <SafeAreaView>
        <View style={styles.headerContainer}>
          <View style={styles.backIconContainer}>
            <Link href={{ pathname: 'bottleApp/insertBottle/addMoment' }} style={{ marginRight: 8 }}>
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
          source={require('../../../assets/graphics/EmptyBottle.png')} resizeMode={'contain'} style={styles.momentBottle}
        />
        </SafeAreaView>
        </ImageBackground>
    );
}