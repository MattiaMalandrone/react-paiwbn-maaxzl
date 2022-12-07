import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import MenuStructure from '../../MenuStructure';
import { AppSettings } from '../../settings';
import { themes } from '../../theme';
import type {
  AvailableThemesType,
  MenuExpansionType,
  MenuType,
  TourStepType,
} from '../../types';
import type { CoreSliceType } from '../index';

/** Gets the theme value from LocalStorage
 *@returns {AvailableThemesType} the LocalStorage value if it's valid, otherwise returns a default theme
 */
const appTheme = (): AvailableThemesType => {
  const theme: AvailableThemesType | null = localStorage.getItem(
    'theme'
  ) as AvailableThemesType;
  if (theme && themes.includes(theme)) return theme;
  localStorage.setItem('theme', AppSettings.theme);
  return AppSettings.theme;
};

/** Gets the direction from LocalStorage
 *@returns {'ltr' | 'rtl'} the LocalStorage value if it's valid, otherwise returns a default direction 'ltr'
 */
const appDirection = (): 'ltr' | 'rtl' => {
  const direction: string | null = localStorage.getItem('direction');
  if (direction && ['ltr', 'rtl'].includes(direction))
    return direction as 'ltr' | 'rtl';
  localStorage.setItem('direction', AppSettings.direction);
  return AppSettings.direction;
};

/** Gets the direction from LocalStorage
 *@returns {string} te LocalStorage value if it's valid, otherwise returns a default language 'en'
 */
const appLanguage = (): string => {
  const language: string | null = localStorage.getItem('language');
  if (language) return language;
  localStorage.setItem('language', AppSettings.language);
  return AppSettings.language;
};

/**
 * clears the localStorage
 */
const clearSliceLocalStorage = (): void => {
  localStorage.removeItem('theme');
  localStorage.removeItem('direction');
  localStorage.removeItem('language');
  localStorage.removeItem('persist:root');
};

/**
 * Generates a recurring object with a representation of the menu structure,
 * where the expansion state of the menu is stored
 * @param {MenuType} menu - the menu structure of type {@link MenuType}
 * to be converted to a {@link MenuExpansionType}
 * @returns {MenuExpansionType} the menu structure of type {@link MenuExpansionType} with all the
 * items expanded state set to false
 */
const generateMenuExpansion = (menu: MenuType): MenuExpansionType =>
  menu.map((item) => {
    if (item.children) {
      return {
        key: item.key,
        expanded: false,
        children: generateMenuExpansion(item.children),
      };
    }
    return {
      key: item.key,
      expanded: false,
    };
  });

/**
 * Updates the expansion state of the menu items
 * @param {MenuExpansionType} menu - the menu structure of type {@link MenuExpansionType}
 * @param {string} key - the key of the menu item to be updated
 */
const updateMenu = (menu: MenuExpansionType, key: string): void => {
  if (!menu) return;
  const found = menu.find((item) => item.key === key);
  if (found) {
    found.expanded = !found.expanded;
    return;
  }
  menu.forEach((item) => {
    if (item.children) updateMenu(item.children, key);
  });
};

const initialState: CoreSliceType = {
  title: AppSettings.name,
  version: AppSettings.version,
  direction: appDirection(),
  language: appLanguage(),
  theme: appTheme(),
  logoutDialogOpen: false,
  changePasswordDialogOpen: false,
  changePasswordDialogError: '',
  sidebarOpen: AppSettings.sidebarOpen,
  menuExpansion: generateMenuExpansion(MenuStructure()),
  menuSelectedVoice: '',
  searchText: '',
  tourOpen: false,
  tourSteps: [],
  tourStepState: 0,
  currentRoute: '/app',
  applicationLoading: false,
};

