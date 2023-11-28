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
  Button,
  FlatList,
} from "react-native";
import { AppStyles } from "../styles";
import { Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { TextInput } from "react-native-gesture-handler";

export default function Home() {
  const styles = AppStyles();
  // const [text, onChangeText] = React.useState('');
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const [timeLeft, setTimeLeft] = useState("00h 00m");

  // time picker functions
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

  // change reciever functions
  const [modalVisible, setModalVisible] = useState(false);

  // search bar
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // In a real application, you would perform a search using the searchQuery
    // and update the searchResults state with the actual search results.
    // For simplicity, we'll just simulate some search results here.
    const simulatedResults = [
      { id: "1", name: "Result 1" },
      { id: "2", name: "Result 2" },
      { id: "3", name: "Result 3" },
    ];

    setSearchResults(simulatedResults);
  };

  if (!styles) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../assets/background.png")}
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
                    source={require("../assets/people/profileImage.jpg")}
                    style={styles.modalRecieverImage}
                  />
                  <Text style={styles.modalRecieverName}>Greg</Text>
                </View>

                <Text style={styles.modalText}>Select a new reciever:</Text>
                {/* Search Bar */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name="search"
                    type="font-awesome"
                    color="#23AFBB"
                    size={30}
                    style={{ marginRight: 10 }}
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
                {searchResults.length > 0 && (
                  <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View style={{ marginTop: 10 }}>
                        <Text>{item.name}</Text>
                      </View>
                    )}
                  />
                )}

                <Pressable
                  style={[styles.button]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Done</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/people/profileImage.jpg")}
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
          <Text style={styles.personNameText}>Greg</Text>
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
            source={require("../assets/graphics/bottle-cropped.png")}
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
          <Icon
            name="add-circle"
            type="ionicons"
            color="#23AFBB"
            size={100}
            onPress={() => console.log("hello")}
          />
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
