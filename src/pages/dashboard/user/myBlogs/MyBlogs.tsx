import { TBlog } from "@/interface/blogInterface/blog.interface";
import BlogSceleton from "@/myComponent/loader/BlogSceleton";
import Pagination from "@/myComponent/pagination/Pagination";
import BlogsFiltering from "@/pages/blogs/BlogsFiltering";
import CreateBlog from "@/pages/blogs/CreateBlog";
import MyBlogCard from "@/pages/blogs/MyBlogCard";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import { currentBlogFilter, setPage } from "@/redux/features/blog/blogSlice";
import { TBlogInfo } from "@/redux/features/blog/blogSlice.const";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const MyBlogs = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(currentBlogFilter);
  const { data, isLoading } = useGetAllBlogsQuery(query);
  const { result, meta } = data?.data || {};
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
    <section className="px-4 min-h-screen py-2 bg-gray-200 dark:bg-gray-800 relative">
      <div className="lg:flex justify-center flex-row-reverse lg:gap-10">
        <CreateBlog />
        <div className="space-y-10 ">
          {!(result as TBlog[]).length ? (
            <h1>No blogs available right now</h1>
          ) : (
            <div className="space-y-16">
              <BlogsFiltering />
              {(result as TBlog[]).map((blog: TBlog) => (
                <MyBlogCard key={blog?._id} blog={blog as TBlogInfo} />
              ))}
            </div>
          )}
        </div>
      </div>

      {(result as TBlog[])?.length > 0 && (
        <div className="mt-5">
          <Pagination meta={meta} handlePageChange={handlePageChange} />
        </div>
      )}
    </section>
  );
};

export default MyBlogs;
