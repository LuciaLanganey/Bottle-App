import React from 'react';
import {
  Text,
  View,
  Image,
} from "react-native";

import { AppStyles } from '../utils/styles';


const Reciever = ({ id, first_name, last_name, image_url }) => {
  const styles = AppStyles();
  return (
      <View style={styles.reciever}>
        <Image source={require("../assets/background.png")} style={styles.resultsImage} />
        <Text style={styles.resultsName}>{first_name}</Text>
    </View>
  );
};

export default Reciever;
