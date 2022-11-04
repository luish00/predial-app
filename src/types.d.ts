import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

export interface AccountType {
  id: string;
  name: string;
  address: string;
}

export interface NavigationPropBase {
  navigation: NavigationProp<any>;
  route?: RouteProp;
}

export interface AccountDetailsProp {
  AccountNumber: string;
  FirstName: string;
  MiddleName?: string;
  LastName: string;
  Street?: string;
  PostalCode?: string;
  City?: string;
  State?: string;
  Country?: string;
  Latitud?: string;
  Longitud?: string;
  Amount?: number;
  Phone?: string;
  Mobile?: string;
  Email?: string;
  Assigned2UserId?: string;
}

export interface AttachmentProp {
  Name: string;
  Type: string;
  ParentId: string;
  AccountId: string;
  Body: string;
}

export interface ContactProp {
  IsOwner: boolean;
  Name: string;
  Relationship: string;
  FirstName: string;
  MiddleName?: string;
  LastName?: string;
  Phone?: string;
  Mobile?: string;
  Email?: string;
  AccountId: string;
}

export interface UserProp {
  IsActive: boolean;
  FirstName: string;
  MiddleName?: string;
  LastName?: string;
  UserName: string;
  Address?: string;
  Phone?: string;
  Mobile?: string;
  Email?: string;
  // Password?: string;
}

export interface TaskProp {
  PersonalNotification: string;
  InstructionNotification: string;
  PaymentPromise: string;
  Phone?: string;
  Mobile?: string;
  Email?: string;
  AccountId: string;
  ContactId: string;
}
