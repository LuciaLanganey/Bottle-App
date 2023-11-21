import React from "react";
import { Text, SafeAreaView, View, Image, TextInput, ImageBackground } from "react-native";
import { AppStyles } from "../styles";
import { Icon } from 'react-native-elements'

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
        <Text style={styles.timeSubheadingText}>until sent</Text>
        <View style={styles.container}> 
          <View style={styles.button}>
            <Text style={styles.buttonText}>Change time</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require("../assets/people/profileImage.jpg")}
              style={styles.profileImage}
            />
          </View>
        </View>
        <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.personNameText}>Greg</Text>
          <Icon name='account-edit' type='material-community' color='#23AFBB' size={50} style={{marginLeft: 'auto'}} onPress={() => console.log('hello')} />
        </View>
           
        <View style={styles.container}> 
          <Image
            source={require("../assets/graphics/bottle-cropped.png")}
            style={styles.bottleImage}
          />
        </View>
        <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center', position:'absolute', bottom: '10%'}}>
          <Icon name='add-circle' type='ionicons' color='#23AFBB' size={100} onPress={() => console.log('hello')} />
          {/* NOTE: add button is here - change link to next screen with onPress */}
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
