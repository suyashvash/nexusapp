import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './auth';
import { Routes } from '../utils/routes';

const AppStack = createStackNavigator();

function AppNavigator() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <AppStack.Screen name={Routes.auth.tag} component={AuthNavigator} />
    </AppStack.Navigator >
  );
}

export default AppNavigator;