import { baseApi } from "@/redux/api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComment: builder.query({
      query: (args) => ({
        url: `/comment/getAllComment/${args}`,
        method: "GET",
      }),
      providesTags: ["comment"],
    }),
    getAllReplies: builder.query({
      query: (args) => ({
        url: `/comment/getAllReplies/${args}`,
        method: "GET",
      }),
      providesTags: ["comment"],
    }),
    addComment: builder.mutation({
      query: (args) => ({
        url: `/comment/create-comment/${args.id}`,
        method: "POST",
        body: args.commentInfo,
      }),
      invalidatesTags: ["blog", "comment"],
    }),
    updateComment: builder.mutation({
      query: (args) => ({
        url: `/comment/update-comment/${args.id}`,
        method: "PATCH",
        body: args.commentInfo,
      }),
      invalidatesTags: ["comment"],
    }),
    deleteComment: builder.mutation({
      query: (args) => ({
        url: `/comment/delete-comment/${args}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog", "comment"],
    }),
  }),
});

export const { useGetAllCommentQuery } = commentApi;
export const { useGetAllRepliesQuery } = commentApi;
export const { useAddCommentMutation } = commentApi;
export const { useUpdateCommentMutation } = commentApi;
export const { useDeleteCommentMutation } = commentApi;
