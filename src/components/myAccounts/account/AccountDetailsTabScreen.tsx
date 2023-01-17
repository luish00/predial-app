import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute } from '@react-navigation/native';

import { TabTopScreenStyleOption } from '../../../navigations/navigationUtils';
import { AccountDetailsScreen } from './accountDetails/AccountDetailsScreen';
import { AccountContactsScreen } from './accountContacts';
import { AccountTasksScreen } from './accountTasks';
import { ContactProp, NavigationPropBase } from '../../../types';
import {
  loadContacts,
  loadAccount,
} from '../../../redux/slices/accountDetailsSlice';

import { useGetAccountContacts } from '../../../services';
import { useAppDispatch } from '../../../hooks';

const Tab = createMaterialTopTabNavigator();

const AccountDetailsTabScreen: React.FC<NavigationPropBase> = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();

  const { account } = route?.params;

  useGetAccountContacts({ id: account.Id });

  useEffect(() => {
    dispatch(loadAccount(account));
  }, [account, dispatch]);

  useEffect(
    () => () => {
      dispatch(loadContacts([] as ContactProp[]));
    },
    [dispatch],
  );

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
        component={AccountContactsScreen}
        name="accountContacts"
        options={{ title: 'Contactos' }}
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
