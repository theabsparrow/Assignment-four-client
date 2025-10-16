import { baseApi } from "@/redux/api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          const entries = Object.entries(args);
          for (const [key, value] of entries) {
            if (value) {
              params.append(key, value.toString());
            }
          }
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

    addBlog: builder.mutation({
      query: (blogInfo) => ({
        url: "/blog/create-blog",
        method: "POST",
        body: blogInfo,
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const { useAddBlogMutation } = blogApi;
export const { useGetAllBlogsQuery } = blogApi;
export const { useGetASingleBlogQuery } = blogApi;
