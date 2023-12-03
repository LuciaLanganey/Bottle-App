import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { AppStyles } from '../utils/styles';

const Reciever = ({ id, first_name, last_name, image_url, onPress }) => {
  const styles = AppStyles();
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected(!isSelected);
    onPress({ id, first_name, last_name, image_url, isSelected: !isSelected });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{flexDirection: "col",
      alignItems: "center", margin: 5}}>
        <Image source={require("../assets/people/profile.jpg")} style={styles.resultsImage} />
        {isSelected && (
          <View style={styles.checkmarkContainer}>
            <View style={styles.checkmarkCircle}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          </View>
        )}
        <Text style={styles.resultsName}>{first_name}</Text>
      </View>
    </TouchableOpacity>
  );
};



export default Reciever;
