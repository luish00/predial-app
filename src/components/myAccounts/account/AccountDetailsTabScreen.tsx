import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute } from '@react-navigation/native';

import { TabTopScreenStyleOption } from '../../../navigations/navigationUtils';
import { AccountDetailsScreen } from './accountDetails/AccountDetailsScreen';
import { AccountContactsScreen } from './accountContacts';
import { AccountTasksScreen } from './accountTasks';
import { NavigationPropBase } from '../../../types';
import {
  loadAccount,
  loadContacts,
} from '../../../redux/slices/accountDetailsSlice';

import { useGetAccountContacts } from '../services/useAccountService';
import { useAppDispatch } from '../../../hooks';

const Tab = createMaterialTopTabNavigator();

const AccountDetailsTabScreen: React.FC<NavigationPropBase> = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();

  const { account } = route?.params;

  const { contacts } = useGetAccountContacts(account.Id);

  useEffect(() => {
    dispatch(loadContacts(contacts));
  }, [contacts, dispatch]);

  useEffect(() => {
    dispatch(loadAccount(account));
  }, [account, dispatch]);

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

export { AccountDetailsTabScreen };
