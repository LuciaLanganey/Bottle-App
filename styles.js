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
    'Inter-Regular': require('./assets/fonts/Inter-Bold.ttf'),
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.primaryBackground,
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
    },
    buttonText: {
      fontSize: 18,
      textAlign: "center",
      fontFamily: theme.textFont,
      color: theme.white,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60, 
      borderWidth: 3,
      borderColor: theme.secondaryColor,
    },
    textInputBox: {
      width: windowWidth*0.8,
      height: windowHeight*0.05,
      borderRadius: 20,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.borderOutlineColor,
      backgroundColor: theme.white,
      padding: 20,
    },
  });
};
