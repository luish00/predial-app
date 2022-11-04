import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute } from '@react-navigation/native';

import { TabTopScreenStyleOption } from '../../navigations/navigationUtils';
import { AccountDetailsScreen } from './accountDetails/AccountDetailsScreen';
import { AccountContactsScreen } from './accountContacs/AccountContactsScreen';
import { AccountTasksScreen } from './accountTasks/AcccountTasksScreen';
import { NavigationPropBase } from '../../types';
import {
  AccountProvider,
  useAccountContext,
} from '../../contexts/useAccountContext';

const Tab = createMaterialTopTabNavigator();

const AccountDetailsTabWrapperScreen: React.FC<NavigationPropBase> = () => (
  <AccountProvider>
    <AccountDetailsTabScreen />
  </AccountProvider>
);

const AccountDetailsTabScreen: React.FC = () => {
  const route = useRoute();

  const { account } = route?.params;
  const { accountFunctions } = useAccountContext();

  useEffect(() => {
    accountFunctions.loadAccount(account);
  }, [account, accountFunctions]);

  return (
    <Tab.Navigator
      initialRouteName="accountDetails"
      screenOptions={{
        ...TabTopScreenStyleOption,
      }}>
      <Tab.Screen
        name="accountDetails"
        options={{ title: 'Detalle' }}
        component={AccountDetailsScreen}
      />

      <Tab.Screen
        name="accountContacts"
        options={{ title: 'Contactos' }}
        component={AccountContactsScreen}
      />

      <Tab.Screen
        name="accountTask"
        options={{ title: 'Tareas' }}
        component={AccountTasksScreen}
      />
    </Tab.Navigator>
  );
};

export { AccountDetailsTabWrapperScreen as AccountDetailsTabScreen };
