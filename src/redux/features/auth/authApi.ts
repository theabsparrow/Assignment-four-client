import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: loginInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    chnagePassowrd: builder.mutation({
      query: (passowrdInfo) => ({
        url: "/auth/change-password",
        method: "POST",
        body: passowrdInfo,
      }),
    }),
  }),
});
export const { useRegisterMutation } = authApi;
export const { useLoginMutation } = authApi;
export const { useLogoutMutation } = authApi;
export const { useChnagePassowrdMutation } = authApi;
