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
  Dimensions
} from "react-native";
import { AppStyles } from "../../utils/styles";
import { Icon } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Supabase, getImage } from "../../utils/Supabase";
import Reciever from "../../components/Reciever";
import { Link } from "expo-router";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

const styles2 = {
  modalView: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
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
  },
}

export default function Home() {
  const styles = AppStyles();

  // General Supabase Functions:
  const handleRecordUpdated = (payload) => {
    console.log("UPDATE", payload);
    setRecipients((oldRecipients) => {
      const updatedRecipients = oldRecipients.map((recipient) =>
        recipient.first_name === payload.new.first_name ? payload.new : recipient
      );
      return updatedRecipients;
    });
  };

  const constructImageUrl = (imagePath) => {
    // Replace 'your-supabase-bucket-url' with your actual Supabase storage bucket URL
    const supabaseBucketUrl = 'https://supabase.com/dashboard/project/xtdwstdpktqgpnqyjamj/storage/buckets/files';
    console.log('image url given: ', imagePath)
    return `https://xtdwstdpktqgpnqyjamj.supabase.co/storage/v1/object/public/files/${imagePath}`;
  };

  const handleRecordInserted = (payload) => {
    console.log("INSERT", payload);
    setRecipients((oldRecipients) => [...oldRecipients, payload.new]);
  };

  const handleRecordDeleted = (payload) => {
    console.log("DELETE", payload);
    setRecipients((oldRecipients) =>
      oldRecipients.filter((recipient) => recipient.first_name !== payload.old.first_name)
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
        .eq("first_name", potentialRecipient.first_name);

      // Update the previously selected recipient's is_selected field to false
      if (selectedRecipient) {
        await Supabase.from("Friends")
          .update([{ is_selected: false }])
          .eq("first_name", selectedRecipient.first_name);
      }

      // Update the local state
      if (potentialRecipient == null) {
        setSelectedRecipient(selectedRecipient);
        console.log("No new recipient selected");
        
      }
      else {
        setSelectedRecipient(potentialRecipient);
        console.log("Recipient Changed");
      }
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

  const [countdownModalVisible, setCountdownModalVisible] = useState(false);
  const [modalShown, setModalShown] = useState(false);

  useEffect(() => {
    const showCountdownModal = () => {
      setCountdownModalVisible(true);
      setModalShown(true);
  
      setTimeout(() => {
        setCountdownModalVisible(false);
      }, 180000);
    };
  
    setTimeout(() => {
      if (!modalShown) {
        showCountdownModal();
      }
    }, 30000);
  }, [modalShown]);

  
  const handleConfirm = (date) => {
    const currentHour = new Date().getHours();
    const selectedHour = date.getHours();
    const selectedMinute = date.getMinutes();
    let amPm = "AM";
  
    let formattedHour = selectedHour;
  
    if (selectedHour >= 12) {
      amPm = "PM";
      if (selectedHour > 12) {
        formattedHour -= 12;
      }
    }
  
    if (currentHour >= 12 && selectedHour < 12) {
      formattedHour += 12;
    }
  
    const formattedTime = `${formattedHour}:${
      selectedMinute < 10 ? "0" + selectedMinute : selectedMinute
    } ${amPm}`;

    setSelectedTime(formattedTime);
    hideDatePicker();
  };
    

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const selected = new Date();
      
      const [time, meridiem] = selectedTime.split(" ");
      const [hours, minutes] = time.split(":").map((str) => parseInt(str));

      selected.setHours(hours + (meridiem === "PM" && hours !== 12 ? 12 : 0));
      selected.setMinutes(minutes);

      if (selected < now) {
        selected.setDate(selected.getDate() + 1);
      }

      let difference = selected - now;

      const hoursLeft = Math.floor(difference / (1000 * 60 * 60));
      difference -= hoursLeft * 1000 * 60 * 60;
      
      const minutesLeft = Math.floor(difference / (1000 * 60));

      const formattedTimeLeft = `${hoursLeft.toString().padStart(2, "0")}h ${minutesLeft.toString().padStart(2, "0")}m`;
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
                  {selectedRecipient && (
                    <>
                      <Image
                        source={{
                          uri: constructImageUrl(selectedRecipient.image_url),
                        }}
                        style={styles.modalRecieverImage}
                      />
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
                        // id={item.id}
                        first_name={item.first_name}
                        last_name={item.last_name}
                        image_url={item.image_url}
                        onPress={() => {
                          select(item);
                        }}
                        isSelected={
                          selectedRecipient &&
                          selectedRecipient.first_name === item.first_name
                        }
                      />
                    )}
                    // keyExtractor={(item) => item.id.toString()}
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
            {selectedRecipient && (
              <>
                <Image
                  source={{
                    uri: constructImageUrl(selectedRecipient.image_url),
                  }}
                  style={styles.modalRecieverImage}
                />
              </>
            )}
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
          <View style={{ margin: 40 }}>
            <Link href={{ pathname: "bottleApp/insertBottle/addMoment" }}>
              <Icon
                name="add-circle"
                type="ionicons"
                color="#23AFBB"
                size={100}
              />
            </Link>
          </View>
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={countdownModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setCountdownModalVisible(!countdownModalVisible);
          }}
        >
          {/* Modal Content */}
          <View style={styles.centeredView}>
            <View style={styles2.modalView}>
              <View style={styles.closeIconContainer}>
                <Icon
                  name="close"
                  type="ionicons"
                  color="#23AFBB"
                  size={30}
                  onPress={() =>
                    setCountdownModalVisible(!countdownModalVisible)
                  }
                />
              </View>
              <Text style={styles.modalText}>Time to open a bottle!</Text>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../assets/people/grandma.jpeg")}
                  style={styles.modalRecieverImage}
                />
              </View>

              <View style={[styles.button]}>
                <Link href={{ pathname: "bottleApp/openBottle" }}>
                  <Text style={styles.textStyle}>Open</Text>
                </Link>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}
