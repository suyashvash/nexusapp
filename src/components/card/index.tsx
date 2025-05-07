import React from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import useUser from "../../redux/useStore";

interface CardProps {
    name?: string;
    title: string;
    views?: number;
    onClick?: () => void;
    style?:ViewStyle;
    bgUrl?: string;
}

const Card = ({ name, title, views, onClick,style ,bgUrl}: CardProps) => {
    
    const user = useUser()

    return(
    <TouchableOpacity onPress={onClick}>
        <ImageBackground 
        blurRadius={2}
        style={[styles.cardContainer,style]} 
        src={ bgUrl || 'https://wallpapershome.com/images/pages/pic_h/26424.jpg'}>
            <Image source={{ uri: user?.profileImage || '' }} style={styles.cardImage} />
            <Text style={styles.cardName}>{name || user.name}</Text>
            <Text style={styles.cardTitle}>{title}</Text>
        </ImageBackground>
    </TouchableOpacity>
)};

export default Card;

const styles = StyleSheet.create({
    cardContainer: {
        width: 320,
        height: 200,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: 10,
        marginVertical: 10,
        overflow: 'hidden',
      
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
        color: "white",
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 14,
        color: 'lightgray',
    },
})