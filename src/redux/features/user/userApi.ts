import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myProfile: builder.query({
      query: () => ({
        url: "/user/my-profile",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUserInfo: builder.mutation({
      query: (image) => ({
        url: "/user/update-info",
        method: "PATCH",
        body: image,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (password) => ({
        url: "/user//delete-account",
        method: "DELETE",
        body: password,
      }),
    }),
  }),
});
export const { useMyProfileQuery } = userApi;
export const { useUpdateUserInfoMutation } = userApi;
export const { useDeleteUserMutation } = userApi;
