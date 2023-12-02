
import React from 'react';

import React from "react";
import { useState } from 'react';
import Supabase from "../utils/Supabase.js";
import { View, ScrollView, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { AppStyles } from '../utils/styles.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function SignUp() {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const styles = AppStyles();

  const handleSignUp = async () => {

    // General Supabase Functions:
    const handleRecordUpdated = (payload) => {
      console.log("UPDATE", payload);
      setRecipients((oldRecipients) => {
        const updatedRecipients = oldRecipients.map((recipient) =>
          recipient.id === payload.new.id ? payload.new : recipient
        );
        return updatedRecipients;
      });
    };
  
    // check all fields have been filled out
    if (!email || !username || !fullName || !password) {
      setError("Please fill in all fields");
      return;
    }

    // sign up with Supabase auth
    const { data, error } = await Supabase.auth.signUp({
      email: email,
      password: password
    });
  
    if (error) {
      setError(error.message);
      return;
    } else if (data) {
      setError(false);
      upsertUserProfile(data.user);
    }
  }

  const upsertUserProfile = async (user) => {
    if (!user) {
      setError("Unable to get user");
      return;
    };

    // create updates object
    const updates = {
      id: user.id,
      username: username,
      full_name: fullName,
      updated_at: new Date(),
      year_joined: new Date().getFullYear(),
    };

    // upsert updates to profiles table
    const { error } = await Supabase
      .from('profiles')
      .upsert(updates);

    if (error) {
      setError(error.message);
    };
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>first plates</Text>
        <Text style={styles.subheading}>join us!</Text>

        <View style={styles.loginForm}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="email"
              placeholderTextColor='#FF9F9F'
            />
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="username"
              placeholderTextColor='#FF9F9F'
            />
            <TextInput
              style={styles.input}
              onChangeText={setFullName}
              value={fullName}
              placeholder="full name"
              placeholderTextColor='#FF9F9F'
            />
            <TextInput
              secureTextEntry = {true}
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="password"
              placeholderTextColor='#FF9F9F'
            />
          </View>
        </View>

        <Pressable onPress={handleSignUp}>
          <Text style={styles.button}>let's eat</Text>
        </Pressable >

        <Text style={{marginTop: 20}}>
          Already have an account? 
          <Link href={{ pathname: 'bottleApp/home' }}>Log in</Link>
        </Text>

        {error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
}
  