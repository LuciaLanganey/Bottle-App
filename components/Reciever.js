import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";

import { AppStyles } from "../utils/styles";

const styles = AppStyles();

const Reciever = ({ id, name, image_url }) => {
  return (
    <View>
      <Image source={{ uri: image_url }} style={styles.modalReceiverImage} />
      <Text style={styles.modalReceiverName}>{name}</Text>
    </View>
  );
};

export default Reciever;
