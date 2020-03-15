import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Index from './screen/Index';
import Intro from './screen/Intro';
import Die from './screen/Die';
import Chooser from './screen/Chooser';
import Paper from './screen/Paper';
import Plane from './screen/Plane';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Chooser" headerMode="none">
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
        <Stack.Screen
          options={{animationEnabled: false}}
          name="Chooser"
          component={Chooser}
        />
        <Stack.Screen
          options={{animationEnabled: false}}
          name="Paper"
          component={Paper}
        />
        <Stack.Screen
          options={{animationEnabled: false}}
          name="Plane"
          component={Plane}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
