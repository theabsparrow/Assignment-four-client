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
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: (otp) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: otp,
      }),
    }),
    setNewPassword: builder.mutation({
      query: (newPass) => ({
        url: "/auth/set-newPassword",
        method: "POST",
        body: newPass,
      }),
    }),
  }),
});
export const { useRegisterMutation } = authApi;
export const { useLoginMutation } = authApi;
export const { useLogoutMutation } = authApi;
export const { useChnagePassowrdMutation } = authApi;
export const { useForgetPasswordMutation } = authApi;
export const { useResetPasswordMutation } = authApi;
export const { useSetNewPasswordMutation } = authApi;
