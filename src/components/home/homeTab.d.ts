import { NavigationProp } from '@react-navigation/core';
import { AccountDetailsProp } from '../../types';

export interface HomeTabChildernProps {
  homeNavigation: NavigationProp<any>;
  accounts: AccountDetailsProp[];
}
