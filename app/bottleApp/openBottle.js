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
    margin: 0,
    marginTop: 15,
    marginBottom: 5,
    maxWidth: '100%',
    resizeMode: 'contain',
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
  momentTimeText: {
    color: "#186174",
    textAlign: "left",
    fontFamily: "Inter-Regular",
    fontSize: 13,
    paddingBottom: 20,
    marginBottom: 60
  },
  tinyText: {
    color: "#186174",
    textAlign: "center",
    fontFamily: "Inter-Regular",
    fontSize: 13,
  },
  filterCenteredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  filterView: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.1,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
};

export default function openBottle() {
  const styles = AppStyles();
  const [modalVisible, setModalVisible] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [momentIndex, setMomentIndex] = useState(0);
  const [filteredMoments, setFilteredMoments] = useState([]);

  const [emojiColors, setEmojiColors] = useState({
    emoticon: false,
    'emoticon-sad': false,
    'emoticon-angry': false,
    'emoticon-neutral': false,
  });


  const moments = [
    {
      type: "image",
      image: require("../../assets/moments/knitting.jpeg"),
      caption: "Went to my weekly knitting club",
      time: "Today at 07:27 AM",
      emoji: "emoticon",
    },
    {
      type: "image",
      image: require("../../assets/moments/audio.png"),
      caption: "Wanted to share my lovely singing with you",
      time: "Today at 02:29 PM",
      emoji: "emoticon-sad",
    },
    {
      type: "text",
      caption: "Your grandfather forgot to feed the cats AGAIN. Always laying around reading a book instead of helping out.",
      time: "Today at 03:00 PM",
      emoji: "emoticon-angry",
    },
    {
      type: "text",
      caption: "I'm going to try reading this new book I was recommended by my friend Beatrice",
      time: "Today at 04:21 PM",
      emoji: "emoticon-neutral",
    },
    {
      type: "text",
      caption: "My friend Beatrice came over to read with me!",
      time: "Today at 04:45 PM",
      emoji: "emoticon",
    },
  ];

  const navigateMoments = (direction) => {
    let newIndex;
    if (filteredMoments.length > 0) {
      if (direction === 'next') {
        newIndex = (momentIndex + 1) % filteredMoments.length;
      } else if (direction === 'prev') {
        newIndex = (momentIndex - 1 + filteredMoments.length) % filteredMoments.length;
      }
    } else {
      if (direction === 'next') {
        newIndex = (momentIndex + 1) % moments.length;
      } else if (direction === 'prev') {
        newIndex = (momentIndex - 1 + moments.length) % moments.length;
      }
    }
    setMomentIndex(newIndex);
    console.log(newIndex + " " + filteredMoments[newIndex]);
  };


  const filteredMomentsByEmoji = (emoji) => {
    const updatedColors = { ...emojiColors };
    Object.keys(updatedColors).forEach((key) => {
      if (key !== emoji) {
        updatedColors[key] = false;
      }
    });
    updatedColors[emoji] = !updatedColors[emoji];
    setEmojiColors(updatedColors);
    setFilteredMoments(moments.filter((moment) => moment.emoji === emoji));
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      opacity="0.5"
      style={styles.backgroundImage}
    >
      <View style={styles2.container}>
        <View style={{ marginBottom: 30 }}>
          <Image
            source={require("../../assets/graphics/bottle-reverse.png")}
            style={styles2.bottleImage}
          />
        </View>

        <View style={{
          position: 'absolute', left: 20, top: 60
        }}>
          <Link href={{ pathname: 'bottleApp/home' }}>
            <Icon
              name="close"
              type="antdesign"
              color="#23AFBB"

              size={40}
            />
          </Link>
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
            transparent={true}
            visible={showFilterModal || modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setShowFilterModal(false);
              setModalVisible(false);
            }}
          >
            {/* Modal Content */}

            {showFilterModal && (
              <View style={styles2.filterCenteredView}>
                <View style={styles2.filterView}>
                  {/* Filter by emotion bar */}
                  <Text style={styles.tinyText}>Select an emotion:</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                    <Pressable
                      onPress={() => {
                        filteredMomentsByEmoji('emoticon');
                      }}
                      style={{borderRadius: 5 , marginRight: 10}}
                    >
                      <Icon
                        name="emoticon"
                        type="material-community"
                        color={emojiColors['emoticon'] ? '#186174' : '#23AFBB'}
                        size={45}
                        onPress={() => { 
                          filteredMomentsByEmoji('emoticon'); 
                      
                      }}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        filteredMomentsByEmoji('sad')
                      }}
                      style={{borderRadius: 5 , marginRight: 10}}
                    >
                      <Icon
                        name="emoticon-sad"
                        type="material-community"
                        color={emojiColors['emoticon-sad'] ? '#186174' : '#23AFBB'}
                        size={45}
                        onPress={() => { filteredMomentsByEmoji('emoticon-sad'); }}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        filteredMomentsByEmoji('emoticon-angry')
                      }}
                      style={{ borderRadius: 5 , marginRight: 10}}
                    >
                      <Icon
                        name="emoticon-angry"
                        type="material-community"
                        color={emojiColors['emoticon-angry'] ? '#186174' : '#23AFBB'}
                        size={45}
                        onPress={() => { filteredMomentsByEmoji('emoticon-angry'); }}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        filteredMomentsByEmoji('neutral')
                      }}
                      style={{ borderRadius: 5}}
                    >
                      <Icon
                        name="emoticon-neutral"
                        type="material-community"
                        color={emojiColors['emoticon-neutral'] ? '#186174' : '#23AFBB'}
                        size={45}
                        onPress={() => { filteredMomentsByEmoji('emoticon-neutral'); }}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            )}



            <View style={styles2.centeredView}>
              <View style={styles2.modalView}>
                {filteredMoments.length > 0 ? (
                  // Display filtered moments when they exist
                  <View>
                    {filteredMoments[momentIndex].type === 'image' && (
                      <Image
                        source={filteredMoments[momentIndex].image}
                        style={styles2.momentsImage}
                      />
                    )}
                    {filteredMoments[momentIndex].type === 'text' && (
                      <Text style={styles2.momentCaptionText}>
                        {filteredMoments[momentIndex].caption}
                      </Text>
                    )}
                    {filteredMoments[momentIndex].type === 'image' && (
                      <Text style={styles.momentCaptionText}>
                        {filteredMoments[momentIndex].caption}
                      </Text>
                    )}
                    <Text style={styles2.momentTimeText}>
                      {filteredMoments[momentIndex].time}
                    </Text>
                  </View>
                ) : (
                  <View>
                    {console.log(moments[momentIndex].image)}
                    {moments[momentIndex].type === 'image' && (
                      <Image
                        source={moments[momentIndex].image}
                        style={styles2.momentsImage}
                        visible="true"
                      />
                    )}
                    {moments[momentIndex].type === 'text' && (
                      <Text style={styles2.momentCaptionText}>
                        {moments[momentIndex].caption}
                      </Text>
                    )}
                    {moments[momentIndex].type === 'image' && (
                      <Text style={styles.momentCaptionText}>
                        {moments[momentIndex].caption}
                      </Text>
                    )}
                    <Text style={styles2.momentTimeText}>
                      {moments[momentIndex].time}
                    </Text>
                  </View>
                )} 
                <View style={{
                  position: 'absolute', right: 5, top: 10, backgroundColor: 'white', borderRadius: '30', borderWidth: 1, borderColor:
                  'white'
                }}>
                  <Icon
                  name={
                    filteredMoments.length > 0
                      ? filteredMoments[momentIndex].emoji
                      : moments[momentIndex].emoji
                  }
                  type="material-community"
                  color="#186174"
                  size={40}
                />

                </View>
                
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
                <View style={{
                  position: 'absolute', right: 8, bottom: 10, backgroundColor: 'white', borderRadius: '30', borderWidth: 3, borderColor:
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

                <View style={{ position: 'absolute', right: '40%', bottom: 10, alignSelf: "center" }}>
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

            <View style={{
              position: 'absolute', right: 20, top: 60
            }}>
              <Icon
                name="filter"
                type="font-awesome"
                color="#23AFBB"

                size={50}
                onPress={toggleFilterModal}
              />
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
          <View style={[styles.button]}>
            <Link href={{pathname: 'bottleApp/archive'}}>
              <Text style={styles.textStyle}>Save</Text>
            </Link>
          </View>
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
