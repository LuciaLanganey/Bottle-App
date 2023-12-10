import React, { useState } from "react";
import { Text, View, ImageBackground, Image, Pressable, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Icon } from "react-native-elements";
import { AppStyles } from "../../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useLocalSearchParams } from "expo-router";
import Header from '../../header';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function insertTextMoment() {
    const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

    const params = useLocalSearchParams();
    const { text, moment } = params
    const styles = AppStyles();

    const [isHappySelected, setHappySelected] = useState(false);
    const [isSadSelected, setSadSelected] = useState(false);
    const [isAngrySelected, setAngrySelected] = useState(false);
    const [isNeutralSelected, setNeutralSelected] = useState(false);

    const handleEmojiSelect = (emoji) => {
        setHappySelected(emoji === 'happy');
        setSadSelected(emoji === 'sad');
        setAngrySelected(emoji === 'angry');
        setNeutralSelected(emoji === 'neutral');
    };

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
                                    handleEmojiSelect('happy');
                                }}
                            >
                                <MaterialCommunityIcons name="emoticon" size={45} color={isHappySelected ? "#186174" : "#23AFBB"} />
                            </Pressable>
                            <Pressable
                                onPress={() => handleEmojiSelect('sad')
                                }
                            >
                                <MaterialCommunityIcons name="emoticon-sad" size={45} color={isSadSelected ? "#186174" : "#23AFBB"} />
                            </Pressable>
                            <Pressable
                                onPress={() => handleEmojiSelect('angry')
                                }
                            >
                                <MaterialCommunityIcons name="emoticon-angry" size={45} color={isAngrySelected ? "#186174" : "#23AFBB"} />
                            </Pressable>
                            <Pressable
                                onPress={() => handleEmojiSelect('neutral')
                                }
                            >
                                <MaterialCommunityIcons name="emoticon-neutral" size={45} color={isNeutralSelected ? "#186174" : "#23AFBB"} />
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.button}>
                        <Link href={{ pathname: 'bottleApp/insertBottle/confirmation' }}>
                            <Text style={styles.buttonText}>Insert</Text>
                        </Link>
                    </View>
                    <Image style={{ height: windowHeight*0.3, aspectRatio: 1, }} source={require("../../../assets/graphics/bottle-cropped.png")} resizeMode="contain" />
                </View>
            </SafeAreaView>
        </ImageBackground >
    );
}