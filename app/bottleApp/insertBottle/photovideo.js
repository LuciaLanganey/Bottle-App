import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  Dimensions,
  Modal,
  TextInput,
  Button,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { AppStyles } from "../../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Header from '../../header';

import moment from "moment";

export default function photovideo() {
  const styles = AppStyles();
  const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

  var currentMoment = moment().format("hh:mm:ss a");

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    setImage(result.assets[0]);

    if (!result.canceled) {
      s;
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      opacity="0.5"
      style={styles.backgroundImage}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
        <Link
            href={{ pathname: "bottleApp/insertBottle/home" }}
            style={styles.backIconContainer}
          >
            <Ionicons name="arrow-back-circle" size={35} color="#23AFBB" />
          </Link>
        </View>
        <Image
          source={require('../../../assets/graphics/EmptyBottle.png')} resizeMode={'contain'} style={styles.momentBottle}
        />

        <View
          style={{
            borderWidth: 2,
            borderColor: "#D9D9D9",
            position: "absolute",
            width: windowWidth * 0.5,
            height: windowHeight * 0.1,
            marginHorizontal: 100,
            marginVertical: 300,
            backgroundColor: "white",
            alignSelf: 'center',
            borderRadius: 20,
            padding: 10,
            flexDirection: 'column',
            justifyContent: 'space-evenly'
            // marginTop: '80%',
          }}
        >
          <Pressable onPress={pickImage}>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name="upload"
                size={20}
                color="#23AFBB"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.text}>Upload</Text>
            </View>
          </Pressable>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#D9D9D9",
              margin: 10,
            }}
          ></View>
          <Link
            href={{ pathname: "bottleApp/insertBottle/cameraScreen" }}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="camera" size={20} color="#23AFBB" style={{marginRight: 5, marginBottom: 5 }} />
              <Text style={styles.text}>Take photo/video</Text>
            </View>
          </Link>
          {image && (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 20,
                  borderColor: "gray",
                  width: windowWidth * 0.7,
                  height: 350,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}
              >
                <Image
                  source={{ uri: image.uri }}
                  style={{
                    width: 200,
                    height: 200,
                    alignSelf: "center",
                    padding: 20,
                  }}
                />
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                  <View style={styles.button}>
                    <Link
                      href={{
                        pathname: "bottleApp/insertBottle/insertphotovideo",
                        params: { photo: image.uri, moment: currentMoment },
                      }}
                    >
                      <Text style={styles.buttonText}>Use</Text>
                    </Link>
                  </View>

                  <View style={[styles.button, {margin: 10}]}>
                    <Pressable
                      onPress={() => {
                        setImage(undefined);
                        console.log(
                          "photo discarded, photo and video set to undefined"
                        );
                      }}
                    >
                      <Text style={styles.buttonText}>Discard</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
