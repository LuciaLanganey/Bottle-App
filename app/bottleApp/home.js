import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import { AppStyles } from "../../utils/styles";
import { Icon } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Supabase from "../../utils/Supabase";
import Reciever from "../../components/Reciever";
import { Link } from "expo-router";

export default function Home() {
  const styles = AppStyles();

  // General Supabase Functions:
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
        setSelectedRecipient(selectedRecipient || null); // Set to null if none found
      } catch (error) {
        console.error("Error fetching and setting recipients:", error);
      }
    };

    fetchData();
  }, []);

  // Select new reciever code:
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  const handleRecieverChange = async (potentialRecipient) => {
    try {
      // Update the new recipient's is_selected field to true
      await Supabase.from("Friends")
        .update([{ is_selected: true }])
        .eq("id", potentialRecipient.id);

      // Update the previously selected recipient's is_selected field to false
      if (selectedRecipient) {
        await Supabase.from("Friends")
          .update([{ is_selected: false }])
          .eq("id", selectedRecipient.id);
      }

      // Update the local state
      setSelectedRecipient(potentialRecipient);
      console.log("Recipient Changed");
    } catch (error) {
      console.error("Error updating is_selected field:", error);
    }
  };

  const select = (newRecipient) => {
    potentialRecipient = newRecipient;
  };

  // time picker code:
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const [timeLeft, setTimeLeft] = useState("00h 00m");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let selectedHour = date.getHours();
    const selectedMinute = date.getMinutes();
    let amPm = "AM";

    if (selectedHour >= 12) {
      amPm = "PM";
      if (selectedHour > 12) {
        selectedHour -= 12;
      }
    }

    if (selectedHour === 0) {
      selectedHour = 12;
    }

    const formattedTime = `${selectedHour}:${
      selectedMinute < 10 ? "0" + selectedMinute : selectedMinute
    } ${amPm}`;
    setSelectedTime(formattedTime);
    hideDatePicker();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const selected = new Date();
      const [hours, minutes] = selectedTime
        .split(":")
        .map((str) => parseInt(str));
      selected.setHours(hours);
      selected.setMinutes(minutes);

      let difference = selected.getTime() - now.getTime();

      if (difference < 0) {
        selected.setDate(selected.getDate() + 1);
        difference = selected.getTime() - now.getTime();
      }

      const hoursLeft = Math.floor(difference / (1000 * 60 * 60));
      const minutesLeft = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );

      const formattedTimeLeft = `${hoursLeft
        .toString()
        .padStart(2, "0")}h ${minutesLeft.toString().padStart(2, "0")}m`;
      setTimeLeft(formattedTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTime]);

  // modal code
  const [modalVisible, setModalVisible] = useState(false);

  // search bar
  const [searchQuery, setSearchQuery] = useState("");
  let [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);

  const handleSearch = () => {
    searchResults = data;
    setSearchResults(searchResults);
  };

  if (!styles) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      opacity="0.5"
      style={styles.backgroundImage}
    >
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.timeLeftText}>{timeLeft}</Text>
          <Icon
            name="clock-edit"
            type="material-community"
            color="#23AFBB"
            size={40}
            style={{ alignSelf: "center", marginTop: 50, marginLeft: 10 }}
            onPress={() => showDatePicker()}
          />
        </View>
        <Text style={styles.timeSubheadingText}>until sent to</Text>
        <View style={styles.container}>
          {/* Change Reciever Pop-up */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            {/* Modal Content */}
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.closeIconContainer}>
                  <Icon
                    name="close"
                    type="ionicons"
                    color="#23AFBB"
                    size={30}
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
                <Text style={styles.modalText}>Current reciever:</Text>
                {/* Current Reciever Pic and Name*/}
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={require("../../assets/people/profile.jpg")}
                    style={styles.modalRecieverImage}
                  />
                  {selectedRecipient && (
                    <>
                      <Text style={styles.personNameText}>
                        {selectedRecipient.first_name}
                      </Text>
                    </>
                  )}
                </View>

                <Text style={styles.modalText}>Select a new reciever:</Text>
                {/* Search Bar */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name="search"
                    type="font-awesome"
                    color="#23AFBB"
                    size={20}
                    onPress={() => handleSearch()}
                  />
                  <TextInput
                    style={styles.searchBarContainer}
                    placeholder="Search friends"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                  />
                </View>

                {/* Scrollable list of all friends */}
                <View style={styles.recieverListContainer}>
                  <FlatList
                    data={recipients}
                    renderItem={({ item }) => (
                      <Reciever
                        id={item.id}
                        first_name={item.first_name}
                        last_name={item.last_name}
                        image_url={item.image_url}
                        onPress={() => {
                          select(item);
                        }}
                        isSelected={
                          selectedRecipient && selectedRecipient.id === item.id
                        }
                      />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                  />
                </View>

                <Pressable
                  style={[styles.button]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    handleRecieverChange(potentialRecipient);
                    // setSelectedRecipient(potentialRecipient);
                  }}
                >
                  <Text style={styles.textStyle}>Done</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../assets/people/profile.jpg")}
              style={styles.profileImage}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {selectedRecipient && (
            <>
              <Text style={styles.personNameText}>
                {selectedRecipient.first_name}
              </Text>
            </>
          )}
          <Icon
            name="account-edit"
            type="material-community"
            color="#23AFBB"
            size={50}
            style={{ marginLeft: "auto" }}
            onPress={() => setModalVisible(true)}
          />
        </View>

        <View style={styles.container}>
          <Image
            source={require("../../assets/graphics/bottle-cropped.png")}
            style={styles.bottleImage}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            position: "absolute",
            bottom: "13%",
          }}
        >
          <Link href={{ pathname: 'bottleApp/addMoment' }}>
            <Icon
              name="add-circle"
              type="ionicons"
              color="#23AFBB"
              size={100}
            />
          </Link>
          {/* NOTE: add button is here - change link to next screen with onPress */}
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          textColor="#186174"
          customHeaderIOS={(headerProps) => (
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: "#186174",
                  fontSize: 18,
                  marginTop: 20,
                  marginBottom: 10,
                }}
              >
                Change your bottle delivery time
              </Text>
              <Text style={{ color: "#186174", fontSize: 24, fontWeight: 700 }}>
                {selectedTime}
              </Text>
              <Text style={{ color: "#186174", fontSize: 18, marginTop: 10 }}>
                to:
              </Text>
            </View>
          )}
          customCancelButtonIOS={(cancelProps) => (
            <TouchableOpacity
              onPress={cancelProps.onPress}
              style={{
                backgroundColor: "white",
                alignItems: "center",
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  color: "#23AFBB",
                  fontSize: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          )}
          customConfirmButtonIOS={(confirmProps) => (
            <TouchableOpacity
              onPress={confirmProps.onPress}
              style={{ backgroundColor: "#23AFBB", alignItems: "center" }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  fontWeight: 600,
                }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
