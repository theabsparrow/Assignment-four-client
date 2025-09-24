import { TMyProfileQUery } from "@/interface/navbar.types";
import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myProfile: builder.query({
      query: (args: { [key: string]: TMyProfileQUery | undefined }) => {
        const params = new URLSearchParams();
        if (args?.for) {
          params.append("for", args?.for.toString());
        }
        return {
          url: "/user/my-profile",
          method: "GET",
          params: params,
        };
      },
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
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([Key, value]) => {
            if (Array.isArray(value)) {
              params.append(Key, value.join(","));
            } else if (typeof value === "object" && value !== null) {
              Object.entries(value).forEach(([subKey, subValue]) => {
                if (
                  subValue !== "" &&
                  subValue !== null &&
                  subValue !== undefined &&
                  subValue !== 0
                ) {
                  params.append(subKey, subValue);
                }
              });
            } else if (value !== undefined && value !== "") {
              params.append(Key, value!.toString());
            }
          });
        }
        return {
          url: `/user`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["users"],
    }),
    updateUserRole: builder.mutation({
      query: (info) => ({
        url: `/user/update-role/${info.id}`,
        method: "PATCH",
        body: { role: info.role },
      }),
      invalidatesTags: ["users"],
    }),
    updateUserStatus: builder.mutation({
      query: (info) => ({
        url: `/user/change-status/${info.id}`,
        method: "PATCH",
        body: { status: info.status },
      }),
      invalidatesTags: ["users"],
    }),

    deleteUserAccount: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    getASingleUSer: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useMyProfileQuery } = userApi;
export const { useUpdateUserInfoMutation } = userApi;
export const { useDeleteUserMutation } = userApi;
export const { useGetAllUsersQuery } = userApi;
export const { useUpdateUserRoleMutation } = userApi;
export const { useUpdateUserStatusMutation } = userApi;
export const { useDeleteUserAccountMutation } = userApi;
export const { useGetASingleUSerQuery } = userApi;
