import { currentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import CreateBlog from "./CreateBlog";
// import { useState } from "react";
// import { blogInitalState } from "./blog.const";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import BlogCard, { TBlog } from "./BlogCard";
import BlogSceleton from "@/components/loader/BlogSceleton";

const Blogs = () => {
  const user = useAppSelector(currentUser);

  // const [searchTerm, setSearch] = useState("");
  // const [filter, setFilter] = useState(blogInitalState);
  // const [page, setPage] = useState<number>(1);
  // const [limit, setLimit] = useState<number>(10);

  const queryParams = {
    fields: [
      "name",
      "title",
      "content",
      "createdAt",
      "image",
      "category",
      "brand",
      "reaction",
      "view",
    ],
    filter: {},
    searchTerm: "",
    page: 1,
    limit: 10,
  };
  // const queryParams = {
  //   fields: [
  //     "name",
  //     "title",
  //     "content",
  //     "createdAt",
  //     "image",
  //     "category",
  //     "brand",
  //     "reaction",
  //     "view",
  //   ],
  //   filter: filter || {},
  //   searchTerm: searchTerm || "",
  //   page: page || 1,
  //   limit: limit || 10,
  // };

  const { data, isLoading } = useGetAllBlogsQuery(queryParams);
  const blogs = data?.data?.result || [];

  if (isLoading) {
    return <BlogSceleton />;
  }
  return (
    <div className="md:px-32 mt-2">
      {user && <CreateBlog />}
      {blogs.map((blog: TBlog) => (
        <BlogCard key={blog?._id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
