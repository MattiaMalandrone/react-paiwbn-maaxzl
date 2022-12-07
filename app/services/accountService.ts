import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserLoginRequestType, UserLoginResponseType } from '../types';

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/backend/account/`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    /**
     * login endpoint
     */
    login: builder.mutation<UserLoginResponseType, UserLoginRequestType>({
      query: (body) => {
        return {
          url: `/login`,
          method: 'POST',
          body: body,
        };
      },
    }),
    /**
     * logout endpoint
     */
    logout: builder.mutation<boolean, void>({
      query: () => {
        return {
          url: `/logout`,
          method: 'GET',
        };
      },
    }),
    /**
     * loggedIn endpoint
     */
    loggedIn: builder.mutation<boolean, void>({
      query: () => {
        return {
          url: `/loggedIn`,
          method: 'GET',
        };
      },
    }),
    /**
     * tokenLogin endpoint
     */
    tokenLogin: builder.mutation<UserLoginResponseType, string>({
      query: (token) => {
        return {
          url: `/tokenLogin/${token}`,
          method: 'GET',
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useLogoutMutation,
  useLoggedInMutation,
  useTokenLoginMutation,
} = accountApi;
