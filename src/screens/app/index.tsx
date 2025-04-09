import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { Routes } from '../../utils/routes';
import SignupScreen from '../auth/signup';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './dashboard/landing';
import CreateCardScreen from './dashboard/card/create';
import CardDetailScreen from './view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../../utils/colors';
import DashboardNavigator from './dashboard';

const Tab = createBottomTabNavigator();

export default function MainApp() {
    return (
        <Tab.Navigator
            initialRouteName={Routes.app.dashboard.tag}
            screenOptions={
                {
                    tabBarActiveTintColor: Colors.primary,
                    tabBarInactiveTintColor: 'lightgrey',
                    tabBarStyle: {
                        height: 50,
                    },
                    tabBarShowLabel: false,
                    headerShown: false,
                }
            }
        >
            <Tab.Screen
                name={Routes.app.dashboard.tag} component={DashboardNavigator}
                options={({ navigation }) => ({
                    headerTitle: 'Dashboard',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                 
                })}

            />

            <Tab.Screen
                name={Routes.app.coldMailer.tag} component={DashboardScreen}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="mail" color={color} size={size} />
                    ),
                })}

            />
        </Tab.Navigator>
    );
}

