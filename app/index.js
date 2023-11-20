import React from "react";
import { Text, SafeAreaView, View, Image, TextInput } from "react-native";
import { AppStyles } from "../styles";

export default function Home() {
  const styles = AppStyles();
  if (!styles) {
    return null;
  }

  return (
    <SafeAreaView>
      <Text style={styles.title}>Inter Bold</Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Button Text</Text>
      </View>
      <Image
        source={require("../assets/people/profileImage.jpg")}
        style={styles.profileImage}
      />
      <TextInput
          style={styles.textInputBox}
          // onChangeText={text => setInput(text)}
          // value={input}
          placeholder="Filler Text Here"
        />
    </SafeAreaView>
  );
}
