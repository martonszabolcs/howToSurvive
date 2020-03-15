import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Index from './screen/Index';
import Intro from './screen/Intro';
import Die from './screen/Die';
import Chooser from './screen/Chooser';
import Paper from './screen/Paper';
import Plane from './screen/Plane';
import Home from './screen/Home';
import Win from './screen/Win';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Chooser" cardStyle = { {opacity: 1} } headerMode="none">
        <Stack.Screen
          options={{animationEnabled: false, disableBack: true}}
          name="Index"
          component={Index}
        />
        <Stack.Screen
          options={{animationEnabled: false, disableBack: true}}
          name="Intro"
          component={Intro}
        />
        <Stack.Screen
          options={{animationEnabled: false, disableBack: true}}
          name="Die"
          component={Die}
        />
        <Stack.Screen
          options={{animationEnabled: false, disableBack: true}}
          name="Chooser"
          component={Chooser}
        />
        <Stack.Screen
          options={{animationEnabled: false, disableBack: true}}
          name="Paper"
          component={Paper}
        />
        <Stack.Screen
          options={{animationEnabled: false, disableBack: true}}
          name="Plane"
          component={Plane}
        />
        <Stack.Screen
          options={{animationEnabled: false}}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{animationEnabled: false}}
          name="Win"
          component={Win}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
