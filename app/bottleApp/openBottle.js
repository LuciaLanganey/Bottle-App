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
    width: 80,
    height: 80,
    borderRadius: 60,
    marginTop: 10,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.6,
    margin: 20,
    backgroundColor: "white",
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
  }
};

export default function openBottle() {
  const styles = AppStyles();
  // modal code
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ImageBackground
          source={require("../../assets/background.png")}
          opacity="0.5"
          style={styles.backgroundImage}
        >
          <View style={styles2.container}>
            <View style={{marginBottom: 50}}>
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
                    <View style={styles2.closeIconContainer}>
                      <Icon
                        name="close"
                        type="ionicons"
                        color="#23AFBB"
                        size={30}
                        onPress={() => setModalVisible(!modalVisible)}
                      />
                    </View>
                    <Text style={styles.modalText}>Moment</Text>
                    <Pressable
                      style={[styles.button]}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        handleRecieverChange(potentialRecipient);
                        // setSelectedRecipient(potentialRecipient);
                      }}
                    >
                      <Text style={styles.textStyle}>Done</Text>
                    </Pressable>
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
                source={require("../../assets/people/profile.jpg")}
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
