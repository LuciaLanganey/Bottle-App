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
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppStyles } from "../../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Header from '../../header';


export default function openBottle() {
  const styles = AppStyles();

  //Image picker Code
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

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      opacity="0.5"
      style={styles.backgroundImage}
    >
      <SafeAreaView style={{flex:1}}>
        <Header />
        <Image
          source={require('../../../assets/graphics/EmptyBottle.png')} resizeMode={'contain'} style={styles.momentBottle}
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
            alignSelf: 'center',
            borderRadius: 20,
            padding: 10,
            marginTop: '80%',
          }}
        >
          <Pressable onPress={pickImage}>
            <View style={{ flexDirection: "row", margin: 5}}>
              <Feather
                name="upload"
                size={20}
                color="#23AFBB"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.text}>Upload</Text>
              {/* {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />r
              )} */}
            </View>
          </Pressable>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#D9D9D9",
              marginVertical: 10,
            }}
          ></View>
          <Link
            href={{ pathname: "bottleApp/insertBottle/cameraScreen" }}>
            <View style={{ flexDirection: "row", margin: 5 }}>
              <Ionicons
                name="camera"
                size={20}
                color="#23AFBB"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.text}>Take photo/video</Text>
            </View>
          </Link>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
