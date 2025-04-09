import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '../../../utils/routes';
import { Text, TouchableOpacity } from 'react-native';
import ScoreForm from './form';
import ColdMailerResult from './result';

const ScoreStack = createStackNavigator();

function ScoreNavigator() {
    return (
        <ScoreStack.Navigator
            screenOptions={{
                headerShown: true,
                headerTitleAlign: 'center'
            }}
        >
            <ScoreStack.Screen name={Routes.app.analysis.form} component={ScoreForm} />
            <ScoreStack.Screen name={Routes.app.analysis.results}
                options={{
                    headerTitle: ''
                }}
                component={ColdMailerResult} />
        </ScoreStack.Navigator>
    );
}

export default ScoreNavigator;