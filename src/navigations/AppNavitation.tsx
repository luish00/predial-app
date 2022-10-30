import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PrivateNavigation } from './PrivateNavigation';
import { PublicNavigation } from './PublicNavigation';

import { useAuthContext } from '../contexts/useAuthContext';

const Stack = createNativeStackNavigator();

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const AppNavitation = () => {
  const {
    authState: { userToken },
  } = useAuthContext();

  return (
    <NavigationContainer theme={defaultTheme}>
      <Stack.Navigator>
        <>{userToken ? PrivateNavigation() : PublicNavigation()}</>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { AppNavitation };
