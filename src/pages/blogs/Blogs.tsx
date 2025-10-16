import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import BlogSceleton from "@/myComponent/loader/BlogSceleton";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import CreateBlog from "./CreateBlog";
import { currentBlogFilter } from "@/redux/features/blog/blogSlice";
import { TBlog } from "@/interface/blogInterface/blog.interface";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const user = useAppSelector(currentUser);
  const query = useAppSelector(currentBlogFilter);
  const { data, isLoading } = useGetAllBlogsQuery(query);
  const blogs = data?.data?.result || [];
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <BlogSceleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="px-2 md:px-8 lg:px-16 min-h-[calc(100vh-75px)] py-2 lg:flex justify-center flex-row-reverse bg-gray-200 dark:bg-gray-800">
      {user && <CreateBlog />}
      <div className="space-y-20 ">
        {!(blogs as TBlog[]).length ? (
          <h1>No blogs available right now</h1>
        ) : (
          <>
            {(blogs as TBlog[]).map((blog: TBlog) => (
              <BlogCard key={blog?._id} blog={blog} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;
