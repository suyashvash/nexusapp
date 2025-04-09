import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import PrimaryButton from "../../../../components/buttons/primary";


export default function ColdMailerResult() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Result -</Text>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>Generated Emails asdas</Text>

            <PrimaryButton
                title="Copy to Clipboard"
                onPress={() => { }}
                style={{ marginTop: 20 }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',

    },
})