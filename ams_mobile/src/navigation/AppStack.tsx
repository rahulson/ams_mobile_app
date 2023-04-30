import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import ScreenRoutesEnum from '../constants/ScreenRoutesEnum';

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreenRoutesEnum.HOME} component={Home} />
    </Stack.Navigator>
  );
}

export default AppStack