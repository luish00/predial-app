import React, { PropsWithChildren } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { MyAccountsScreen } from '../myAccounts/MyAccountsScreen';
import { MyRoutesScreen } from '../myRoutes/MyRoutesScreen';
import { TabTopScreenStyleOption } from '../../navigations/navigationUtils';

const Tab = createMaterialTopTabNavigator();

const HomeScreen: React.FC<PropsWithChildren> = () => (
  <Tab.Navigator
    initialRouteName="myAccounts"
    screenOptions={{
      ...TabTopScreenStyleOption,
    }}>
    <Tab.Screen
      name="myAccounts"
      options={{ title: 'Mis cuentas' }}
      component={MyAccountsScreen}
    />

    <Tab.Screen
      name="myRoutes"
      options={{ title: 'Mi ruta' }}
      component={MyRoutesScreen}
    />
  </Tab.Navigator>
);

export const StackName: string = 'home';

export { HomeScreen };
