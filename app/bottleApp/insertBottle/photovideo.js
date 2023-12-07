import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
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
import moment from "moment";

export default function openBottle() {
  const styles = AppStyles();
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
      <SafeAreaView>
        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View> */}
        <View style={styles.headerContainer}>
          <View style={styles.backIconContainer}>
            <Link
              href={{ pathname: "bottleApp/insertBottle/addMoment" }}
              style={{ marginRight: 8 }}
            >
              <Ionicons name="arrow-back-circle" size={35} color="#23AFBB" />
            </Link>
            <Text style={styles.subHeading}>My Bottle</Text>
          </View>
        </View>
        <Image
          source={require("../../../assets/graphics/EmptyBottle.png")}
          resizeMode={"contain"}
          style={styles.momentBottle}
        />

        <View
          style={{
            borderWidth: 2,
            borderColor: "#D9D9D9",
            position: "absolute",
            width: 200,
            maxHeight: 105,
            marginHorizontal: 100,
            marginVertical: 300,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 10,
          }}
        >
          <Pressable onPress={pickImage}>
            <View style={{ flexDirection: "row", margin: 5 }}>
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
              marginVertical: 10,
            }}
          ></View>
          <Link href={{ pathname: "bottleApp/insertBottle/cameraScreen" }}>
            <View style={{ flexDirection: "row", margin: 5 }}>
              <Ionicons name="camera" size={20} color="#23AFBB" style={{}} />
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
                  width: 350,
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

                  <View style={styles.button}>
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
