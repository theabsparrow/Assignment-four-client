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
    }),
  }),
});
export const { useMyProfileQuery } = userApi;
export const { useUpdateUserInfoMutation } = userApi;
export const { useDeleteUserMutation } = userApi;
export const { useGetAllUsersQuery } = userApi;
