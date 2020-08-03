import React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from './pages/Home';
import Insert from './pages/Insert';

const Tab = createBottomTabNavigator();

export default () => {

  return (
    
      <Tab.Navigator>
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => <MaterialIcons name="home" size={30} color={color} />
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => <MaterialIcons name="add" size={30} color={color} />
          }}
          name="Insert"
          component={Insert}
        />
      </Tab.Navigator>
    
  );
}