import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import PrimaryButton from "../../../../components/buttons/primary";
import CircularProgress from 'react-native-circular-progress-indicator';

export default function ColdMailerResult() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                    paddingVertical: 10,
                }}
            >

                <View style={{ alignItems: 'center' }}>
                    <CircularProgress
                        value={60}
                        radius={30}
                        duration={2000}
                        progressValueColor={'black'}
                        valueSuffix="%"
                        maxValue={100}
                        activeStrokeWidth={5}
                        inActiveStrokeWidth={5}
                        inActiveStrokeColor={'#ecf0f1'}
                    // titleColor={'red'}
                    // titleStyle={{ fontWeight: 'bold' }}
                    />
                    <Text style={{
                        fontSize: 14,
                        color: 'gray',
                        marginBottom: 4,
                        marginTop: 10,
                    }}>Total Score</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <CircularProgress
                        value={60}
                        radius={30}
                        duration={2000}
                        progressValueColor={'black'}
                        valueSuffix="%"
                        maxValue={100}
                        activeStrokeWidth={5}
                        inActiveStrokeWidth={5}
                        inActiveStrokeColor={'#ecf0f1'}
                    />
                    <Text style={{
                        fontSize: 14,
                        color: 'gray',
                        marginBottom: 4,
                        marginTop: 10,
                    }}>Shortlist Score</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <CircularProgress
                        value={60}
                        radius={30}
                        duration={2000}
                        progressValueColor={'black'}
                        valueSuffix="%"
                        maxValue={100}
                        activeStrokeWidth={5}
                        inActiveStrokeWidth={5}
                        inActiveStrokeColor={'#ecf0f1'}
                    />
                    <Text style={{
                        fontSize: 14,
                        color: 'gray',
                        marginBottom: 4,
                        marginTop: 10,
                    }}>Selection Score</Text>
                </View>


            </View>

            <Text style={{
                fontSize: 14,
                color: 'gray',
                marginBottom: 4,
            }}>Should Apply ?</Text>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>Yes , We suggest should apply for this role !</Text>

            <Text style={{
                fontSize: 14,
                color: 'gray',
                marginBottom: 5,
                marginTop: 20,
            }}>Improvements / Next Steps </Text>
            <View>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>-  Add more details about your experience</Text>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>- Add more details about your projects</Text>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>- Add more details about your skills</Text>
            </View>

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