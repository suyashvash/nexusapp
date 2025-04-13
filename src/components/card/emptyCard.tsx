import React from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../utils/routes";


const EmptyCard = () => {

    const navigation = useNavigation<any>()
    return (

        <TouchableOpacity onPress={() => navigation.navigate(Routes.app.dashboard.card.create)}>
            <View
                // resizeMode='cover'
                style={[styles.cardContainer]}
            >

                <AntDesign name="plus" size={30} color={Colors.accent} style={{ marginBottom: 8 }} />
                <Text style={styles.cardName}>Dont Have Any Card ?</Text>
                <Text style={styles.cardTitle}>Tap to create a new one !</Text>
            </View>
        </TouchableOpacity>
    )
};

export default EmptyCard;

const styles = StyleSheet.create({
    cardContainer: {
        width: 350,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginVertical: 10,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'lightgray',
        borderStyle: 'dashed',

    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 8,
    },
    cardName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "black",
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 14,
        color: 'gray',
    },
})