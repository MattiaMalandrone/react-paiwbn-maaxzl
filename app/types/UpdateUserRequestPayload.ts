import { UserSettingsType } from './UserSettings';
import { PickPartial } from '.';

export type UpdateUserRequestPayloadType = {
  settings: PickPartial<
    UserSettingsType,
    'cultureName' | 'languageName' | 'decimalDigits' | 'automaticDataLoad'
  >;
};
