import React from "react";
import { Text, View, ImageBackground, Image, Pressable, Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Icon } from "react-native-elements";
import { AppStyles } from "../../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useLocalSearchParams } from "expo-router";

export default function insertTextMoment() {
    const params = useLocalSearchParams();
    const { text, moment } = params
    const styles = AppStyles();



    return (
        <ImageBackground
            source={require("../../../assets/background.png")}
            opacity="0.5"
            style={styles.backgroundImage}
        >
            <SafeAreaView style={{ alignItems: 'center' }}>
                <View style={styles.headerContainer}>
                    <View style={styles.backIconContainer}>
                        <Link href={{ pathname: 'bottleApp/home' }} style={{ marginRight: 8 }}>
                            <Ionicons
                                name="arrow-back-circle"
                                size={35}
                                color="#23AFBB"
                            />
                        </Link>
                        <Text style={styles.subHeading}>My Bottle</Text>
                    </View>
                </View>
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
                                const filteredMoments = filteredMomentsByEmoji("happy");
                                console.log(filteredMoments);
                            }}
                        >
                            <Icon
                                name="emoticon"
                                type="material-community"
                                color="#23AFBB"
                                size={45}
                                onPress={() => navigateMoments('next')}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                const filteredMoments = filteredMomentsByEmoji("sad");
                                console.log(filteredMoments);
                            }}
                        >
                            <Icon
                                name="emoticon-sad"
                                type="material-community"
                                color="#23AFBB"

                                size={45}
                                onPress={() => navigateMoments('next')}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                const filteredMoments = filteredMomentsByEmoji("angry");
                                console.log(filteredMoments);
                            }}
                        >
                            <Icon
                                name="emoticon-angry"
                                type="material-community"
                                color="#23AFBB"

                                size={45}
                                onPress={() => navigateMoments('next')}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                const filteredMoments = filteredMomentsByEmoji("angry");
                                console.log(filteredMoments);
                            }}
                        >
                            <Icon
                                name="emoticon-neutral"
                                type="material-community"
                                color="#23AFBB"

                                size={45}
                                onPress={() => navigateMoments('next')}
                            />
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}