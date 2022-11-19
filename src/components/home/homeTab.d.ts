import { NavigationProp } from '@react-navigation/core';
import { AccountDetailsProp } from '../../types';

export interface HomeTabNavigationProp {
  navigation: NavigationProp<any>;
  accounts: AccountDetailsProp[];
  isLoadingAccount: boolean;
  refreshAccounts: () => void;
}
