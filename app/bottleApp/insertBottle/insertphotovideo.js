import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  Pressable,
  Icon,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import { Video } from "expo-av";
import { AppStyles } from "../../../utils/styles";
import { TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../../header';
import moment from "moment";


export default function PreviewScreen() {
  const styles = AppStyles();
  const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

  const [isHappySelected, setHappySelected] = useState(false);
  const [isSadSelected, setSadSelected] = useState(false);
  const [isAngrySelected, setAngrySelected] = useState(false);
  const [isNeutralSelected, setNeutralSelected] = useState(false);

  const params = useLocalSearchParams();
  const { photo, video, moment } = params;
  console.log("photo uri: ", photo);
  console.log("video uri: ", video);

  const handleEmojiSelect = (emoji) => {
    setHappySelected(emoji === 'happy');
    setSadSelected(emoji === 'sad');
    setAngrySelected(emoji === 'angry');
    setNeutralSelected(emoji === 'neutral');
  };

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      opacity="0.5"
      style={styles.backgroundImage}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Link href={{ pathname: 'bottleApp/insertBottle/photovideo' }} style={styles.backIconContainer}>
            <Ionicons
              name="arrow-back-circle"
              size={35}
              color="#23AFBB"
            />
          </Link>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={{
            borderRadius: 20,
            // borderColor: theme.borderOutlineColor,
            backgroundColor: 'white',
            borderColor: 'white',
            // width: windowWidth * 0.8,
            // height: windowHeight * 0.25,
            margin: 12,
            borderWidth: 1,
            padding: 20,
            // paddingTop: 30,
            width: windowWidth * 0.8,
            height: windowHeight*0.35,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            // color: 'white',
            // fontSize: 20,
            // font: "Inter-Regular"

          }}>
            {video ? (
              <Video
                style={{ width: windowWidth * 0.8, height:  windowHeight*0.3 }}
                source={{ uri: video }}
                useNativeControls
                resizeMode="contain"
                isLooping
              />
            ) : (
              <Image
                source={{ uri: photo }}
                style={{ width: 250, height: 200 }}
              // resizeMode="contain"
              />
            )}
            <TextInput style={{ alignSelf: 'left', width: 265, margin: 5, }} multiline numberOfLines={1} placeholder="Caption here" />
            <Text style={{ alignSelf: 'left', width: 265, marginHorizontal: 5, marginBottom: 5, color: "#186174" }}>Today at {moment}</Text>
          </View>

          <View style={styles.filterView}>
            {/* Filter by emotion bar */}
            <Text style={styles.tinyText}>Select an emotion:</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center' }}>
              <Pressable
                onPress={() => {
                  handleEmojiSelect('happy');
                }}
              >
                <MaterialCommunityIcons name="emoticon" size={45} color={isHappySelected ? "#186174" : "#23AFBB"} />
              </Pressable>
              <Pressable
                onPress={() => handleEmojiSelect('sad')
                }
              >
                <MaterialCommunityIcons name="emoticon-sad" size={45} color={isSadSelected ? "#186174" : "#23AFBB"} />
              </Pressable>
              <Pressable
                onPress={() => handleEmojiSelect('angry')
                }
              >
                <MaterialCommunityIcons name="emoticon-angry" size={45} color={isAngrySelected ? "#186174" : "#23AFBB"} />
              </Pressable>
              <Pressable
                onPress={() => handleEmojiSelect('neutral')
                }
              >
                <MaterialCommunityIcons name="emoticon-neutral" size={45} color={isNeutralSelected ? "#186174" : "#23AFBB"} />
              </Pressable>
            </View>
          </View>


          <View style={styles.button}>
            <Link
              href={{
                pathname: "bottleApp/insertBottle/confirmation",
                params: { photo: undefined, video: undefined, image: undefined },
              }}
            >
              <Text style={styles.buttonText}>Insert</Text>
            </Link>
          </View>
          <Image style={{ height: windowHeight*0.3, aspectRatio: 1, }} source={require("../../../assets/graphics/bottle-cropped.png")} resizeMode="contain" />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles2 = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  video: {
    // flex: 1,
    // alignSelf: "stretch",
  },
  preview: {
    // alignSelf: "stretch",
    // flex: 1,
  },
});
