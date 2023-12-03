import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, Image, Pressable, Modal, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { AppStyles } from "../../utils/styles";
import { Link } from "expo-router";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

const styles2 = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 0
  },
  bottleImage: {
    // width: width, // Set the width to the screen width
    resizeMode: 'contain', // Maintain aspect ratio while fitting within width
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginTop: 10,
    marginBottom: 10,
  },
  momentsImage: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center",
    alignSelf: "center",
    resizeMode: 'contain',
    width: '100%',
    max_width: '60%',
    margin: 0,
    marginTop: 10,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 80,
  },
  modalView: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "left",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cancelButton: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.05,
    borderRadius: 30,
    backgroundColor: "#23AFBB",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  momentCaptionText: {
    color: "#186174",
    textAlign: "left",
    fontFamily: "Inter-Regular",
    fontSize: 16,
    marginTop: 15,
    paddingTop: 15,
    marginBottom: 5,
  },
};

export default function openBottle() {
  const styles = AppStyles();
  // modal code
  const [modalVisible, setModalVisible] = useState(false);
  // const [momentImage, setMomentImage] = useState(require("../../assets/moments/knitting.jpeg"));
  // const [momentCaption, setMomentCaption] = useState("Went to my weekly knitting club");
  // const [momentTime, setMomentTime] = useState("Today at 07:27 AM");

  const [momentIndex, setMomentIndex] = useState(0);

  // Define moments with their respective data
  const moments = [
    {
      type: "image",
      image: require("../../assets/moments/knitting.jpeg"),
      caption: "Went to my weekly knitting club",
      time: "Today at 07:27 AM",
    },
    {
      type: "image",
      image: require("../../assets/moments/audio.png"),
      caption: "Wanted to share my lovely singing with you",
      time: "Today at 02:29 PM",
    },
    {
      type: "text",
      caption: "Your grandfather forgot to feed the cats AGAIN. Always laying around reading a book instead of helping out.",
      time: "Today at 08:00 PM",
    },
  ];

  const navigateMoments = (direction) => {
    let newIndex = momentIndex;
    if (direction === 'next') {
      newIndex = (momentIndex + 1) % moments.length;
    } else if (direction === 'prev') {
      newIndex = (momentIndex - 1 + moments.length) % moments.length;
    }
    setMomentIndex(newIndex);
  };

  return (
    <ImageBackground
          source={require("../../assets/background.png")}
          opacity="0.5"
          style={styles.backgroundImage}
        >
          <View style={styles2.container}>
            <View style={{marginBottom: 30}}>
              <Image
                source={require("../../assets/graphics/bottle-reverse.png")}
                style={styles2.bottleImage}
              />
            </View>

            <View>
              <Text style={styles.timeSubheadingText}>
                Time to open
              </Text>
              <Text style={styles.personNameText}>
                Grandma's
              </Text>
              <Text style={styles.timeSubheadingText}>
                bottle
              </Text>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                {/* Modal Content */}
                <View style={styles2.centeredView}>
                  <View style={styles2.modalView}>
                    {moments[momentIndex].type === 'image' && (
                      <Image
                        source={moments[momentIndex].image}
                        style={styles2.momentsImage}
                      />
                    )}
                    {moments[momentIndex].type === 'text' && (
                      <Text style={styles2.momentCaptionText}>{moments[momentIndex].caption}</Text>
                    )}
                    {moments[momentIndex].type === 'image' && (
                      <Text style={styles.momentCaptionText}>{moments[momentIndex].caption}</Text>
                    )}
                    <Text style={styles.momentTimeText}>{moments[momentIndex].time}</Text>

                    <View style={{
                      position: 'absolute', left: 8, bottom: 10, backgroundColor: 'white', borderRadius: '30', borderWidth: 3, borderColor:
                        'white'
                    }}>
                      <Icon
                        name="leftcircle"
                        type="ant-design"
                        color="#23AFBB"

                        size={40}
                        style={{ alignSelf: "left" }}
                        onPress={() => navigateMoments('prev')}
                      />
                    </View>
                    <View style={{position: 'absolute', right: 8, bottom: 10, backgroundColor: 'white', borderRadius: '30', borderWidth: 3, borderColor: 
                  'white'
                    }}>
                      <Icon
                        name="rightcircle"
                        type="ant-design"
                        color="#23AFBB"

                        size={40}
                        style={{ alignSelf: "left" }}
                        onPress={() => navigateMoments('next')}
                      />
                    </View>
                    
                    <View style={{alignSelf: "center"}}>
                      <Pressable
                      style={[styles2.cancelButton]}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                      >
                        <Text style={styles.textStyle}>Close</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            
            

            <View style={{ alignItems: "center", marginTop: 30 }}>
              <Pressable
                style={[styles.button]}
                onPress={() => {
                  setModalVisible(true)
                }}
              >
                <Text style={styles.textStyle}>Open</Text>
              </Pressable>
              <Pressable
                style={[styles.button]}
                onPress={() => { 
                }}
              >
                <Text style={styles.textStyle}>Archive</Text>
              </Pressable>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                position: "absolute",
                top: "6%",
              }}
            >
              <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/people/grandma.jpeg")}
                style={styles2.profileImage}
              />
              </View>
              <Text style={styles.timeSubheadingText}>
                Grandma
              </Text>
              {/* NOTE: add button is here - change link to next screen with onPress */}
            </View>

          </View>
    </ImageBackground>
    
  );
}
