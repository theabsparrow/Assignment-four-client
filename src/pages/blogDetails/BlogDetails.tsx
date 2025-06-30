import BlogDetailsSceleton from "@/myComponent/loader/BlogDetailsSceleton";
import { currentUser } from "@/redux/features/auth/authSlice";
import {
  useGetASingleBlogQuery,
  useGetMyReactionQuery,
  useReactionCountMutation,
} from "@/redux/features/blog/blogApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TReactionOptions } from "../blogs/BlogCard";
import { toast } from "sonner";

const BlogDetails = () => {
  const user = useAppSelector(currentUser);
  const { id } = useParams();
  const { data, isLoading } = useGetASingleBlogQuery(id);
  const blog = data?.data;
  const { data: reactionData, isLoading: reactionloading } =
    useGetMyReactionQuery(id);
  const reactionResult = reactionData?.data?.reaction;
  const [showReactions, setShowReactions] = useState(false);
  const [userReaction, setUserReaction] = useState<
    null | "like" | "love" | "dislike"
  >(null);

  useEffect(() => {
    setUserReaction(reactionResult);
  }, [reactionResult]);

  const [reactionCount] = useReactionCountMutation();
  const handleReaction = async (reaction: TReactionOptions) => {
    if (!user) {
      toast.error("login first to react");
      return;
    }
    const reactionData = {
      reaction,
    };
    const toastId = toast.loading("reacting.....");
    try {
      const res = await reactionCount({ reactionData, _id: id }).unwrap();
      if (res?.data) {
        setUserReaction(userReaction === reaction ? null : reaction);
        toast.success(" successfully reacted", {
          id: toastId,
          duration: 3000,
        });
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.errorSource[0].message ||
        error?.data?.message ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const reactionColor =
    userReaction === "like"
      ? "bg-blue-500 text-white"
      : userReaction === "love"
      ? "bg-pink-500 text-white"
      : userReaction === "dislike"
      ? "bg-yellow-500 text-white"
      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200";

  if (isLoading) {
    return <BlogDetailsSceleton />;
  }
  return (
    <section className="md:px-32 mt-2">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-start md:gap-8 p-4 md:p-8">
          <div className="md:w-[60%] w-full mb-4 md:mb-0 border">
            {blog?.image && (
              <img
                src={blog?.image}
                alt={blog?.title}
                className="w-full h-auto rounded-2xl object-cover border"
              />
            )}
          </div>
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
              {blog?.title}
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              by <span className="font-semibold">{blog?.name}</span> •{" "}
              {blog?.category} • {blog?.brand}{" "}
              {blog?.model && `• ${blog?.model}`}
            </p>
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
            <div className="flex flex-wrap items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  {reactionloading
                    ? "loading..."
                    : blog?.reaction?.like +
                      blog?.reaction?.love +
                      blog?.reaction?.dislike}
                </span>
                <span>people reacted</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    👁️
                  </span>
                  <span>{blog?.view}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    Comments:
                  </span>
                  <span>0</span>
                </span>
              </div>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-600 mb-4"></div>
            <div
              className="relative inline-block"
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              <button
                className={`px-4 py-2 rounded-full transition ${reactionColor}`}
              >
                {userReaction
                  ? userReaction.charAt(0).toUpperCase() + userReaction.slice(1)
                  : "React"}
              </button>
              <div
                className={`absolute top-full left-0 flex space-x-2 bg-white dark:bg-gray-700 p-2 rounded shadow transition-opacity duration-200 ${
                  showReactions
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                {["like", "love", "dislike"].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleReaction(type as any)}
                    className={`px-3 py-1 rounded hover:bg-opacity-75 ${
                      type === "like"
                        ? "bg-blue-500 text-white"
                        : type === "love"
                        ? "bg-pink-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {type === "like" && "👍"}
                    {type === "love" && "❤️"}
                    {type === "dislike" && "👎"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-10">
          <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
            {blog?.content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
