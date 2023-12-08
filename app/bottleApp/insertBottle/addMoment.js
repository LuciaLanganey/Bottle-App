import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, Image, ImageBackground } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AppStyles } from "../../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../header';


export default function addMoment() {
  const styles = AppStyles();

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      opacity="0.5"
      style={styles.backgroundImage}
    >
      <SafeAreaView style={{flex: 1}}>
        <Header/>
        {/* <View style={styles.headerContainer}>
          <View style={styles.backIconContainer}>
            <Link href={{ pathname: 'bottleApp/home' }} style={{ marginRight: 8 }}>
              <Ionicons
                name="arrow-back-circle"
                size={35}
                color="#23AFBB"
              />
            </Link>
            <Text style={styles.myBottleSubheading}>My Bottle</Text>
          </View>
        </View> */}
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: 'center',
            borderColor: '#23AFBB'
          }}
          source={require('../../../assets/people/grandma.jpeg')}
        />
        <Text style={styles.subHeading}>Grandma</Text>
        <Image
          source={require("../../../assets/graphics/bottle-cropped.png")}
          style={styles.bottleImage}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
