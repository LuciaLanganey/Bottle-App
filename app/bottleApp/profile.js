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
  TextInput,
  Modal,
} from "react-native";
import { AppStyles } from "../../utils/styles";
import { Icon } from "react-native-elements";
import Reciever from "../../components/Reciever";
import { Supabase } from "../../utils/Supabase";
import { Feather } from "@expo/vector-icons";


export default function Profile() {
  const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
  const styles = AppStyles();

  const [modalVisible, setModalVisible] = useState(false);

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const handleRecordUpdated = (payload) => {
    console.log("UPDATE", payload);
    setRecipients((oldRecipients) => {
      const updatedRecipients = oldRecipients.map((recipient) =>
        recipient.id === payload.new.id ? payload.new : recipient
      );
      return updatedRecipients;
    });
  };

  const constructImageUrl = (imagePath) => {
    // Replace 'your-supabase-bucket-url' with your actual Supabase storage bucket URL
    const supabaseBucketUrl =
      "https://supabase.com/dashboard/project/xtdwstdpktqgpnqyjamj/storage/buckets/files";
    console.log("image url given: ", imagePath);
    return `https://xtdwstdpktqgpnqyjamj.supabase.co/storage/v1/object/public/files/${imagePath}`;
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

  // fetch all recievers and current reciever:
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all recipients
        const { data, error } = await Supabase.from("Friends").select("*");

        if (error) {
          console.error("Error fetching recipients:", error);
          return;
        }

        // Find the recipient with is_selected set to true
        const selectedRecipient = data.find(
          (recipient) => recipient.is_selected
        );

        // Set recipients and selected recipient in state
        setRecipients(data);
      } catch (error) {
        console.error("Error fetching and setting recipients:", error);
      }
    };

    fetchData();
  }, []);

  const addRecipient = async (firstName, lastName) => {
    try {
      // Replace 'your_table_name' with the actual name of your Supabase table
      const { data: newRecipient, error, status } = await Supabase.from(
        "Friends"
      ).upsert([
        {
          first_name: firstName,
          last_name: lastName,
          is_selected: false,
          image_url: null,
        },
      ]);
  
      console.log("Supabase response status:", status);
      console.log("Supabase response data:", newRecipient);
  
      if (error) {
        console.error("Error adding recipient to Supabase:", error.message);
      } else if (!newRecipient) {
        console.error("Failed to add recipient. No response from Supabase.");
      } else {
        console.log("New recipient added to Supabase:", newRecipient);
        // Update your local state with the new recipient data
        setRecipients((prevRecipients) => [...prevRecipients, newRecipient]);
      }
    } catch (error) {
      console.error("Error adding recipient:", error.message);
    }
  };
  
  
  

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      opacity="0.5"
      style={styles.backgroundImage}
    >
      <SafeAreaView>
        <View style={{ alignItems: "center", marginBottom: 100 }}>
          <Image
            source={require("../../assets/people/Scarlet.jpeg")}
            style={styles.profileImage}
          />
          <Text style={styles.personNameText}>Scarlet</Text>
          <Text style={styles.personPhoneNumber}>123 - 456 - 7890</Text>
        </View>
        <View
          style={{
            alignItems: "left",
            marginHorizontal: 10,
            marginBottom: 200,
          }}
        >
          <Text style={styles.contactTitle}>Contacts</Text>
          {/* <View
            style={{
              width: windowWidth * 0.9,
              borderColor: "black",
              borderWidth: 2,
            }}
          >
            <FlatList
              data={recipients}
              renderItem={({ item }) => (
                <Reciever
                  // id={item.id}
                  first_name={item.first_name}
                  last_name={item.last_name}
                  image_url={item.image_url}
                  onPress={() => {
                    select(item);
                  }}
                />
              )}
              // keyExtractor={(item) => item.id.toString()}
              numColumns={5}
            />
          </View> */}

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
            <View style={{alignSelf: 'center', marginLeft: 5,}}>
            <Icon
              name="add-circle"
              type="ionicons"
              color="#23AFBB"
              size={65}
              style={{}}
              onPress={() => console.log('button pressed')}
            />
            </View>
            </View>
           
          {/* <View
            style={{
              borderColor: "black",
              borderWidth: 2,
              flexDirection: "row",
              justifyContent: "flex-end",
              width: windowWidth * 0.9,
            }}
          >
            <Icon
              name="add-circle"
              type="ionicons"
              color="#23AFBB"
              size={65}
              style={{}}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View> */}

          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            {/* Modal Content */}
            {/* <View style={styles.centeredView}>
              <View
                style={{
                  width: windowWidth * 0.8,
                  height: windowHeight * 0.5,
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
                }}
              >
                <View style={styles.closeIconContainer}>
                  <Icon
                    name="close"
                    type="ionicons"
                    color="#23AFBB"
                    size={30}
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>

                <View style={{alignItems: 'center'}}>
                  <View style={{ margin: 10 }}>
                    <Text style={styles.contactTitle}>Add Contact</Text>
                  </View>
                  <TextInput
                    style={{
                      width: windowWidth * 0.6,
                      borderColor: "#D9D9D9",
                      borderWidth: 2,
                      margin: 10,
                      height: windowHeight * 0.05,
                      borderRadius: 20,
                      padding: 10,
                    }}
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                    placeholder="First Name"
                    placeholderTextColor="#23AFBB"
                  />

                  <TextInput
                    style={{
                      width: windowWidth * 0.6,
                      borderColor: "#D9D9D9",
                      borderWidth: 2,
                      margin: 10,
                      height: windowHeight * 0.05,
                      borderRadius: 20,
                      padding: 10,
                    }}
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                    placeholder="Last Name"
                    placeholderTextColor="#23AFBB"
                  />

                  <Text style={[styles.loginSubtitle, { marginHorizontal: 10, marginTop: 10, marginBottom: 15, fontSize: 20, color: '#186174', alignSelf: 'flex-start' }]}>Contact Picture:</Text>

                  <Pressable style={{borderColor: "#D9D9D9", borderWidth: 2, borderRadius: 50, width: 100, alignItems: 'center', padding: 20, margin: 10 }} onPress={() => console.log('upload image button pressed')}>
                    <Feather
                      name="upload"
                      size={20}
                      color="#23AFBB"
                      style={{ marginRight: 5 }}
                    />
                    <Text style={styles.text}>Upload</Text>
                  </Pressable>
                </View>

                <Pressable
                  style={[styles.button]}
                  onPress={() => {
                    addRecipient(firstName, lastName);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Done</Text>
                </Pressable>
              </View>
            </View> */}
          {/* </Modal> */}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
