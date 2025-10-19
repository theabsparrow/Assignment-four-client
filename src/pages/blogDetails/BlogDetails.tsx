import BlogDetailsSceleton from "@/myComponent/loader/BlogDetailsSceleton";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetASingleBlogQuery } from "@/redux/features/blog/blogApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useCreateReactionMutation,
  useGetMyReactionQuery,
} from "@/redux/features/reaction/reactionApi";
import { formatedDate } from "../myProfile/myProfile.utills";

const BlogDetails = () => {
  const { id } = useParams();
  // redux state
  const user = useAppSelector(currentUser);
  const [createReaction] = useCreateReactionMutation();
  const { data, isLoading } = useGetASingleBlogQuery(id);
  const blog = data?.data;
  const { data: react, isLoading: loading } = useGetMyReactionQuery(blog?._id);
  const myReaction = react?.data;
  // local state
  const [userReaction, setUserReaction] = useState(blog?.reaction ?? 0);

  useEffect(() => {
    setUserReaction(blog?.reaction);
  }, [blog?.reaction]);

  const handleReaction = async () => {
    if (!user) {
      toast.error("login first to react");
      return;
    }
    if (!myReaction) {
      setUserReaction(blog?.reaction + 1);
    } else {
      setUserReaction(blog?.reaction - 1);
    }
    try {
      const res = await createReaction(blog?._id).unwrap();
      if (!res?.success) {
        setUserReaction(blog?.reaction);
        return;
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.errorSource[0].message ||
        error?.data?.message ||
        error?.error ||
        "Something went wrong!";
      if (errorInfo) {
        setUserReaction(blog?.reaction);
      }
    }
  };

  if (isLoading) {
    return <BlogDetailsSceleton />;
  }
  return (
    <section className="px-2 md:px-8 lg:px-16 min-h-[calc(100vh-75px)] bg-gray-200 dark:bg-gray-800 rounded-lg transition-colors duration-300  pb-4 ">
      <div className="w-[60vw] mx-auto space-y-4">
        {blog?.image && (
          <div className=" w-full">
            <img
              src={blog?.image}
              alt={blog?.title}
              className="w-full h-auto rounded-2xl object-cover border"
            />
          </div>
        )}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {blog?.title}
          </h2>
          <div>
            {blog?.authorId?.profileImage ? (
              <img
                className="w-11 h-11 rounded-full "
                src={blog?.authorId?.profileImage}
              />
            ) : (
              <img
                className="w-12 h-12 rounded-full "
                src={blog?.profileIcon}
              />
            )}
            <div className="lg:flex items-center justify-between">
              <p className="font-medium text-blue-600">
                {blog?.authorId?.name.firstName} {blog?.authorId?.name.lastName}
              </p>
              <p className="flex items-center gap-2 text-sm">
                {" "}
                <span>
                  {formatedDate(new Date(blog?.createdAt)).creationDate}
                </span>{" "}
                <span>
                  {formatedDate(new Date(blog?.createdAt)).creationTime}
                </span>
              </p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 ">{blog?.content}</p>
        </div>
        {(blog?.tags as string[]).length && (
          <div className="flex flex-wrap gap-2">
            {blog?.tags?.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 dark:text-gray-300">
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            {blog?.reaction} people reacted
          </p>
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            Comments: {blog?.comments}
          </p>
        </div>
        <div>
          {user ? (
            <>
              {loading ? (
                <span
                  className={`px-2 py-1 rounded-full transition bg-gray-600 text-white text-sm font-semibold `}
                >
                  {userReaction} Like
                </span>
              ) : (
                <button
                  onClick={handleReaction}
                  className={`px-2 py-1 rounded-full transition  text-sm font-semibold ${
                    myReaction
                      ? "bg-blue-300 text-blue-700"
                      : "bg-gray-600 text-white"
                  }`}
                >
                  {myReaction ? "Liked" : "Like"}
                </button>
              )}
            </>
          ) : (
            <span
              className={`px-2 py-1 rounded-full transition bg-gray-600 text-white text-sm font-semibold `}
            >
              Like
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
