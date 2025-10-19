import { useState } from "react";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { TBlog } from "@/interface/blogInterface/blog.interface";
import profileIcon from "../../assets/profile-photo.png";
import { formatedDate } from "../myProfile/myProfile.utills";
import {
  useCreateReactionMutation,
  useGetMyReactionQuery,
} from "@/redux/features/reaction/reactionApi";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import CommentModal from "../../myComponent/modal/CommentModal";
export type TReactionOptions = "like" | "love" | "dislike";

const BlogCard = ({ blog }: { blog: TBlog }) => {
  const {
    _id,
    title,
    content,
    image,
    reaction,
    createdAt,
    authorId,
    comments,
  } = blog || {};

  const [userReaction, setUserReaction] = useState(reaction ?? 0);
  const user = useAppSelector(currentUser);
  const { data, isLoading } = useGetMyReactionQuery(_id);
  const myReaction = data?.data;
  const [createReaction] = useCreateReactionMutation();

  const handleReaction = async () => {
    if (!user) {
      toast.error("login first to react");
      return;
    }
    if (!myReaction) {
      setUserReaction(reaction + 1);
    } else {
      setUserReaction(reaction - 1);
    }
    try {
      const res = await createReaction(_id).unwrap();
      if (!res?.success) {
        setUserReaction(reaction);
        return;
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.errorSource[0].message ||
        error?.data?.message ||
        error?.error ||
        "Something went wrong!";
      if (errorInfo) {
        setUserReaction(reaction);
      }
    }
  };

  return (
    <section className="max-w-3xl mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg transition-colors duration-300 space-y-2 relative">
      <div>
        {image && (
          <img
            src={image as string}
            alt="blog"
            className="w-full object-cover rounded"
          />
        )}
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <div>
          {authorId?.profileImage ? (
            <img
              className="w-11 h-11 rounded-full "
              src={authorId?.profileImage}
            />
          ) : (
            <img className="w-12 h-12 rounded-full " src={profileIcon} />
          )}
          <div className="lg:flex items-center justify-between">
            <p className="font-medium text-blue-600">
              {authorId?.name.firstName}{" "}
              {authorId?.name.middleName && authorId?.name.middleName}{" "}
              {authorId?.name.lastName}
            </p>
            <p className="flex items-center gap-2 text-sm">
              {" "}
              <span>{formatedDate(new Date(createdAt)).creationDate}</span>{" "}
              <span>{formatedDate(new Date(createdAt)).creationTime}</span>
            </p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 ">
          {content?.slice(0, 200)}...{" "}
          <Link
            to={`/blogs/${_id}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Read More
          </Link>
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 dark:text-gray-300">
        <p className="font-semibold text-gray-800 dark:text-gray-100">
          {userReaction} people reacted
        </p>
        <CommentModal
          id={_id}
          totalComment={comments}
          forComment="cmntButton"
        />
      </div>

      {user ? (
        <div>
          {isLoading ? (
            <div className="flex items-center gap-48">
              <span
                className={`px-2 py-1 rounded-full transition bg-gray-600 text-white text-sm font-semibold flex items-center gap-2`}
              >
                <SlLike /> Like
              </span>
              <span
                className={`px-2 py-1 rounded-full transition bg-gray-600 text-white text-sm font-semibold flex items-center gap-2`}
              >
                <FaRegComment /> Comment
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-48">
              <button
                onClick={handleReaction}
                className={`px-4 py-1 rounded-full transition text-sm font-semibold flex items-center gap-2 ${
                  myReaction
                    ? "bg-blue-300 text-blue-700"
                    : "bg-gray-600 text-white"
                }`}
              >
                <SlLike /> {myReaction ? "Liked" : "Like"}
              </button>
              <CommentModal id={_id} totalComment={comments} />
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-48">
          <Link
            to="/sign-in"
            className={`px-2 py-1 rounded-full transition bg-gray-600 text-white text-sm font-semibold flex items-center gap-2`}
          >
            <SlLike /> Like
          </Link>
          <CommentModal id={_id} totalComment={comments} />
        </div>
      )}
    </section>
  );
};

export default BlogCard;
