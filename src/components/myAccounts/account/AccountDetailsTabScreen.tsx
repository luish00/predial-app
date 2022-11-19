import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute } from '@react-navigation/native';

import { TabTopScreenStyleOption } from '../../../navigations/navigationUtils';
import { AccountDetailsScreen } from './accountDetails/AccountDetailsScreen';
import { AccountContactsScreen } from './accountContacs';
import { AccountTasksScreen } from './accountTasks';
import { NavigationPropBase } from '../../../types';
import {
  AccountProvider,
  useAccountContext,
} from '../../../contexts/useAccountContext';

import { useAccountContacts } from '../services/useAccountService';

const Tab = createMaterialTopTabNavigator();

const AccountDetailsTabWrapperScreen: React.FC<NavigationPropBase> = props => (
  <AccountProvider>
    <AccountDetailsTabScreen {...props} />
  </AccountProvider>
);

const AccountDetailsTabScreen: React.FC<NavigationPropBase> = ({
  navigation,
}) => {
  const route = useRoute();

  const { account } = route?.params;
  const { accountFunctions } = useAccountContext();

  const { contacts, isLoading } = useAccountContacts(account.Id);

  const AccountTaskScreenWrapper: React.FC = () => (
    <AccountTasksScreen homeNavigation={navigation} />
  );

  useEffect(() => {
    accountFunctions.loadContacts(contacts);
  }, [accountFunctions, contacts]);

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
        component={AccountTaskScreenWrapper}
      />
    </Tab.Navigator>
  );
};

export { AccountDetailsTabWrapperScreen as AccountDetailsTabScreen };
