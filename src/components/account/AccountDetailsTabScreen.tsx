import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { TabTopScreenStyleOption } from '../../navigations/navigationUtils';
import { AcccountDetailsScreen } from './accountDetails/AcccountDetailsScreen';
import { AccountContactsScreen } from './accountContacs/AccountContactsScreen';
import { AcccountTasksScreen } from './accountTasks/AcccountTasksScreen';

const Tab = createMaterialTopTabNavigator();

const AccountDetailsTabScreen: React.FC = () => (
  <Tab.Navigator
    initialRouteName="accountDetails"
    screenOptions={{
      ...TabTopScreenStyleOption,
    }}>
    <Tab.Screen
      name="accountDetails"
      options={{ title: 'Detalle' }}
      component={AcccountDetailsScreen}
    />

    <Tab.Screen
      name="accountContacts"
      options={{ title: 'Contactos' }}
      component={AccountContactsScreen}
    />

    <Tab.Screen
      name="accountTask"
      options={{ title: 'Tareas' }}
      component={AcccountTasksScreen}
    />
  </Tab.Navigator>
);

export { AccountDetailsTabScreen };
