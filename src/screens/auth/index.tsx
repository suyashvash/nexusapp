import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '../../utils/routes';

import LoginScreen from './login';
import SignupScreen from './signup';

const AuthStack = createStackNavigator();

function AuthNavigator() {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <AuthStack.Screen name={Routes.auth.login} component={LoginScreen} />
            <AuthStack.Screen name={Routes.auth.register} component={SignupScreen} />
        </AuthStack.Navigator>
    );
}

export default AuthNavigator;