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
    clearToken: builder.mutation({
      query: () => ({
        url: "/auth/clear-token",
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
    retrivePassword: builder.mutation({
      query: (email) => ({
        url: "/auth/retrive-password",
        method: "POST",
        body: email,
      }),
    }),
    otpResend: builder.mutation({
      query: () => ({
        url: "/auth/otp-resend",
        method: "POST",
      }),
    }),
    matchOTP: builder.mutation({
      query: (data) => ({
        url: "/auth/match-otp",
        method: "POST",
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/update-newPassword",
        method: "POST",
        body: data,
      }),
    }),
    sendOtp: builder.mutation({
      query: (id) => ({
        url: `/auth/send-otp/${id}`,
        method: "POST",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: `/auth/get-user`,
        method: "GET",
      }),
      providesTags: ["user"],
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
export const { useClearTokenMutation } = authApi;
export const { useChnagePassowrdMutation } = authApi;
export const { useForgetPasswordMutation } = authApi;
export const { useRetrivePasswordMutation } = authApi;
export const { useOtpResendMutation } = authApi;
export const { useMatchOTPMutation } = authApi;
export const { useUpdatePasswordMutation } = authApi;
export const { useSendOtpMutation } = authApi;
export const { useGetUserQuery } = authApi;
export const { useResetPasswordMutation } = authApi;
export const { useSetNewPasswordMutation } = authApi;
