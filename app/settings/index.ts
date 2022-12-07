import { AppSettingsType } from '../types';

export const RouterSettings = {
  baseName: `/${process.env['REACT_APP_NAME']}/`,
  rootPath: '/',
  defaultRedirect: '/login',
};

export const AppSettings: AppSettingsType = {
  name: 'ORS Skeleton',
  version: '1.0.0',
  theme: 'orsTheme',
  direction: 'ltr',
  sidebarOpen: false,
  language: 'en',
};
