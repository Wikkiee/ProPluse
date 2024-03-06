import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authenticationApiSlice = createApi({
  reducerPath: "authenticationApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000",
  }),
  endpoints: (builder) => ({
    getUserAuthenticationStatus: builder.query({
      query: () => ({
        url: "/check",
        credentials: "include",
      }),
    }),
    postRegisteration: builder.mutation({
      query: (data) => ({
        url: "api/v1/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    postLogin: builder.mutation({
      query: (data) => ({
        url: "api/v1/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    postGoogleOAuthLogin: builder.mutation({
      query: (data) => ({
        url: "/api/v1/oauth",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserAuthenticationStatusQuery,
  usePostRegisterationMutation,
  usePostLoginMutation,
  usePostGoogleOAuthLoginMutation,
} = authenticationApiSlice;
