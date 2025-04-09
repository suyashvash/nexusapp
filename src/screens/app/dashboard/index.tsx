import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '../../../utils/routes';
import DashboardScreen from './landing';
import CreateCardScreen from './card/create';
import { Text, TouchableOpacity } from 'react-native';

const DashboardStack = createStackNavigator();

function DashboardNavigator() {
    return (
        <DashboardStack.Navigator
            screenOptions={{
                headerShown: true
            }}
        >
            <DashboardStack.Screen
                name={Routes.app.dashboard.overview}
                options={({ navigation }) => ({
                    headerTitle: 'Dashboard',
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ marginRight: 10 }}
                            onPress={() => navigation.navigate(Routes.app.dashboard.card.create)}>
                            <Text style={{ fontSize: 32 }}>+</Text>
                        </TouchableOpacity>
                    ),
                })}
                component={DashboardScreen} />
            <DashboardStack.Screen name={Routes.app.dashboard.card.create} component={CreateCardScreen} />
        </DashboardStack.Navigator>
    );
}

export default DashboardNavigator;