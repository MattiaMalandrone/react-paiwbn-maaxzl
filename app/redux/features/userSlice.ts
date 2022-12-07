import { accountApi, userApi } from '../../services';
import { UserLoginResponseType, UserType } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserSliceType } from '../index';

const initialState: UserSliceType = {
  isAuthenticated: false,
  authStatus: 'unauthenticated',
  notifyStatus: 'no-notify',
  user: undefined,
  userClaims: [],
  userRoles: [],
  csvColumDelimiters: [],
  cultures: [],
};

/**
 * checks whether the login has succeeded or not, and if so sets the user authStatus to 'authenticated'
 * @param state the current state of the user slice
 * @param action the action of type {@link PayloadAction<UserLoginResponseType>}
 */
const loginAuthenticated = (
  state: UserSliceType,
  action: PayloadAction<UserLoginResponseType>
): void => {
  if (!action.payload.success) return;
  state.authStatus = 'authenticated';
  state.isAuthenticated = true;
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    /**
     * resets the user state to the initial state
     * @returns {UserSliceType} the initial state
     */
    reset: (): UserSliceType => initialState,
    /**
     * sets the user state to authenticated
     * @param state the current state of type {@link UserSliceType}
     * @param payload the user object of type {@link PayloadAction<UserType>}
     */
    setCurrentUser: (state, { payload }: PayloadAction<UserType>): void => {
      if (state.authStatus === 'unauthenticated') return;
      state.user = payload;
    },
    /**
     * sets the notify status
     * @param state the current state of type {@link UserSliceType}
     * @param payload the user object of type {@link PayloadAction<'notify' | 'no-notify'>}
     */
    setNotifyStatus: (
      state,
      { payload }: PayloadAction<'notify' | 'no-notify'>
    ): void => {
      state.notifyStatus = payload;
    },
    /**
     * clears the user state
     * @param state the current state of type {@link UserSliceType}
     */
    clearUserState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      accountApi.endpoints.login.matchFulfilled,
      loginAuthenticated
    );
    builder.addMatcher(
      accountApi.endpoints.tokenLogin.matchFulfilled,
      loginAuthenticated
    );
    builder.addMatcher(accountApi.endpoints.logout.matchFulfilled, (state) => {
      state.isAuthenticated = false;
      state.authStatus = 'unauthenticated';
      state.user = undefined;
    });
    builder.addMatcher(
      accountApi.endpoints.loggedIn.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = payload;
        state.authStatus = payload ? 'authenticated' : 'unauthenticated';
        if (payload) return;
        state.user = undefined;
        state.userClaims = [];
        state.userRoles = [];
      }
    );
    builder.addMatcher(
      userApi.endpoints.getCurrentUserClaims.matchFulfilled,
      (state, { payload }) => {
        state.userClaims = payload;
      }
    );
    builder.addMatcher(
      userApi.endpoints.getCurrentUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.userRoles = payload.roles;
      }
    );
    builder.addMatcher(
      userApi.endpoints.getUserRoles.matchFulfilled,
      (state, { payload }) => {
        state.userRoles = payload;
      }
    );
    builder.addMatcher(
      userApi.endpoints.getCsvColumDelimiters.matchFulfilled,
      (state, { payload }) => {
        state.csvColumDelimiters = payload;
      }
    );
    builder.addMatcher(
      userApi.endpoints.getCultures.matchFulfilled,
      (state, { payload }) => {
        state.cultures = payload;
      }
    );
  },
});

export const { setCurrentUser, setNotifyStatus, clearUserState, reset } =
  userSlice.actions;

export default userSlice.reducer;
