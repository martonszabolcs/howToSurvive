import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Index from './screen/Index';
import Intro from './screen/Intro';
import Die from './screen/Die';
import Chooser from './screen/Chooser';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index" headerMode="none">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
