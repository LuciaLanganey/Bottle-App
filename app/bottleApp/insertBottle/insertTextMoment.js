import React, { useState } from "react";
import { Text, View, ImageBackground, Image, Pressable, Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Icon } from "react-native-elements";
import { AppStyles } from "../../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useLocalSearchParams } from "expo-router";
import Header from '../../header';

export default function insertTextMoment() {
    const params = useLocalSearchParams();
    const { text, moment } = params
    const styles = AppStyles();

    const [isHappySelected, setHappySelected] = useState(false);
    const [isSadSelected, setSadSelected] = useState(false);
    const [isAngrySelected, setAngrySelected] = useState(false);
    const [isNeutralSelected, setNeutralSelected] = useState(false);



    return (
        <ImageBackground
            source={require("../../../assets/background.png")}
            opacity="0.5"
            style={styles.backgroundImage}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <Link href={{ pathname: 'bottleApp/insertBottle/text' }} style={styles.backIconContainer}>
                        <Ionicons
                            name="arrow-back-circle"
                            size={35}
                            color="#23AFBB"
                        />
                    </Link>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.textInputBoxMessage}>
                        <Text style={styles.boxText}>{text}</Text>
                        <Text style={styles.timeSentText}>Today at {moment}</Text>
                    </View>
                    <View style={styles.filterView}>
                        {/* Filter by emotion bar */}
                        <Text style={styles.tinyText}>Select an emotion:</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                            <Pressable
                                onPress={() => {
                                    setHappySelected(!isHappySelected);
                                }}
                            >
                                <Icon
                                    name="emoticon"
                                    type="material-community"
                                    color={isHappySelected ? "#186174" : "#23AFBB"}
                                    size={45}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    setSadSelected(!isSadSelected)
                                }}
                            >
                                <Icon
                                    name="emoticon-sad"
                                    type="material-community"
                                    color={isSadSelected ? "#186174" : "#23AFBB"}
                                    size={45}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    setAngrySelected(!isAngrySelected)
                                }}
                            >
                                <Icon
                                    name="emoticon-angry"
                                    type="material-community"
                                    color={isAngrySelected ? "#186174" : "#23AFBB"}
                                    size={45}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    setNeutralSelected(!isNeutralSelected)
                                }}
                            >
                                <Icon
                                    name="emoticon-neutral"
                                    type="material-community"
                                    color={isNeutralSelected ? "#186174" : "#23AFBB"}
                                    size={45}
                                />
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.button}>
                        <Link href={{ pathname: 'bottleApp/insertBottle/confirmation' }}>
                            <Text style={styles.buttonText}>Insert Moment</Text>
                        </Link>
                    </View>
                    <Image style={{ height: 300, aspectRatio: 1, }} source={require("../../../assets/graphics/bottle-cropped.png")} resizeMode="contain">
                    </Image>
                </View>
            </SafeAreaView>
        </ImageBackground >
    );
}