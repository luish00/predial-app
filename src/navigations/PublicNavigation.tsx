import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreenScreen } from '../components/login/LoginScreenScreen';
import { RecoveryPasswordScreen } from '../components/recoveryPassword/RecoveryPasswordScreen';

const Stack = createNativeStackNavigator();

const PublicNavigation = () => {
  return (
    <>
      <Stack.Screen
        name="Login"
        component={LoginScreenScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RecoveryPassword"
        component={RecoveryPasswordScreen}
        options={{ title: 'Recuperar contraseña' }}
      />
    </>
  );
};

export { PublicNavigation };
