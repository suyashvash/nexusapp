import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './auth';
import { Routes } from '../utils/routes';
import MainApp from './app';
import { useIsLoggedIn } from '../redux/useStore';

const AppStack = createStackNavigator();

function AppNavigator() {

  const isLoggedIn = useIsLoggedIn()

  return (
    <AppStack.Navigator
      initialRouteName={isLoggedIn ? Routes.app.tag : Routes.auth.tag}
      screenOptions={{
        headerShown: false
      }}>
      <AppStack.Screen name={Routes.auth.tag} component={AuthNavigator} />
      <AppStack.Screen name={Routes.app.tag} component={MainApp} />
    </AppStack.Navigator >
  );
}

export default AppNavigator;