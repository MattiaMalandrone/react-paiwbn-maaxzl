import { uuid } from 'uuidv4';
import { RoleType } from '.';
import { UserSettingsType } from '.';
export type UserType = {
  id: typeof uuid;
  name: string;
  mail: string;
  active: boolean;
  roles: RoleType[];
  settings: UserSettingsType;
};
