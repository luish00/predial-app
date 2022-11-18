import { UserProp } from '../../../types';

export interface LoginRequest {
  UserName: string;
  Password: string;
}

export interface LoginResponse extends UserProp {}
