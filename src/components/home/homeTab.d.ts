import { NavigationProp } from '@react-navigation/core';
import { AccountDetailsProp } from '../../types';

export interface HomeTabChildrenProps {
  homeNavigation: NavigationProp<any>;
  accounts: AccountDetailsProp[];
}
