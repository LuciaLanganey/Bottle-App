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
import Supabase from "../../utils/Supabase";
import Reciever from "../../components/Reciever";

 
export default function Profile() {
  const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
  const styles = AppStyles();
  const [data, setData] = useState([]);
  const [recipients, setRecipients] = useState([]);

  const handleRecordUpdated = (payload) => {
    console.log("UPDATE", payload);
    setRecipients((oldRecipients) => {
      const updatedRecipients = oldRecipients.map((recipient) =>
        recipient.id === payload.new.id ? payload.new : recipient
      );
      return updatedRecipients;
    });
  };

  const handleRecordInserted = (payload) => {
    console.log("INSERT", payload);
    setRecipients((oldRecipients) => [...oldRecipients, payload.new]);
  };

  const handleRecordDeleted = (payload) => {
    console.log("DELETE", payload);
    setRecipients((oldRecipients) =>
      oldRecipients.filter((recipient) => recipient.id !== payload.old.id)
    );
  };

  useEffect(() => {
    // Listen for changes to db
    // From https://supabase.com/docs/guides/realtime/concepts#postgres-changes
    Supabase.channel("schema-db-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "Friends" },
        handleRecordUpdated
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Friends" },
        handleRecordInserted
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "Friends" },
        handleRecordDeleted
      )
      .subscribe();
  }, []);

  useEffect(() => {
    // Fetch data on initial load
    const fetchData = async () => {
      const response = await Supabase.from("Friends").select("*");
      setData(response.data);
    };
    fetchData();
  }, []);


  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      opacity="0.5"
      style={styles.backgroundImage}
    >
      <SafeAreaView>
        <View style={{ alignItems: "center", marginBottom: 90,  }}>
          <Image
            source={require("../../assets/people/profile.jpg")}
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
                source={require("../../assets/people/profile.jpg")}
                style={styles.smallProfileImage}
              />
              <Text style={styles.contactName}>Scarlet</Text>
            </View>
            <View style={styles.contact}>
              <Image
                source={require("../../assets/people/profile.jpg")}
                style={styles.smallProfileImage}
              />
              <Text style={styles.contactName}>Scarlet</Text>
            </View>
            <View style={styles.contact}>
              <Image
                source={require("../../assets/people/profile.jpg")}
                style={styles.smallProfileImage}
              />
              <Text style={styles.contactName}>Scarlet</Text>
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
