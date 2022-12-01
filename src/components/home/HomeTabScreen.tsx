import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { MyAccountsScreen } from '../myAccounts/myAccount.routes';
import { MyRoutesScreen } from '../myRoutes/MyRoutesScreen';

import { TabTopScreenStyleOption } from '../../navigations/navigationUtils';
import { NavigationPropBase } from '../../types';
import { useGetAccounts } from '../myAccounts/services/useAccountService';

const Tab = createMaterialTopTabNavigator();

const HomeTabScreen: React.FC<NavigationPropBase> = () => {
  const { accounts, isLoadingAccount, refreshAccounts } = useGetAccounts();

  return (
    <>
      <Tab.Navigator
        initialRouteName="myAccounts"
        screenOptions={{
          ...TabTopScreenStyleOption,
          swipeEnabled: false,
        }}>
        <Tab.Screen name="myAccounts" options={{ title: 'Mis cuentas' }}>
          {({ navigation }) => (
            <MyAccountsScreen
              accounts={accounts}
              isLoadingAccount={isLoadingAccount}
              navigation={navigation}
              refreshAccounts={refreshAccounts}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="myRoutes" options={{ title: 'Mi ruta' }}>
          {({ navigation }) => (
            <MyRoutesScreen
              accounts={accounts}
              isLoadingAccount={isLoadingAccount}
              navigation={navigation}
              refreshAccounts={refreshAccounts}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

export const StackName: string = 'home';

export { HomeTabScreen };
