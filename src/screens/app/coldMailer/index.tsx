import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '../../../utils/routes';
import { Text, TouchableOpacity } from 'react-native';
import ColdMailerForm from './form';
import ColdMailerResult from './result';

const ColdmailerStack = createStackNavigator();

function ColdmailerNavigator() {
    return (
        <ColdmailerStack.Navigator
            screenOptions={{
                headerShown: true,
                headerTitleAlign: 'center'
            }}
        >
            <ColdmailerStack.Screen name={Routes.app.coldMailer.form} component={ColdMailerForm} />
            <ColdmailerStack.Screen name={Routes.app.coldMailer.results}
                options={{
                    headerTitle: ''
                }}
                component={ColdMailerResult} />
        </ColdmailerStack.Navigator>
    );
}

export default ColdmailerNavigator;