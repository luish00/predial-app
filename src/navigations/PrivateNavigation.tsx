import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../components/home/HomeScreen';

const Stack = createNativeStackNavigator();

const PrivateNavigation = () => {
  return (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
    </>
  );
};

export { PrivateNavigation };
