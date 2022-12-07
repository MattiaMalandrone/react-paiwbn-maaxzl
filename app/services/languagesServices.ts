import { Language } from '../types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const languagesApi = createApi({
  reducerPath: 'languagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://pokeapi.co/api/v2/`,
  }),
  endpoints: (builder) => ({
    getLanguages: builder.query<Language[], void>({
      query: () => `/language`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLanguagesQuery } = languagesApi;
