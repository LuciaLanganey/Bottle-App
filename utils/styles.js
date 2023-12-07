import { StyleSheet, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import React from 'react'

export const AppStyles = () => {
  const theme = {
    backgroundColor: "#ffffff",
    primaryColor: "#186174",
    secondaryColor: "#23AFBB",
    borderOutlineColor: "#D9D9D9",
    buttonColor: "#23AFBB",
    white: "#FFFFFF",
    black: "#000000",
    titleFont: "Inter-Bold",
    textFont: "Inter-Regular",
  };

  const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.primaryBackground,
      },
      text: {
        fontSize: 16,
        color: theme.primaryText,
      },
      title: {
        fontSize: 48,
        textAlign: "center",
        color: theme.primaryTitle,
      },
    });
  }

  return StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: "center",
    },
    backgroundImage: {
      flex: 1,
      justifyContent: "center",
      resizeMode: "cover",
      width: "100%",
      height: "100%",
    },
    text: {
      fontSize: 16,
      fontFamily: theme.textFont,
      color: theme.secondaryColor,
    },
    darkText: {
      fontSize: 16,
      fontFamily: theme.textFont,
      color: theme.primaryColor,
    },
    title: {
      fontSize: 48,
      textAlign: "center",
      fontFamily: theme.titleFont,
      color: theme.primaryColor,
    },
    subHeading: {
      fontSize: 21,
      textAlign: "center",
      fontFamily: theme.titleFont,
      color: theme.primaryColor,
    },
    myBottleSubheading: {
        fontSize: 30,
        textAlign: "center",
        fontFamily: theme.titleFont,
        color: theme.primaryColor,
        // position: 'absolute',
        paddingLeft: '26%',
    },

    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      // borderWidth: 2,
      // borderColor: 'blue'
      // paddingHorizontal: 16,
      // paddingTop: 16,
    },

    headerContainer: {
      flexDirection: 'row', // Aligns children in a row
      alignItems: 'flex-start', // Aligns children to the start of the cross axis (vertical)
      // marginTop: '-10%',
      paddingTop: 20,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },

    backIconContainer: {
      flexDirection: 'row',
      // left: 0,
    },
    button: {
      width: windowWidth * 0.4,
      height: windowHeight * 0.05,
      borderRadius: 17,
      backgroundColor: theme.buttonColor,
      justifyContent: "center",
      marginBottom: 15,
      marginTop: 15,
    },
    buttonText: {
      fontSize: 16,
      textAlign: "center",
      fontFamily: theme.titleFont,
      color: theme.white,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginTop: 10,
      marginBottom: 10,
    },
    bottleImage: {
      marginTop: 15,
      alignSelf: 'center',
      width: windowWidth * 0.7,
      height: windowHeight * 0.5,
    },
    textInputBox: {
      borderRadius: 20,
      borderColor: theme.borderOutlineColor,
      backgroundColor: theme.secondaryColor,
      width: windowWidth * 0.8,
      height: windowHeight * 0.25,
      margin: 12,
      marginTop: '95%',
      borderWidth: 1,
      padding: 20,
      paddingTop: 20,
      color: 'white',
      fontSize: 20,
      font: "Inter-Regular"
    },
    timeLeftText: {
      color: theme.primaryColor,
      textAlign: "center",
      fontFamily: theme.titleFont,
      fontSize: 35,
      fontWeight: 500,
      marginTop: 50,
    },
    timeSubheadingText: {
      color: theme.primaryColor,
      textAlign: "center",
      fontFamily: theme.textFont,
      fontSize: 20,
    },
    personNameText: {
      color: theme.primaryColor,
      textAlign: "center",
      fontFamily: theme.titleFont,
      fontSize: 30,
    },
    personPhoneNumber: {
      color: theme.primaryColor,
      textAlign: "center",
      fontFamily: theme.titleFont,
      fontSize: 18,
    },

    shadowProp: {
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },

    // modal style
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
    },
    // button: {
    //   borderRadius: 20,
    //   padding: 10,
    //   elevation: 2,
    // },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 20,
    },
    modalText: {
      color: theme.primaryColor,
      textAlign: "center",
      fontFamily: theme.titleFont,
      fontSize: 16,
      margin: 5,
      // margin: 10,
    },
    modalRecieverImage: {
      width: 80,
      height: 80,
      borderRadius: 60,
      margin: 5,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 60,
      margin: 5,
    },
    modalRecieverName: {
      color: theme.primaryColor,
      textAlign: "center",
      fontFamily: theme.textFont,
      fontSize: 16,
      margin: 5,
    },

    // search bar
    searchBarContainer: {
      borderRadius: 20,
      borderColor: theme.borderOutlineColor,
      backgroundColor: theme.white,
      width: windowWidth * 0.6,
      height: windowHeight * 0.04,
      borderWidth: 1,
      padding: 10,
      margin: 10,
    },

    closeIconContainer: {
      position: "absolute",
      top: 0,
      right: 0,
      padding: 10,
    },

    // backIconContainer: {
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    // },

    recieverListContainer: {
      width: windowWidth * 0.8,
      height: windowHeight * 0.2,
      alignContent: "center",
      // borderColor: "red",
      // borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },

    contactList: {
      alignContent: "center",
      alignItems: "left",
      marginTop: 15,
      flexDirection: 'row',
      padding: 10,
      justifyContent: "center"
    },

    contact: {
      margin: 5,
    },

    contactTitle: {
      color: theme.primaryColor,
      textAlign: "center",
      fontFamily: theme.titleFont,
      fontSize: 24,
      marginLeft: 10,
    },

    contactName: {
      color: theme.primaryColor,
      textAlign: "center",
      fontFamily: theme.titleFont,
      fontSize: 18,
    },

    smallProfileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginTop: 10,
      marginBottom: 10,
    },

    reciever: {
      flexDirection: "col",
      alignItems: "center",
      // borderColor: "blue",
      // borderWidth: 2,
    },

    resultsName: {
      color: theme.primaryColor,
      fontFamily: theme.textFont,
      fontSize: 16,
    },
    resultsImage: {
      width: 60,
      height: 60,
      borderRadius: 60,
    },

    // reciever overlays
    checkmarkContainer: {
      position: "absolute",
      position: "absolute",
      top: 5,
      right: 5,
    },

    checkmarkCircle: {
      backgroundColor: theme.primaryColor,
      borderRadius: 12,
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    checkmarkText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    selectMedia: {
      backgroundColor: 'white',
      borderRadius: 82,
      borderOutlineColor: 'gray',
    },
    mediaButton: {
      padding: 10,
      alignItems: 'center',
    },
    momentTimeText: {
      color: theme.primaryColor,
      textAlign: "left",
      fontFamily: theme.textFont,
      fontSize: 13,
      paddingBottom: 10
    },
    momentCaptionText: {
      color: theme.primaryColor,
      textAlign: "left",
      fontFamily: theme.textFont,
      fontSize: 16,
      marginTop: 5,
      paddingTop: 5,
      marginBottom: 5,
    },
    momentBottle: {
      height: '70%',
      alignSelf: 'center',

    },

    // login style

    loginTitle: {
      textAlign: 'center',
      fontFamily: theme.titleFont,
      fontSize: 42,
      color: theme.primaryColor,
    },

    loginSubtitle: {
      textAlign: 'center',
      fontFamily: theme.titleFont,
      fontSize: 22,
      color: theme.primaryColor,
      marginBottom: 30,
    },
    // textInput: {
    //   backgroundColor: "#23AFBB",
    //   borderRadius: 30,
    //   height: 150,
    //   padding: 100,
    //   color: 'black',
    //   textAlignVertical: 'top', // Ensures text starts from the top on Android
    //   overflow: 'hidden', // Prevents the box from expanding
    // },
    popupBox: {
      position: 'absolute',
      alignSelf: 'center',
    },
    deleteMessage: {
      // position: 'absolute',
      bottom: 0,
      left: 0,
      padding: 10,
    },
    mediumFilledBottle: {
      resizeMode: 'contain',
      width: '220%',
      marginTop: '8%',
      height: undefined,
      aspectRatio: 1,
    },
    savedText: {
      //position: 'absolute',
      fontSize: 38,
      color: "#186174",
      font: "Inter-Bold",
      marginTop: '20%',
      marginBottom: '8%',
    },
    textInputBoxMessage: {
      borderRadius: 20,
      borderColor: theme.borderOutlineColor,
      backgroundColor: 'white',
      width: windowWidth * 0.8,
      height: windowHeight * 0.25,
      margin: 12,
      borderWidth: 1,
      padding: 20,
      paddingTop: 20,
      color: 'white',
      fontSize: 20,
      font: "Inter-Regular"
    },
    boxText: {
      font: "Inter-Regular",
      fontSize: 16,
      color: theme.primaryColor,
    },
    timeSentText: {
      font: "Inter-Regular",
      fontSize: 12,
      color: theme.primaryColor,
      position: 'absolute',
      bottom: 0,
      left: 0,
      padding: 20,
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
    tinyText: {
      color: "#186174",
      textAlign: "center",
      fontFamily: "Inter-Regular",
      fontSize: 13,
      paddingBottom: 8,
    }, 
    croppedBottle: {
      // position: 'absolute',
      bottom: 0,
    }
  });
};
