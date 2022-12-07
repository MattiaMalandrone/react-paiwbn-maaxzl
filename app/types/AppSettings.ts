import { AvailableThemesType } from '.';
export type AppSettingsType = {
  name: string;
  version: string;
  theme: AvailableThemesType;
  sidebarOpen: boolean;
  direction: 'ltr' | 'rtl';
  language: 'en' | 'it';
};
