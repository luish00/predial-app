import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { MyAccountsScreen } from '../myAccounts/MyAccountsScreen';
import { MyRoutesScreen } from '../myRoutes/MyRoutesScreen';
import { TabTopScreenStyleOption } from '../../navigations/navigationUtils';
import { AccountDetailsProp, NavigationPropBase } from '../../types';

const Tab = createMaterialTopTabNavigator();

const DATA_DUMMY: AccountDetailsProp[] = [
  {
    AccountNumber: '013',
    FirstName: 'Juanito',
    LastName: 'Perez',
    Street: 'Calle 1',
    State: 'Culicán',
  },
  {
    AccountNumber: '023',
    FirstName: 'Maria',
    MiddleName: 'la del barrio',
    LastName: 'Ochoa',
    Street: 'Calle 2',
    State: 'Culicán',
    PostalCode: '80450',
  },
  {
    AccountNumber: '03',
    FirstName: 'Checo',
    MiddleName: 'del barrio',
    LastName: 'Perez',
    Street: 'Calle 3',
    State: 'Navolato',
    PostalCode: '80450',
  },
  {
    AccountNumber: '042',
    FirstName: 'Jose',
    MiddleName: 'Mario',
    LastName: 'Medina',
    Street: 'Calle 4',
    State: 'Culicán',
    PostalCode: '80450',
  },
];

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
