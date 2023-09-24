import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './screens/Home';
import Onboarding from './screens/Onboarding';
import Registration from './screens/Registration';
import Dashboard from './screens/Dashboard';
import CreateGiveAway from './screens/CreateGiveAway';
import SplashScreen from './screens/SplashScreen';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'SplashScreen'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CreateGiveAway" component={CreateGiveAway} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
