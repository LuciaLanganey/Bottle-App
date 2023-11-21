import { StyleSheet, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

const theme = {
  backgroundColor: '#ffffff',
  primaryColor: '#186174',
  secondaryColor: '#23AFBB',
  borderOutlineColor: '#D9D9D9',
  buttonColor: '#23AFBB',
  white: '#FFFFFF',
  black: '#000000',
  titleFont: 'Inter-Bold',
  textFont: 'Inter-Regular',
};

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export const AppStyles = () => {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
      alignItems: 'center',
    },
    backgroundImage: {
      flex: 1,
      justifyContent: 'center',
      resizeMode: 'cover',
      width: '100%',
      height: '100%',
    },
    text: {
      fontSize: 16,
      fontFamily: theme.textFont,
      color: theme.secondaryColor,
    },
    title: {
      fontSize: 48,
      textAlign: "center",
      fontFamily: theme.titleFont,
      color: theme.primaryColor,
    },
    button: {
      width: windowWidth*0.4,
      height: windowHeight*0.05,
      borderRadius: 17,
      backgroundColor: theme.buttonColor,
      justifyContent: "center",
      marginTop: 10,
      marginBottom: 15,
    },
    buttonText: {
      fontSize: 16,
      textAlign: "center",
      fontFamily: theme.textFont,
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
      width: windowWidth*0.7,
      height: windowHeight*0.5,
    },
    textInputBox: {
      borderRadius: 20,
      borderColor: theme.borderOutlineColor,
      backgroundColor: theme.white,
      width: windowWidth*0.8,
      height: windowHeight*0.05,
      margin: 12,
      borderWidth: 1,
      padding: 10,
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
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  });
};