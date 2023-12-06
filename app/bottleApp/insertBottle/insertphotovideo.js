import React from "react";
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


export default function PreviewScreen() {
  const styles = AppStyles();

  const params = useLocalSearchParams();
  const { photo, video, moment } = params;
  console.log("photo uri: ", photo);
  console.log("video uri: ", video);

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      opacity="0.5"
      style={styles.backgroundImage}
    >
      <SafeAreaView style={{ alignItems: 'center' }}>
        {/* header */}
        <View style={styles.headerContainer}>
          <View style={styles.backIconContainer}>
            <Link
              href={{ pathname: "bottleApp/cameraScreen" }}
              style={{ marginRight: 8 }}
            >
              <Ionicons name="arrow-back-circle" size={35} color="#23AFBB" />
            </Link>
            <Text style={styles.subHeading}>My Bottle</Text>
          </View>
        </View>

        <View style={{ borderRadius: 20,
          // borderColor: theme.borderOutlineColor,
          backgroundColor: 'white',
          borderOutlineColor: 'gray',
          // width: windowWidth * 0.8,
          // height: windowHeight * 0.25,
          margin: 12,
          borderWidth: 1,
          padding: 20,
          paddingTop: 20,
          width: 320,
          height: 280,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          // color: 'white',
          // fontSize: 20,
          // font: "Inter-Regular"
          
          }}>
            {video ? (
              <Video
                style={{ width: 250, height: 200 }}
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
            <TextInput style={{}} multiline numberOfLines={2} placeholder="Caption here"/>
            <Text style={styles.timeSentText}>Today at {moment}</Text>
        </View>

        <View style={styles.filterView}>
                    {/* Filter by emotion bar */}
                    <Text style={styles.tinyText}>Select an emotion:</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                        <Pressable
                            onPress={() => console.log('emoji pressed')
                          }
                        >
                            <MaterialCommunityIcons name="emoticon" size={45} color="#23AFBB" />
                        </Pressable>
                        <Pressable
                            onPress={() => console.log('emoji pressed')
                          }
                        >
                          <MaterialCommunityIcons name="emoticon-sad" size={45} color="#23AFBB" />
                        </Pressable>
                        <Pressable
                            onPress={() => console.log('emoji pressed')
                          }
                        >
                          <MaterialCommunityIcons name="emoticon-sad" size={45} color="#23AFBB" />
                        </Pressable>
                        <Pressable
                            onPress={() => console.log('emoji pressed')
                            }
                        >
                          <MaterialCommunityIcons name="emoticon-sad" size={45} color="#23AFBB" />
                        </Pressable>
                    </View>
                </View>


        <View style={styles.button}>
          <Link href={{ pathname: "bottleApp/insertBottle/confirmation" }}>
            <Text style={styles.buttonText}>Insert Moment</Text>
          </Link>
        </View>
        <Image style={{height: 300, aspectRatio: 1, }} source={require("../../../assets/graphics/bottle-cropped.png")} resizeMode="contain"/>

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
