import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  FlatList,
  Pressable,
  Dimensions,
} from "react-native";
import { AppStyles } from "../../utils/styles";
import { Icon } from "react-native-elements";
import Reciever from "../../components/Reciever";

 
export default function Profile() {
  const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
  const styles = AppStyles();
  const [data, setData] = useState([]);
  const [recipients, setRecipients] = useState([]);


  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      opacity="0.5"
      style={styles.backgroundImage}
    >
      <SafeAreaView>
        <View style={{ alignItems: "center", marginBottom: 90,  }}>
          <Image
            source={require("../../assets/people/Scarlet.jpeg")}
            style={styles.profileImage}
          />
          <Text style={styles.personNameText}>Scarlet</Text>
          <Text style={styles.personPhoneNumber}>123 - 456 - 7890</Text>
        </View>
        <View style={{ alignItems: "left", marginLeft: 10, }}>
          <Text style={styles.contactTitle}>Contacts</Text>
          <View style={styles.contactList}>

            <View style={styles.contact}>
              <Image
                source={require("../../assets/people/grandma.jpeg")}
                style={styles.smallProfileImage}
              />
              <Text style={styles.contactName}>Grandma</Text>
            </View>
            <View style={styles.contact}>
              <Image
                source={require("../../assets/people/mom.jpeg")}
                style={styles.smallProfileImage}
              />
              <Text style={styles.contactName}>Mom</Text>
            </View>
            <View style={styles.contact}>
              <Image
                source={require("../../assets/people/cynthia.jpeg")}
                style={styles.smallProfileImage}
              />
              <Text style={styles.contactName}>Cynthia</Text>
            </View>
            <Icon
              name="add-circle"
              type="ionicons"
              color="#23AFBB"
              size={65}
              style={{ marginTop: 25, marginLeft: 5 }}
              onPress={() => console.log('Add Recipient Button Pressed')}
            />

          </View>
         
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
