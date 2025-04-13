import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import GeneratingLottie from '../../assets/aiLoading.json'
import { StyleSheet, View, Text, Dimensions, Modal, Animated } from "react-native";

export default function GeneratingModal({ isVisible }: any) {
    const floatAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [currentText, setCurrentText] = useState("Generating..");
    
    const texts = [
        "Analyzing Profile...",
        "Reading Description...",
        "Cooking Best Content..",
        "Generating..."
    ];

    useEffect(() => {
        // Create a continuous floating animation for the Lottie
        Animated.loop(
            Animated.sequence([
                // Float up
                Animated.timing(floatAnim, {
                    toValue: -20,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                // Float down
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ])
        ).start();
        
        // Text change animation
        const changeText = () => {
            // Fade out
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                // Change text when fully faded out
                const randomIndex = Math.floor(Math.random() * texts.length);
                setCurrentText(texts[randomIndex]);
                
                // Fade in
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            });
        };
        
        // Set interval to change text
        const interval = setInterval(changeText, 3000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            statusBarTranslucent={true}>

            <View style={styles.centeredView}>
                <View style={[styles.modalView]}>
                    <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
                        <LottieView 
                            source={GeneratingLottie}
                            autoPlay
                            loop
                            style={{
                                width: 200,
                                height: 200,
                            }}
                        />
                    </Animated.View>
                    <Text style={styles.modalText}>Please Wait We Process !</Text>
                    <Animated.Text style={[{
                        textAlign: "center",
                        marginTop: 5,
                        fontSize: 16,
                        width: '100%',
                        color: 'lightgray',
                    }, { opacity: fadeAnim }]}>
                        {currentText}
                    </Animated.Text>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#0009'

    },
    modalView: {
        margin: 20,
        width: Dimensions.get('window').width - 40,
        height: 70,
        backgroundColor: "transparent",
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,

    },

    modalText: {
        textAlign: "center",
        fontSize: 18,
        width: '100%',
        color: 'white',
        fontWeight: 'bold',
    }
});