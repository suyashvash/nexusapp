import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { Routes } from '../../utils/routes';
import SignupScreen from '../auth/signup';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './dashboard';
import CreateCardScreen from './create';
import CardDetailScreen from './view';

const Drawer = createStackNavigator();


export default function DrawerNavigator() {

    return (
        <Drawer.Navigator initialRouteName={Routes.app.dashboard}>
            <Drawer.Screen name={Routes.app.dashboard} component={DashboardScreen}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <TouchableOpacity 
                        style={{marginRight:10}}
                        onPress={() => navigation.navigate(Routes.app.createCard)}>
                            <Text style={{fontSize:32}}>+</Text>
                        </TouchableOpacity>
                    ),
                })}

            />
            <Drawer.Screen name={Routes.app.createCard} component={CreateCardScreen} />
            <Drawer.Screen name={Routes.app.cardDetails} component={CardDetailScreen} />
        </Drawer.Navigator>

    )

}