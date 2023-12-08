import React, { useState } from "react";
import { Text, View, ImageBackground, Dimensions, Image, TextInput, Pressable, Modal, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AppStyles } from "../../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";


const { height: windowHeight, width: windowWidth } = Dimensions.get("window");


export default function openBottle() {
   const [text, setText] = useState(''); // State to keep track of text
   const [modalVisible, setModalVisible] = useState(false);


   // const ImageChangeComponent = () => {
   //   const [currentImage, setCurrentImage] = useState('path/to/first/image.jpg');
   // }
   //   const handleButtonClick = () => {
   //     // Change the image file path when the button is clicked
   //     setCurrentImage('path/to/second/image.jpg');
   //   };
   const styles = AppStyles();
  
  
   // const ImageDisappearComponent = () => {
   //   const [imageVisible, setImageVisible] = useState(true);
   // }
   // const handlePress = () => {
   //   setImageVisible(false);
   // };


   return (
    <ImageBackground
        source={require("../../../assets/background.png")}
        opacity="0.5"
        style={styles.backgroundImage}
    >
        <SafeAreaView style={styles.centeredView}>
            <View style={styles.headerContainer}>
                <View style={styles.backIconContainer}>
                    <Link href={{ pathname: 'bottleApp/insertBottle/addMoment' }} style={{ marginRight: 8 }}>
                        <Ionicons
                            name="arrow-back-circle"
                            size={35}
                            color="#23AFBB"
                        />
                    </Link>
                    <Text style={styles.subHeading}>My Bottle</Text>
                </View>
            </View>
            <Image
                source={require('../../../assets/graphics/EmptyBottle.png')} resizeMode={'contain'} style={styles.momentBottle}
            />
            <View style={audiostyles.popupAudioBox}>
                <View style={audiostyles.audioBox} />
                <View style>
                <View style={{ position: 'absolute', left: 25, bottom: 60, borderRadius: 50, }}>
                        <Image source={require('../../../assets/moments/audioBlue.png')} resizeMode={'contain'} style = {audiostyles.audioFile}
            />
          
                    </View>
                    <View style={{ position: 'absolute', left: 25, bottom: 25, backgroundColor: 'white', borderRadius: 50, }}>
                        <Pressable style = {audiostyles.deleteMessage}>
                            <Ionicons name="trash-sharp" size={25} color="#23AFBB" />
                        </Pressable>
                    </View>
                    <View style={{padding: 10, position: 'absolute', left: '74%', bottom: 30, backgroundColor: 'white', borderRadius: 30 }}>
                        <Link href={{pathname: 'bottleApp/insertBottle/confirmation'}}>
                            <Text style={{fontSize: 16, color: "#23AFBB", font: "Inter-Bold"}}>Next ></Text>
                        </Link>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    </ImageBackground>
);
}


const audiostyles = StyleSheet.create ({
   popupAudioBox: {
       position: "absolute",
       alignSelf: "center",
       borderRadius: 20,
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
       marginTop: '120%',
    
})



