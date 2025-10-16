import { baseApi } from "@/redux/api/baseApi";

const reactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyReaction: builder.query({
      query: (args) => ({
        url: `/reaction/my-reaction/${args}`,
        method: "GET",
      }),
      providesTags: ["reaction"],
    }),
    createReaction: builder.mutation({
      query: (args) => ({
        url: `/reaction/create-reaction/${args}`,
        method: "PATCH",
      }),
      invalidatesTags: ["blog", "reaction"],
    }),
  }),
});

export const { useGetMyReactionQuery } = reactionApi;
export const { useCreateReactionMutation } = reactionApi;