export const coreSlice = createSlice({
  name: 'coreSlice',
  initialState,
  reducers: {
    /**
     * resets the core state to the initial state
     * @returns {CoreSliceType} the initial state
     */
    reset: (): CoreSliceType => initialState,
    /**
     * sets the current application Route
     * @param {CoreSliceType} state - the current state
     * @param {string} payload - the action to be performed
     */
    updateCurrentRoute: (
      state,
      { payload }: PayloadAction<`/${string}`>
    ): void => {
      state.currentRoute = payload;
    },
    /**
     * resets the state of the menu expansion
     * @param state the current state
     */
    resetMenu: (state): void => {
      state.menuExpansion = generateMenuExpansion(MenuStructure());
    },
    /**
     * sets the current selected view on the menu
     * @param state the current state
     * @param action the current app location
     */
    updateMenuSelectedVoice: (
      state,
      { payload }: PayloadAction<string>
    ): void => {
      state.menuSelectedVoice = payload;
    },
    /**
     * updates the application name
     * @param state the current state of type {@link CoreSliceType}
     * @param newAppTitle the new application name of type {@link PayloadAction<string>}
     */
    updateAppTitle: (state, { payload }: PayloadAction<string>): void => {
      state.title = payload;
    },
    /**
     * updates the application theme
     * @param state the current state of type {@link CoreSliceType}
     * @param payload the new application theme of type {@link PayloadAction<AvailableThemesType>}
     */
    updateApplicationTheme: (
      state,
      { payload }: PayloadAction<AvailableThemesType>
    ): void => {
      localStorage.setItem('theme', payload);
      state.theme = payload;
    },
    /**
     * sets the application dark mode (on/off)
     * @param state the current state of type {@link CoreSliceType}
     */
    toggleDarkMode: (_state: CoreSliceType): void => {
      return;
    },
    /**
     * updates the application sidebar width
     * @param state the current state of type {@link CoreSliceType}
     * @param payload the new application direction of type {@link PayloadAction<boolean>}
     */
    updateSideBar: (state, { payload }: PayloadAction<boolean>): void => {
      state.sidebarOpen = payload;
    },
    /**
     * changes the application direction (ltr/rtl)
     * @param state the current state of type {@link CoreSliceType}
     */
    switchDirection: (state: CoreSliceType): void => {
      const direction = state.direction === 'ltr' ? 'rtl' : 'ltr';
      localStorage.setItem('direction', direction);
      state.direction = direction;
    },
    /**
     * updates theLogout dialog open state
     * @param state the current state of type {@link CoreSliceType}
     * @param {boolean} payload the new logout dialog open state of type {@link PayloadAction<boolean>}
     */
    updateLogoutDialogState: (state, { payload }: PayloadAction<boolean>) => {
      state.logoutDialogOpen = payload;
    },
    /**
     * updates the change password dialog open state
     * @param state the current state of type {@link CoreSliceType}
     * @param {boolean} payload the new change password dialog open state of type {@link PayloadAction<boolean>}
     */
    updateChangePasswordDialogState: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.changePasswordDialogOpen = payload;
    },
    /**
     * updates the change password dialog error message
     * @param state the current state of type {@link CoreSliceType}
     * @param payload the new change password dialog error of type {@link PayloadAction<string>}
     */
    updateChangePasswordDialogError: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      state.changePasswordDialogError = payload;
    },
    /**
     * clears the application local storage
     * @param state the current state of type {@link CoreSliceType}
     */
    clearLocalStorage: (state: CoreSliceType): CoreSliceType => {
      clearSliceLocalStorage();
      return {
        ...state,
        ...initialState,
      };
    },
    /**
     *
     * @param state the current state of type {@link CoreSliceType}
     * @param {string} payload
     */
    updateMenuExpansion: (state, { payload }: PayloadAction<string>): void => {
      updateMenu(state.menuExpansion, payload);
    },
    /**
     * updates menu search text
     * @param state the current state of type {@link CoreSliceType}
     * @param {string} payload
     */
    updateSearchText: (state, { payload }: PayloadAction<string>): void => {
      state.searchText = payload;
    },
    /**
     * sets the tour state to open/close
     * @param state the current state of type {@link CoreSliceType}
     */
    toggleTour: (state): void => {
      state.tourOpen = !state.tourOpen;
    },
    /**
     * sets the tour steps array (you should change it to your own steps)
     * @param state - the current state of type {@link CoreSliceType}
     * @param {TourStepType[]} payload - the tour steps array of type {@link TourStepType TourStepType[]}
     * @example
     *  // first create your steps object in a file called TourSteps.ts (which has to be placed in the same folder of your view)
     *  const <my-view-name>TourStepsObject: { [key:string]:TourStepType } = {
     *   // here you can also import the application base toursteps and use the spread operator to add your own steps
     *   // like this: ...baseTourSteps,
     *   '<my-view-name>-tour-step-start' :{
     *    selector: '<my-view-root-component>', // the root component of your view, can be any dom selector
     *    content: '<my-step-text>',
     *   },
     *  '<my-view-name>-tour-step-<number>' :{
     *    selector: '.<my-view-name>-tour-step-<number>',
     *    content: '<my-step-text>',
     *   },
     *  '<my-view-name>-tour-step-end' :{
     *    selector: '<my-view-root-component>',
     *    content: '<my-step-text>',
     *   },
     *  }
     *  export default Object.values(<my-view-name>TourStepsObject); //creates an array of TourStepType
     *  // then import it in your view and dispatch the action
     *  import { updateTourSteps } from '<path-to-core-slice>';
     *  import <my-view-name>TourSteps from './TourSteps';
     *  //then in your function component dispatch the action
     *  const dispatch = useDispatch();
     *  useEffect(() => {
     *   dispatch(updateTourSteps(<my-view-name>TourSteps));
     *  }, []);
     *  // then inside your view you can use toggleTour() to open/close the tour like this:
     *  import { toggleTour } from '<path-to-core-slice>';
     * //then in your function component dispatch the action with an handler
     *  const dispatch = useDispatch();
     *  handle<any-name>Click = (): void => {
     *    dispatch(toggleTour());
     *  }
     */
    updateTourSteps: (
      state,
      { payload }: PayloadAction<TourStepType[]>
    ): void => {
      state.tourSteps = payload;
    },
    /**
     * sets the tour step state
     * @param state the current state of type {@link CoreSliceType}
     * @param {number} payload the tour step state (`number`)
     */
    updateTourStepState: (state, { payload }: PayloadAction<number>) => {
      state.tourStepState = payload;
    },
    /**
     * updates the application language
     * @param state the current state of type {@link CoreSliceType}
     * @param {'en' | 'it'} payload the new application language of type {@link PayloadAction<string>} (en/it)
     */
    updateApplicationLanguage: (
      state,
      { payload }: PayloadAction<'en' | 'it'>
    ) => {
      state.language = payload;
      localStorage.setItem('language', payload);
    },
    /**
     * toggles the loading animation
     * @param state the current state of type {@link CoreSliceType}
     */
    toggleApplicationLoading: (
      state,
      { payload }: PayloadAction<boolean | undefined>
    ) => {
      state.applicationLoading =
        payload !== undefined ? payload : !state.applicationLoading;
    },
  },
});

export const {
  updateAppTitle,
  updateApplicationTheme,
  toggleDarkMode,
  updateSideBar,
  switchDirection,
  clearLocalStorage,
  updateMenuExpansion,
  resetMenu,
  updateMenuSelectedVoice,
  updateSearchText,
  toggleTour,
  updateTourSteps,
  updateTourStepState,
  updateLogoutDialogState,
  updateChangePasswordDialogState,
  updateChangePasswordDialogError,
  updateApplicationLanguage,
  updateCurrentRoute,
  toggleApplicationLoading,
  reset,
} = coreSlice.actions;

export default coreSlice.reducer;
