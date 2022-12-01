import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeTabScreen } from '../components/home/HomeTabScreen';
import {
  AccountDetailsTabScreen,
  TaskScreen,
} from '../components/myAccounts/myAccount.routes';

const Stack = createNativeStackNavigator();

const PrivateNavigation = () => {
  return (
    <>
      <Stack.Screen
        name="home"
        options={{ title: 'Oidem' }}
        component={HomeTabScreen}
      />

      <Stack.Screen
        name="accountDetailsTab"
        options={{ title: 'Oidem' }}
        component={AccountDetailsTabScreen}
      />

      <Stack.Screen
        name="addTaskScreen"
        options={{ title: 'Tarea en gestión' }}
        component={TaskScreen}
      />
    </>
  );
};

export { PrivateNavigation };
