import { NavigationProp, RouteProp } from '@react-navigation/native';

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
  Id: number;
  AccountNumber: string;
  FirstName: string;
  MiddleName?: string;
  LastName: string;
  Street?: string;
  PostalCode?: string;
  City?: string;
  State?: string;
  Country?: number;
  Latitud?: number;
  Longitud?: string;
  Amount?: number;
  Phone?: string;
  Mobile?: string;
  Email?: string;
  Assigned2UserId?: number;
}

export interface AttachmentProp {
  Name: string;
  Type: string;
  ParentId: string;
  AccountId: string;
  Body: string;
}

export interface ContactProp {
  Id: int; // add to backend
  IsOwner: boolean;
  Name?: string;
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
  Id: number;
  IsActive: boolean;
  FirstName: string;
  Address: string;
  MiddleName?: string;
  LastName?: string;
  UserName: string;
  Address?: string;
  Phone?: string;
  Mobile?: string;
  Email?: string;
  access_token: string;
}

export interface TaskProp {
  PersonalNotification: boolean;
  InstructionNotification: boolean;
  PaymentPromise: string;
  Phone?: string;
  Name?: string; // no back
  Mobile?: string;
  Email?: string;
  AccountId: string;
  ContactId: string;
}

type TaskListStatusType = 1 | 2 | 3;
// no existe en back aun
export interface TaskListProps {
  id: string;
  date: string;
  isComplete: boolean;
  type: TaskListStatusType;
}
