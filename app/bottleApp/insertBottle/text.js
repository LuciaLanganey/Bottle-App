import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppStyles } from "../../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../../header";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function openBottle() {
  const [text, setText] = useState("");
  const [offlineText, setOfflineText] = useState("");
  const styles = AppStyles();
  const currentMoment = moment().format("hh:mm:ss a");
  const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

  useEffect(() => {
    loadOfflineText();
  }, []);

  const loadOfflineText = async () => {
    try {
      const savedText = await AsyncStorage.getItem('offlineText');
      if (savedText !== null) {
        setOfflineText(savedText);
        setText(savedText);
      }
    } catch (error) {
      console.error('Error loading offline text:', error);
    }
  };

  const saveText = async () => {
    try {
      await AsyncStorage.setItem('offlineText', text);
      setOfflineText(text);
      clearText();
    } catch (error) {
      console.error('Error saving text:', error);
    }
  };

  const clearText = () => {
    setText("");
  };


  const handleLoadText = () => {
    loadOfflineText();
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
          source={require("../../../assets/graphics/EmptyBottle.png")}
          resizeMode={"contain"}
          style={styles.momentBottle}
        />
        <View
          style={{ position: "absolute", alignSelf: "center", bottom: "30%" }}
        >
          <TextInput
            style={styles.textInputBox}
            multiline
            numberOfLines={4}
            placeholder="Type here"
            value={text}
            onChangeText={setText}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // borderWidth: 2,
              // borderColor: "black",
              // backgroundColor: 'white',
              borderRadius: 20,
              // padding: 10,
              width: windowWidth * 0.8,
              alignSelf: "center",
              alignItems: 'center',
            }}
          >

            <View style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 20,
              borderColor: '#D9D9D9',
              borderWidth: 1,
            }}>
              <TouchableOpacity onPress={handleLoadText}>
                <Text
                  style={{ fontSize: 16, color: "#23AFBB", font: "Inter-Bold" }}
                >
                  Load from Draft
                </Text>
              </TouchableOpacity>
            </View>



            
            <View style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 20,
              borderColor: '#D9D9D9',
              borderWidth: 1,
            }}>
              <TouchableOpacity onPress={saveText} style={{}}>
              <Text
                style={{ fontSize: 16, color: "#23AFBB", font: "Inter-Bold" }}
              >
                Save to Draft
              </Text>
            </TouchableOpacity>
            </View>
            
            <View style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 20,
              borderColor: '#D9D9D9',
              borderWidth: 1,
            }}>
            <Link
              href={{
                pathname: "/bottleApp/insertBottle/insertTextMoment",
                params: { text: text, moment: currentMoment },
              }}
            >
              <Text
                style={{ fontSize: 16, color: "#23AFBB", font: "Inter-Bold" }}
              >
                Next
              </Text>
            </Link>
            </View>
          </View>
          <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderWidth: 2,
              borderColor: "#D9D9D9",
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 10,
              margin: 10,
              // width: windowWidth * 0.8,
              alignSelf: "center",
              alignItems: 'center',
            }}>
          <Pressable onPress={clearText} style={styles.deleteMessage}>
              <Ionicons name="trash-sharp" size={25} color="#23AFBB" />
            </Pressable>
          </View>
          
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
