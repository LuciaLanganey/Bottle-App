import React from "react";
import { Text, View, ImageBackground, Image, Pressable, Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AppStyles } from "../../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function openBottle() {
    const styles = AppStyles();
    return (
        <ImageBackground
            source={require("../../../assets/background.png")}
            opacity="0.5"
            style={styles.backgroundImage}
        >
        <Text>Saved to My Bottle</Text>
        <Image source={require('../../../assets/graphics/MediumFilledBottle.png')}></Image>
        </ImageBackground>
    );
}