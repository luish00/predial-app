import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { TabTopScreenStyleOption } from '../../navigations/navigationUtils';
import { AccountDetailsScreen } from './accountDetails/AccountDetailsScreen';
import { AccountContactsScreen } from './accountContacs/AccountContactsScreen';
import { AccountTasksScreen } from './accountTasks/AcccountTasksScreen';
import { NavigationPropBase } from '../../types';
import {
  AccountProvider,
  useProviderAccount,
} from '../../contexts/useAccountContext';

const Tab = createMaterialTopTabNavigator();

const AccountDetailsTabScreen: React.FC<NavigationPropBase> = ({ route }) => {
  const { account } = route?.params;
  const { accountFunctions } = useProviderAccount();

  useEffect(() => {
    accountFunctions.loadAccount(account);
  }, [account, accountFunctions]);

  return (
    <AccountProvider>
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
    </AccountProvider>
  );
};

export { AccountDetailsTabScreen };
