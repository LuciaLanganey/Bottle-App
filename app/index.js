import React from "react";
import { Text, SafeAreaView, View, Image, TextInput, ImageBackground } from "react-native";
import { AppStyles } from "../styles";

export default function Home() {
  const styles = AppStyles();
  const [text, onChangeText] = React.useState('');

  if (!styles) {
    return null;
  }

  return (
    <ImageBackground source={require("../assets/background.png")} opacity='0.5' style={styles.backgroundImage}>
    <SafeAreaView>
        <Text style={styles.timeLeftText}>01h 03 m</Text>
        <Text style={styles.timeSubheadingText}>until sent to</Text>
        <View style={styles.container}> 
          <View style={styles.button}>
            <Text style={styles.buttonText}>Change time</Text>
          </View>
          <Image
            source={require("../assets/people/profileImage.jpg")}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.personNameText}>Greg</Text>
        <View style={styles.container}> 
          <Image
            source={require("../assets/graphics/EmptyBottle.png")}
            style={styles.bottleImage}
          />
        </View>
        
        {/* <TextInput
          style={styles.textInputBox}
          onChangeText={onChangeText}
          value={text}
          placeholder="Filler Text"
        /> */}
    </SafeAreaView>
    </ImageBackground>
  );
}
