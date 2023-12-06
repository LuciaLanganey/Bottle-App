import React, { useState } from "react";
import { Text, View, ImageBackground, Image, TextInput, Pressable, Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AppStyles } from "../../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import moment from 'moment';

export default function openBottle() {
    const [text, setText] = useState(''); // State to keep track of text
    const styles = AppStyles();
    var currentMoment = moment().format('hh:mm:ss a');
    const clearText = () => {
        setText(''); // Function to clear text
    };
    return (
        <ImageBackground
            source={require("../../../assets/background.png")}
            opacity="0.5"
            style={styles.backgroundImage}
        >
            <SafeAreaView style={styles.centeredView}>
                <View style={styles.headerContainer}>
                    <View style={styles.backIconContainer}>
                        <Link href={{ pathname: 'bottleApp/insertBottle/addMoment' }} style={{ marginRight: 8 }}>
                            <Ionicons
                                name="arrow-back-circle"
                                size={35}
                                color="#23AFBB"
                            />
                        </Link>
                        <Text style={styles.subHeading}>My Bottle</Text>
                    </View>
                </View>
                <Image
                    source={require('../../../assets/graphics/EmptyBottle.png')} resizeMode={'contain'} style={styles.momentBottle}
                />
                <View style={styles.popupBox}>
                    <TextInput style={styles.textInputBox} multiline numberOfLines={4} placeholder="Type here" value={text} onChangeText={setText} />
                    <View style>
                        <View style={{ position: 'absolute', left: 25, bottom: 25, backgroundColor: 'white', borderRadius: 50, }}>
                            <Pressable onPress={clearText} style={styles.deleteMessage}>
                                <Ionicons name="trash-sharp" size={25} color="#23AFBB" />
                            </Pressable>
                        </View>
                        <View style={{ padding: 10, position: 'absolute', left: '74%', bottom: 30, backgroundColor: 'white', borderRadius: 30 }}>
                            <Link href={{
                                pathname: '/bottleApp/insertBottle/insertTextMoment', params: {text: text, moment: currentMoment}}}>
                                <Text style={{fontSize: 16, color: "#23AFBB", font: "Inter-Bold"}}>Next &gt;</Text>
                            </Link>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}