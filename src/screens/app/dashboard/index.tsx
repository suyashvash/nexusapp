import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '../../../utils/routes';
import OverviewScreen from './overview';
import { CreateCardScreen,CardDetailScreen } from './card';
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
                component={OverviewScreen} />
            <DashboardStack.Screen name={Routes.app.dashboard.card.create} component={CreateCardScreen} />
            <DashboardStack.Screen 
            name={Routes.app.dashboard.card.detail} 
            options={{
                headerTitle:''
            }}
            
            component={CardDetailScreen} />
        </DashboardStack.Navigator>
    );
}

export default DashboardNavigator;