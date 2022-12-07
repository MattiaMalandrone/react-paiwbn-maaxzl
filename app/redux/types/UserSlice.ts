import { CultureType } from './../../types/Culture';
import { RoleType, UserType } from '@core/types';

export type UserSliceType = {
  isAuthenticated: boolean;
  authStatus: 'authenticated' | 'unauthenticated';
  notifyStatus: 'notify' | 'no-notify';
  user: undefined | UserType;
  userClaims: string[];
  userRoles: Array<RoleType>;
  csvColumDelimiters: Array<string>;
  cultures: Array<CultureType>;
};
