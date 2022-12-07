import type {
  AvailableThemesType,
  MenuExpansionType,
  TourStepType,
} from '@core/types';

export type CoreSliceType = {
  title: string;
  version: string;
  theme: AvailableThemesType;
  direction: 'ltr' | 'rtl';
  language: string;
  logoutDialogOpen: boolean;
  changePasswordDialogOpen: boolean;
  sidebarOpen: boolean;
  menuExpansion: MenuExpansionType;
  menuSelectedVoice: string;
  currentRoute: string;
  searchText: string;
  tourOpen: boolean;
  tourSteps: Array<TourStepType>;
  tourStepState: number;
  applicationLoading: boolean;
  changePasswordDialogError: string;
};
