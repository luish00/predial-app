import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreenScreen } from '../screens/login/LoginScreenScreen';
import { RecoveryPasswordScreen } from '../screens/recoveryPassword/RecoveryPasswordScreen';

const Stack = createNativeStackNavigator();

const PublicNavigation = () => {
  return (
    <>
      <Stack.Screen name="Login" component={LoginScreenScreen} />

      <Stack.Screen
        name="RecoveryPassword"
        component={RecoveryPasswordScreen}
      />
    </>
  );
};

export { PublicNavigation };
