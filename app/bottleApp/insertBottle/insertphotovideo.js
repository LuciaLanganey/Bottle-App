// PreviewScreen.js
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PreviewScreen = ({ navigation }) => {
  const photo = navigation.getParam('photo', null);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={{ uri: photo.uri }} style={{ width: '100%', height: '80%' }} resizeMode="contain" />
      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        {/* Add more options or actions as needed */}
      </View>
    </View>
  );
};

export default PreviewScreen;
