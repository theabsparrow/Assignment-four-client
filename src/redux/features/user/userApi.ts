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
    updateImage: builder.mutation({
      query: (image) => ({
        url: "/user/update-info",
        method: "PATCH",
        body: image,
      }),
      invalidatesTags: ["user"],
    }),
    updateAddress: builder.mutation({
      query: (address) => ({
        url: "/user/update-info",
        method: "PATCH",
        body: address,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});
export const { useMyProfileQuery } = userApi;
export const { useUpdateImageMutation } = userApi;
export const { useUpdateAddressMutation } = userApi;
