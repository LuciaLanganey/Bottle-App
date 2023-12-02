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
} from "react-native";
import { AppStyles } from "../../utils/styles";
import { Icon } from "react-native-elements";
import Supabase from "../../utils/Supabase";
import Reciever from "../../components/Reciever";
 
export default function Profile() {
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
        <View style={{ alignItems: "center", borderWidth: 2, borderColor: 'blue' }}>
          <Image
            source={require("../../assets/people/profile.jpg")}
            style={styles.modalRecieverImage}
          />
          <Text style={styles.personNameText}>Scarlet</Text>
          <Text style={styles.personNameText}>123 - 456 - 7890</Text>
        </View>
        <View style={{ alignItems: "center", borderWidth: 2, borderColor: 'blue' }}>
          <Text>Contacts</Text>
          <View style={styles.contactListContainer}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
              <Reciever
                id={item.id}
                first_name={item.first_name}
                last_name={item.last_name}
                image_url={item.image_url}
              />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
            />
          </View>
          
          
          <Icon
            name="add-circle"
            type="ionicons"
            color="#23AFBB"
            size={40}
            style={{ alignSelf: "center", marginTop: 50, marginLeft: 10 }}
            onPress={() => console.log('Add Recipient Button Pressed')}
          />
         
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
