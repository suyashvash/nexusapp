import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppTextInput from "../../../../components/input/textinput";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PrimaryButton from "../../../../components/buttons/primary";
import { Routes } from "../../../../utils/routes";

export default function ScoreForm({ navigation }: any) {

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
            <AppTextInput
                label="Enter Job Description"
                placeholder="React Native Developer..."
                type="paragraph"
            />

            <Text
                style={{
                    fontSize: 14,
                    // position: 'absolute',
                    // top: -10,
                    color: 'black',
                    fontWeight: 'semibold',
                    // marginLeft: 10,
                    backgroundColor: 'white',
                    // paddingHorizontal: 10,
                    marginBottom: 5,
                    marginTop: 20,
                }}>
                Select Profile
            </Text>
            <View style={{
                width: '100%',

            }}>
                <TouchableOpacity style={styles.profileButton}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome5 name="user-circle" size={20} color="grey" />
                        <Text style={{ marginLeft: 10, fontSize: 16, color: 'grey' }}>React Native Developer</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.profileButton, { backgroundColor: 'whitesmoke' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome5 name="user-circle" size={20} color="black" />
                        <Text style={{ marginLeft: 10, fontSize: 16, color: 'black' }}>React Native Developer</Text>
                    </View>
                    <MaterialIcons name="check" size={20} color="black" />
                </TouchableOpacity>

            </View>

            <AppTextInput
                label="Notes ( If any )"
                placeholder="I have some notes..."
                type="paragraph"
            />

            <PrimaryButton
                title='Analyze'
                style={{ marginTop: 30 }}
                onPress={() => {
                    navigation.navigate(Routes.app.analysis.results)
                }} />


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',

    },
    profileButton: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        padding: 10,
        paddingVertical: 15,
        marginVertical: 5,
    }
})