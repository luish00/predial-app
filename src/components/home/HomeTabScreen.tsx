import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { MyAccountsScreen } from '../myAccounts/MyAccountsScreen';
import { MyRoutesScreen } from '../myRoutes/MyRoutesScreen';
import { TabTopScreenStyleOption } from '../../navigations/navigationUtils';
import {
  AccountDetailsProp,
  ContactProp,
  NavigationPropBase,
} from '../../types';
import { DATA_DUMMY } from '../../data_dummy/accounts';

const Tab = createMaterialTopTabNavigator();

const HomeTabScreen: React.FC<NavigationPropBase> = ({ navigation }) => {
  const [accounts, setAccounts] = useState<AccountDetailsProp[]>([]);

  const MyAccountWraper: React.FC = () => {
    return <MyAccountsScreen accounts={accounts} homeNavigation={navigation} />;
  };

  const MyRoutesWrapper: React.FC = () => {
    return <MyRoutesScreen accounts={accounts} homeNavigation={navigation} />;
  };

  useEffect(() => {
    setAccounts(DATA_DUMMY);
  }, []);

  return (
    <>
      <Tab.Navigator
        initialRouteName="myAccounts"
        screenOptions={{
          ...TabTopScreenStyleOption,
        }}>
        <Tab.Screen
          name="myAccounts"
          options={{ title: 'Mis cuentas' }}
          component={MyAccountWraper}
        />

        <Tab.Screen
          name="myRoutes"
          options={{ title: 'Mi ruta' }}
          component={MyRoutesWrapper}
        />
      </Tab.Navigator>
    </>
  );
};

export const StackName: string = 'home';

export { HomeTabScreen };
