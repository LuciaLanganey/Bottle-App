import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import { Video } from "expo-av";

export default function PreviewScreen() {
  const params = useLocalSearchParams();
  const { photo, video } = params;
  console.log('photo uri: ', photo)
  console.log('video uri: ', video)

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      <Image
        source={{ uri: photo }}
        style={{ width: "100%", height: "80%" }}
        resizeMode="contain"
      />

      <Video
        style={styles.video}
        source={{ uri: video }}
        useNativeControls
        resizeMode="contain"
        isLooping
      />

      <View style={{ flexDirection: "row", marginTop: 16 }}>
        <Link href={{ pathname: "bottleApp/insertBottle/cameraScreen"}}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Link>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
