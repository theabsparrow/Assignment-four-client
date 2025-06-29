import { useEffect, useState } from "react";
import {
  TCarBrand,
  TCategory,
} from "../dashboard/admin/addCar/addcar.interface";
import {
  useGetMyReactionQuery,
  useReactionCountMutation,
} from "@/redux/features/blog/blogApi";
import { toast } from "sonner";
import BlogSceleton from "@/components/loader/BlogSceleton";

export type TBlogReaction = {
  like: number;
  love: number;
  dislike: number;
};
export type TReactionOptions = "like" | "love" | "dislike";
export type TBlog = {
  _id: string;
  authorId: string;
  name: string;
  title: string;
  content: string;
  image?: string;
  tags?: string[];
  brand: TCarBrand;
  model?: string;
  category: TCategory;
  view: number;
  reaction: TBlogReaction;
  createdAt: string | Date;
};

const BlogCard = ({ blog }: { blog: TBlog }) => {
  const {
    _id,
    name,
    title,
    content,
    image,
    brand,
    model,
    category,
    view,
    reaction,
    createdAt,
  } = blog;
  const { data, isLoading } = useGetMyReactionQuery(_id);
  const reactionResult = data?.data?.reaction;
  const [showReactions, setShowReactions] = useState(false);
  const [userReaction, setUserReaction] = useState<
    null | "like" | "love" | "dislike"
  >(null);

  useEffect(() => {
    setUserReaction(reactionResult);
  }, [reactionResult]);

  const [reactionCount] = useReactionCountMutation();
  const handleReaction = async (reaction: TReactionOptions) => {
    const reactionData = {
      reaction,
    };
    const toastId = toast.loading("reacting.....");
    try {
      const res = await reactionCount({ reactionData, _id }).unwrap();
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

  return (
    <div className="max-w-3xl mx-auto my-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
      {image && (
        <img
          src={image}
          alt="blog"
          className="w-full object-cover rounded mb-4"
        />
      )}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        By <span className="text-xl font-semibold text-blue-600">{name}</span>{" "}
        {new Date(createdAt).toLocaleString()}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Brand: {brand}, Model: {model}, Category: {category}
      </p>
      <p className="text-gray-700 dark:text-gray-300 ">
        {content.slice(0, 200)}...{" "}
        <button className="text-blue-600 dark:text-blue-400 hover:underline mb-4">
          Read More
        </button>
      </p>
      <div className="flex flex-wrap items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            {isLoading
              ? "loading..."
              : reaction?.like + reaction?.love + reaction?.dislike}
          </span>
          <span>people reacted</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              Views:
            </span>
            <span>{view}</span>
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
            showReactions ? "opacity-100" : "opacity-0 pointer-events-none"
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
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
