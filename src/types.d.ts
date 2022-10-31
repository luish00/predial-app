import { NavigationProp } from '@react-navigation/native';

export interface AccountType {
  id: string;
  name: string;
  address: string;
}

export interface NavigationPropBase {
  navigation: NavigationProp<any>;
}