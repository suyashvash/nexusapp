import React from "react";
import { Text, View, StyleSheet, ScrollView, Alert } from "react-native";
import PrimaryButton from "../../../../components/buttons/primary";
import Clipboard from '@react-native-clipboard/clipboard';

export default function ColdMailerResult({ route }) {

    const result = route.params.result

    const getEmailData = () => {
        return `${result.greeting}

${result.intro_paragraph}

${result.skills_alignment}

${result.value_proposition}

${result.relevant_experience}

${result.call_to_action}

${result.closing}
        `
    }

    const onCopyToClipboard = () => {
        Clipboard.setString(getEmailData())
        Alert.alert('AI Cold Mailer', 'Email copied to clipboard')
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
            <Text style={{
                fontSize: 14,
                color: 'gray',
                marginBottom: 5,
                marginTop: 0,
            }}>Subject</Text>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>{result.subject_line}</Text>

            <Text style={{
                fontSize: 14,
                color: 'gray',
                marginBottom: 5,
                marginTop: 20,
            }}>Body</Text>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>{getEmailData()}</Text>

            <PrimaryButton
                title="Copy to Clipboard"
                onPress={onCopyToClipboard}
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