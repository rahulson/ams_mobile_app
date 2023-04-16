import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from '../screens/Auth/Login';
import SignUp from '../screens/Auth/Signup';
import ScreenRoutesEnum from '../constants/ScreenRoutesEnum';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreenRoutesEnum.LOGIN} component={LogIn} />
      <Stack.Screen name={ScreenRoutesEnum.SIGNUP} component={SignUp} />
    </Stack.Navigator>
  );
}

export default AuthStack