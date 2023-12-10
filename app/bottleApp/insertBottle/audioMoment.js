import React from "react";
import { Text, View, ImageBackground, Image, TextInput, Pressable, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AppStyles } from "../../../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import moment from 'moment';
import Header from '../../header';


export default function openBottle() {
    const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

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
            <SafeAreaView style={{ flex: 1}}>
            
                <View style={styles.headerContainer}>
                    <Link href={{ pathname: 'bottleApp/insertBottle/addMoment.js' }} style={styles.backIconContainer}>
                        <Ionicons
                            name="arrow-back-circle"
                            size={35}
                            color="#23AFBB"
                        />
                    </Link>
                </View>
                <Image
                    source={require('../../../assets/graphics/EmptyBottle.png')} resizeMode={'contain'} style={styles.momentBottle}
                />
                <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
<View
                    style={{
                        // position: "absolute",
                        // alignSelf: "center",
                        // top: '40%',
                        // width: '90%',
                        // height: windowHeight*0.3,
                        // backgroundColor: "white",
                        // borderRadius: 20,
                        // padding: 20,
                        // zIndex: 1,
                        backgroundColor: "white",
                  borderRadius: 20,
                  borderColor: "gray",
                  width: windowWidth * 0.7,
                  height: 350,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                    }}
                >
                    <Image
                        source={require('../../../assets/audio.jpeg')}
                        style={{
                            //width: 200,
                            //height: 200,
                            alignSelf: "center",
                            resizeMode: 'contain',
                            padding: 20,
                            marginTop: '20%',
                            position: 'absolute'
                        }}
                    />
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <View style={[styles.button, {marginTop: '45%'}]}>
                            <Link
                                href={{
                                    pathname: "bottleApp/insertBottle/insertAudioMoments",
                                    params: { moment: currentMoment },
                                }}
                            >
                                <Text style={styles.buttonText}>Use</Text>
                            </Link>
                        </View>

                        <View style={[styles.button, { marginTop: '45%' }]}>
                            <Link
                                href={{
                                    pathname: "bottleApp/insertBottle/audio",
                                    params: { moment: currentMoment },
                                }}
                            >
                                <Text style={styles.buttonText}>Discard</Text>
                            </Link>
                        </View>
                    </View>
                </View>



            </View>
                
                
            </SafeAreaView>
        </ImageBackground>
    );
}