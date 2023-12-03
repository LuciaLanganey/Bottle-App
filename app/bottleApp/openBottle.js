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
  }
};

export default function openBottle() {
  const styles = AppStyles();
  // modal code
  const [modalVisible, setModalVisible] = useState(false);
  const [leftArrowVisible, setLeftArrowVisible] = useState(false);
  const [momentImage, setMomentImage] = useState(require("../../assets/moments/knitting.jpeg"));
  const [momentCaption, setMomentCaption] = useState("Went to my weekly knitting club");
  const [momentTime, setMomentTime] = useState("Today at 07:27 AM");

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
                    <View visible={leftArrowVisible}
                    style={{position: 'absolute', left: 8, top: 10, backgroundColor: 'white', borderRadius: '30', borderWidth: 3, borderColor: 
                  'white'}}>
                          <Icon
                            name="leftcircle"
                            type="ant-design"
                            color="#23AFBB"
                            
                            size={40}
                            style={{ alignSelf: "left" }}
                            onPress={() => {
                              setMomentImage(require("../../assets/moments/knitting.jpeg"));
                              setMomentCaption("Went to my weekly knitting club");
                              setMomentTime("Today at 07:27 AM");
                              setLeftArrowVisible(false);
                            }}
                          />
                        </View>
                    <Image 
                      source={momentImage}
                      style={styles2.momentsImage}/>
                    <View style={{position: 'absolute', right: 8, top: 10, backgroundColor: 'white', borderRadius: '30', borderWidth: 3, borderColor: 
                  'white'}}>
                          <Icon
                            name="rightcircle"
                            type="ant-design"
                            color="#23AFBB"
                            
                            size={40}
                            style={{ alignSelf: "left" }}
                            onPress={() => {
                              setMomentImage(require("../../assets/moments/audio.png"));
                              setMomentCaption("wanted to share my lovely singing with you");
                              setMomentTime("Today at 02:29 PM");
                              setLeftArrowVisible(true);
                            }}
                          />
                        </View>
                    <Text style={styles.momentCaptionText}>{momentCaption}</Text>
                    <Text style={styles.momentTimeText}>{momentTime}</Text>
                    
                    <View style={{alignSelf: "center"}}>
                      <Pressable
                      style={[styles.button]}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        setLeftArrowVisible(false);
                      }}
                    >
                        <Text style={styles.textStyle}>Close bottle</Text>
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
        {/* <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', marginTop: 0, paddingTop: 0 }}> */}
          {/* <View style={styles.backIconContainer}>
            <Link href="home" asChild>
              <Ionicons
                name="arrow-back-circle"
                size={35}
                color="#23AFBB"
                onPress={() => console.log("back button pressed")}
              />
            </Link>
          </View> */}
      {/* </SafeAreaView> */}
    </ImageBackground>
    
  );
}
