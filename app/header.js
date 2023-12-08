// Header.js
import React from 'react';
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { AppStyles } from "../utils/styles";

const Header = () => {
  const styles = AppStyles();

  return (
    <View style={styles.headerContainer}>
      <Link href={{ pathname: 'bottleApp/home' }} style={styles.backIconContainer}>
        <Ionicons
          name="arrow-back-circle"
          size={35}
          color="#23AFBB"
        />
      </Link>
    </View>
  );
};

export default Header;
