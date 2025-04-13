import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import PrimaryButton from "../../../../components/buttons/primary";
import CircularProgress from 'react-native-circular-progress-indicator';
import { Colors } from "../../../../utils/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ColdMailerResult({navigation,route}: any) {

    const result = route.params?.result

    const totalScore = result.total_score || 0
    const shortListScore = result.short_list_score
    const selectionScore = result.selection_score
    const shouldApply = result.should_apply
    const nextSteps = result.next_steps
    const strengths = result.strengths
    const weaknesses = result.weaknesses


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
                        value={totalScore}
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
                        value={shortListScore}
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
                        value={selectionScore}
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
            {
                shouldApply ?
                <Text style={{ fontSize: 16, marginBottom: 10,color:'green' }}>Yes , We suggest should apply for this role !</Text>
                :
                <Text style={{ fontSize: 16, marginBottom: 10,color:'red' }}>No , We would'nt suggest to apply for this role !</Text>
            }
           

            <Text style={{
                fontSize: 14,
                color: 'gray',
                marginBottom: 5,
                marginTop: 20,
            }}>Improvements / Next Steps </Text>
            <View>
                {
                    nextSteps.map((item: any, index: number) => {
                        return (
                            <Text key={index} style={{ fontSize: 16, marginBottom: 10 }}>{`- ${item}`}</Text>
                        )
                    })
                }
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