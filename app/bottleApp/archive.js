import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { AppStyles } from '../../utils/styles';
import { Link } from 'expo-router';

export default function Archive() {
  const styles = AppStyles();
  return (
    <ImageBackground
      source={require('../../assets/graphics/bottle_archive.png')}    
      style={styles.backgroundImage}
    >
      <SafeAreaView>
        <Link href={{ pathname: 'bottleApp/openBottle' }}>
          <View style={{ height: 200, width: 100 }}>
          </View>
        </Link>
        <View style={{ height: 200 }}>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}