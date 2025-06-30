import { baseApi } from "@/redux/api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              params.append(key, value.join(","));
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
              params.append(key, value!.toString());
            }
          });
        }
        return {
          url: "/blog/all-blogs",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["blog"],
    }),

    getASingleBlog: builder.query({
      query: (id) => ({
        url: `/blog/single-blog/${id}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),

    getMyReaction: builder.query({
      query: (args) => ({
        url: `/reaction/my-reaction/${args}`,
        method: "GET",
      }),
      providesTags: ["reaction"],
    }),

    addBlog: builder.mutation({
      query: (blogInfo) => ({
        url: "/blog/create-blog",
        method: "POST",
        body: blogInfo,
      }),
      invalidatesTags: ["blog"],
    }),

    reactionCount: builder.mutation({
      query: (reactionInfo) => (
        console.log(reactionInfo),
        {
          url: `/blog/count-reaction/${reactionInfo._id}`,
          method: "PATCH",
          body: reactionInfo.reactionData,
        }
      ),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const { useAddBlogMutation } = blogApi;
export const { useGetAllBlogsQuery } = blogApi;
export const { useReactionCountMutation } = blogApi;
export const { useGetMyReactionQuery } = blogApi;
export const { useGetASingleBlogQuery } = blogApi;
