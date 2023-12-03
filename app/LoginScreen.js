import React from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';

export default function LogIn() {
  return (
    <View>
      <Text>Bottle</Text>
      <Text>Uncap your day with others</Text>
      <Pressable
        onPress={() => console.log('Sign in button clicked')
        }
      >
        <Text>Done</Text>
      </Pressable>
      <Pressable
        onPress={() => console.log('Sign in button clicked')
        }
      >
        <Text>Done</Text>
      </Pressable>
    </View>
  );
}