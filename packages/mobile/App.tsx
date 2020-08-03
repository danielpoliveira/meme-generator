import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import { StatusBar } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Routes from './src/routes';

import Meme from './src/pages/Meme';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.20)" />
      <Routes />
    </>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="PrimaryTabs" component={App} />
        <Stack.Screen name="Meme" component={Meme} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}