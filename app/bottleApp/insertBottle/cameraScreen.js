// The following packages need to be installed using the following commands:
// npm install expo-camera
// npm install expo-media-library
// npm install expo-sharing
// npm install expo-av

import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Pressable,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Link } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AppStyles } from "../../../utils/styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';


export default function CameraScreen() {
  const styles2 = AppStyles();

  var currentMoment = moment().format('hh:mm:ss a');

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (
    hasCameraPermission === undefined ||
    hasMicrophonePermission === undefined
  ) {
    return <Text>Requestion permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      // preview ui
      <ImageBackground
        source={require("../../../assets/background.png")}
        opacity="0.5"
        style={styles2.backgroundImage}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              justifyContent: "center",
              alignSelf: "stretch",
              marginTop: 20,
              marginHorizontal: 20,
              height: 600,
            }}
          >
            <Image
              style={{ aspectRatio: 6 / 10 }}
              source={{ uri: "data:image/jpg;base64," + photo.base64 }}
            />
          </View>

          <View
            style={{
              margin: 20,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={styles2.button}>
              <Link
                href={{
                  pathname: "bottleApp/insertBottle/insertphotovideo",
                  params: { photo: photo.uri, video: undefined, moment: currentMoment },
                }}
              >
                <Text style={styles2.buttonText}>Use</Text>
              </Link>
            </View>

            <View style={styles2.button}>
              <Pressable
                onPress={() => {
                  setVideo(undefined);
                  setPhoto(undefined);
                  console.log(
                    "photo discarded, photo and video set to undefined"
                  );
                }}
              >
                <Text style={styles2.buttonText}>Discard</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  let recordVideo = () => {
    setIsRecording(true);
    let options = {
      quality: "1080p",
      maxDuration: 60,
      mute: false,
    };

    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  };

  let stopRecording = () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  if (video) {
    let shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    let saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    return (
      <ImageBackground
        source={require("../../../assets/background.png")}
        opacity="0.5"
        style={styles2.backgroundImage}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Video
            style={styles.video}
            source={{ uri: video.uri }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
          <View
            style={{
              margin: 20,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={styles2.button}>
              <Link
                href={{
                  pathname: "bottleApp/insertBottle/insertphotovideo",
                  params: { video: video.uri, photo: undefined, moment: currentMoment },
                }}
              >
                <Text style={styles2.buttonText}>Use</Text>
              </Link>
            </View>

            <View style={styles2.button}>
              <Pressable
                onPress={() => {
                  setVideo(undefined);
                  setPhoto(undefined);
                  console.log(
                    "photo discarded, photo and video set to undefined"
                  );
                }}
              >
                <Text style={styles2.buttonText}>Discard</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    // camera ui

    <View style={{ flex: 1 }}>
      <Camera style={styles.container} ref={cameraRef}>
        <View style={{ width: 390, flex: 1, paddingTop: 45, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Link href={{ pathname: "bottleApp/insertBottle/photovideo" }}>
            <Ionicons name="arrow-back-circle" size={50} color="#23AFBB" />
          </Link>

          <Pressable onPress={() => console.log('camera flip pressed')}>
            <MaterialCommunityIcons name="camera-flip" size={50} color="#23AFBB" /> 
          </Pressable>

        </View>
        <View
          style={{
            width: 390,
            height: 150,
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 2,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            padding: 30,
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity onPress={takePic}>
            <View style={{ alignItems: "center" }}>
              <Entypo name="camera" size={40} color="#23AFBB" />
              <Text style={{ color: "#23AFBB", fontSize: 21 }}>Take Photo</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={isRecording ? stopRecording : recordVideo}>
            <View style={{ alignItems: "center" }}>
              <Entypo
                name="video-camera"
                size={40}
                color={isRecording ? "red" : "#23AFBB"}
              />
              <Text style={{ color: "#23AFBB", fontSize: 21 }}>
                {isRecording ? "Stop Recording" : "Record Video"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
    margin: 20,
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
    maxHeight: 200,
    maxWidth: 200,
  },
});
