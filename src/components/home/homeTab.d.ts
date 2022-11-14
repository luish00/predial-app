import { NavigationProp } from '@react-navigation/core';
import { AccountDetailsProp } from '../../types';

export interface HomeTabNavigationProp {
  homeNavigation: NavigationProp<any>;
  navigation?: NavigationProp<any>;
}

export interface HomeTabChildrenProps extends HomeTabNavigationProp {
  accounts: AccountDetailsProp[];
}
