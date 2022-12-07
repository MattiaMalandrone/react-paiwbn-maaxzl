import {
  CultureType,
  RoleType,
  UpdatePasswordPayloadType,
  UpdateUserRequestPayloadType,
  UpdateUserResponsePayloadType,
  UserType,
} from '../types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { uuid } from 'uuidv4';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/backend/Api/Users`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getCurrentUserClaims: builder.mutation<Array<string>, void>({
      query: () => {
        return {
          url: '/Current/Claims',
          method: 'GET',
        };
      },
    }),
    getCurrentUser: builder.mutation<UserType, void>({
      query: () => {
        return {
          url: '/Current',
          method: 'GET',
        };
      },
    }),
    getUserRoles: builder.mutation<Array<RoleType>, typeof uuid>({
      query: (userId) => {
        return {
          url: `/Roles/${userId}`,
          method: 'GET',
        };
      },
    }),
    updateCurrentUserPassword: builder.mutation<
      boolean,
      UpdatePasswordPayloadType
    >({
      query: (payload) => {
        return {
          url: '/Current/UpdatePassword',
          method: 'POST',
          body: payload,
        };
      },
    }),
    updateCurrentUser: builder.mutation<
      UpdateUserResponsePayloadType,
      UpdateUserRequestPayloadType
    >({
      query: (payload) => {
        return {
          url: '/Current/Edit',
          method: 'POST',
          body: payload,
        };
      },
    }),
    getCsvColumDelimiters: builder.mutation<Array<string>, void>({
      query: () => {
        return {
          url: '/Settings/CsvColumnDelimiters',
          method: 'GET',
        };
      },
    }),
    getCultures: builder.mutation<Array<CultureType>, void>({
      query: () => {
        return {
          url: '/Settings/Cultures',
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useGetCurrentUserClaimsMutation,
  useGetCurrentUserMutation,
  useGetUserRolesMutation,
  useUpdateCurrentUserPasswordMutation,
  useUpdateCurrentUserMutation,
  useGetCsvColumDelimitersMutation,
  useGetCulturesMutation,
} = userApi;
