import React from "react";
import { Text, SafeAreaView, View, Image, ImageBackground } from "react-native";
import { AppStyles } from "../styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Icon } from 'react-native-elements'

export default function Time() {
  const styles = AppStyles();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  if (!styles) {
    return null;
  }

  return (
    <ImageBackground source={require("../assets/background.png")} opacity='0.5' style={styles.backgroundImage}>
    <SafeAreaView>
        <Text style={styles.title}>Change time</Text>
        <View style={styles.container}> 
          <View style={{alignItems: 'center'}}>
            <Image
              source={require("../assets/people/profileImage.jpg")}
              style={styles.profileImage}
            />
          </View>
        </View>
        <Text style={styles.personNameText}>Greg</Text>
        <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.timeLeftText}>11:00 PM </Text>
            <Icon name='clock-edit' type='material-community' color='#23AFBB' size={40}
              style={{alignSelf: 'center', marginTop: 50, marginLeft: 10}} 
              onPress={() => showDatePicker} /> 
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
    </SafeAreaView>
    </ImageBackground>
  );
}