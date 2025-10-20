import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import BlogSceleton from "@/myComponent/loader/BlogSceleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import CreateBlog from "./CreateBlog";
import { currentBlogFilter, setPage } from "@/redux/features/blog/blogSlice";
import { TBlog } from "@/interface/blogInterface/blog.interface";
import BlogCard from "./BlogCard";
import Pagination from "@/myComponent/pagination/Pagination";
import BlogsFiltering from "./BlogsFiltering";

const Blogs = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);
  const query = useAppSelector(currentBlogFilter);
  const { data, isLoading } = useGetAllBlogsQuery(query);
  const { result: blogs, meta } = data?.data || {};

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

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
    <section className="px-2 md:px-8 lg:px-16 min-h-[calc(100vh-75px)] py-2 bg-gray-200 dark:bg-gray-800 relative">
      <div className="lg:flex justify-center flex-row-reverse lg:gap-10">
        {user && <CreateBlog />}
        <div className="space-y-20 ">
          {!(blogs as TBlog[]).length ? (
            <h1>No blogs available right now</h1>
          ) : (
            <div className="space-y-16">
              <BlogsFiltering />
              {(blogs as TBlog[]).map((blog: TBlog) => (
                <BlogCard key={blog?._id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>

      {blogs?.length > 0 && (
        <div className="mt-5">
          <Pagination meta={meta} handlePageChange={handlePageChange} />
        </div>
      )}
    </section>
  );
};

export default Blogs;
