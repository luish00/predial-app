import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { MyAccountsScreen } from '../myAccounts/MyAccountsScreen';
import { MyRoutesScreen } from '../myRoutes/MyRoutesScreen';
import { TabTopScreenStyleOption } from '../../navigations/navigationUtils';
import { NavigationPropBase } from '../../types';

const Tab = createMaterialTopTabNavigator();

const HomeTabScreen: React.FC<NavigationPropBase> = ({ navigation }) => {
  const MyAccountWraper: React.FC = () => {
    return <MyAccountsScreen tabNavigation={navigation} />;
  };

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
          component={MyRoutesScreen}
        />
      </Tab.Navigator>
    </>
  )
};

export const StackName: string = 'home';

export { HomeTabScreen };
