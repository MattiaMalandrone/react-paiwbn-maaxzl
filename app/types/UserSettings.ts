import { uuid } from 'uuidv4';
export type UserSettingsType = {
  userId: typeof uuid;
  csvColumnDelimiter: string;
  cultureName: string;
  languageId: number;
  languageName: string;
  automaticDataLoad: boolean;
  decimalDigits: number;
};
