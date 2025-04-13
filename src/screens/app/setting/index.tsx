import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../../../components/buttons/primary';
import useUser from '../../../redux/useStore';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../redux/slices/userSlice';
import { Routes } from '../../../utils/routes';

const ProfileScreen = ({ navigation }) => {
    const user = useUser()

    const dispatch = useDispatch()

    const handleLogout = async () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    onPress: async () => {
                        dispatch(clearUser())
                        navigation.replace(Routes.auth.tag)
                    }
                }
            ]
        );
    };

    if(!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: user.profileImage }}
                style={styles.profileImage}
            />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>


            <PrimaryButton
                title="Logout"
                onPress={handleLogout}
                style={{ marginTop: 50 }}
            // textStyle={styles.logoutText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    profileSection: {
        alignItems: 'center',
        marginVertical: 30,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
    settingsSection: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 30,
    },
    settingItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    settingText: {
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#ff3b30',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;