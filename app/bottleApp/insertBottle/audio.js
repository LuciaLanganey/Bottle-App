import React, { useState } from "react";
import {
  Alert,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  Pressable,
  Modal,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppStyles } from "../../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

// const ImageDisappearComponent = () => {
//      const [imageVisible, setImageVisible] = useState(true);
//    }
//    const handlePress = () => {
//      setImageVisible(false);
//    };

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function audio() {
  const styles = AppStyles();

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      opacity="0.5"
      style={styles.backgroundImage}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Link
            href={{ pathname: "bottleApp/insertBottle/addMoment" }}
            style={styles.backIconContainer}
          >
            <Ionicons name="arrow-back-circle" size={35} color="#23AFBB" />
          </Link>
        </View>

        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../../assets/graphics/EmptyBottle.png")}
            resizeMode={"contain"}
            style={{ height: "82.5%" }}
          />
          <Link style={audiostyles.recordPressable} href={{ pathname: "bottleApp/insertBottle/insertAudioMoments" }}>
            <View
              style={{
                borderRadius: 20,
                borderWidth: 2,
                backgroundColor: "#23AFBB",
                width: 100,
                borderColor: "white",
                height: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="microphone" size={60} color="white" />
            </View>
          </Link>
        
        <Text style={audiostyles.textStyle}>Press Hold To Record</Text>

        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const audiostyles = StyleSheet.create({
  recordPressable: {
    position: "absolute",
    top: "25%", // adjust this value to position inside the bottle
    //left: "50%",
    // transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#23AFBB",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "#186174",
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    top: "42%", // adjust this value to place the text below the button
    width: 200,
    fontSize: 21,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  popupAudioBox: {
    position: "absolute",
    alignSelf: "center",
    borderRadius: 20,
    bottom: "60%",
    // borderColor: "red",
    // borderWidth: 3,
  },
  deleteMessage: {
    // position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 10,
  },
  audioBox: {
    borderRadius: 20,
    borderColor: "#23AFBB",
    backgroundColor: "#23AFBB",
    width: windowWidth * 0.8,
    height: windowHeight * 0.17,
    margin: 12,
    borderWidth: 1,
    padding: 20,
    paddingTop: 20,
    color: "white",
    fontSize: 20,
    // font: "Inter-Regular",
  },
  audioFile: {
    resizeMode: "contain",
    alignItems: "center",
    maxHeight: 100,
    maxWidth: 300,
  },
  audioContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "80%",
    resizeMode: "contain",
  },
  record: {
    position: "absolute",
    borderRadius: 15,
    borderColor: "#23AFBB",
    borderWidth: 10,
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  recordBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: windowHeight * 0.3,
    position: "absolute",
  },
});
