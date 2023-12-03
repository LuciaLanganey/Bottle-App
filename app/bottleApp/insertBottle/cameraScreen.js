// CameraScreen.js
import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const CameraScreen = ({ navigation }) => {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
    }
  };

  const recordVideo = async () => {
    // Implement video recording logic
  };

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
          <TouchableOpacity onPress={flipCamera}>
            <Ionicons name="camera-reverse" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture}>
            <Ionicons name="camera" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={recordVideo}>
            <Ionicons name="videocam" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </SafeAreaView>
  );
};

export default CameraScreen;
