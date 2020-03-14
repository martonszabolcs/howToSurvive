import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Index from './screen/Index';
import Intro from './screen/Intro';
import Die from './screen/Die';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" headerMode="none">
        <Stack.Screen
          options={{animationEnabled: false}}
          name="Index"
          component={Index}
        />
        <Stack.Screen
          options={{animationEnabled: false}}
          name="Intro"
          component={Intro}
        />
        <Stack.Screen
          options={{animationEnabled: false}}
          name="Die"
          component={Die}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
