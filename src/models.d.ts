import { AccountDetailsProp, ContactProp, UserProp } from './types';

export interface LoginRequest {
  UserName: string;
  Password: string;
}

export interface LoginResponse extends UserProp {}

export interface AccountsGetResponse extends AccountDetailsProp {}

export interface ContactAccountResponse extends ContactProp {}

export interface CreateContactPayload extends ContactProp {}
