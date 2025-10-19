import { TCommentInfo } from "@/interface/blogInterface/comment.Interface";
import profileIcon from "../../assets/profile-photo.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import {
  currentState,
  setReplyOpen,
} from "@/redux/features/comment/commentModalSlice";
import { BiSolidLike } from "react-icons/bi";
import ReplyComment from "@/myComponent/comment/ReplyComment";
import { useState } from "react";
import {
  useCreateCommentReactionMutation,
  useGetMyCommentReactionQuery,
} from "@/redux/features/reaction/reactionApi";
import { toast } from "sonner";
import { timeAgo } from "@/utills/timeAgo";

const CommentCard = ({ comment }: { comment: TCommentInfo }) => {
  const [userReaction, setUserReaction] = useState(comment?.reaction ?? 0);
  const { data, isLoading } = useGetMyCommentReactionQuery(comment?._id);
  const myReaction = data?.data;
  const user = useAppSelector(currentUser);
  const currentCommentState = useAppSelector(currentState);
  const dispatch = useAppDispatch();
  const [createReaction] = useCreateCommentReactionMutation();

  const handlereaction = async () => {
    if (!user) {
      toast.error("login first to react");
      return;
    }
    if (!myReaction) {
      setUserReaction(comment?.reaction + 1);
    } else {
      setUserReaction(comment?.reaction - 1);
    }
    try {
      const res = await createReaction(comment?._id).unwrap();
      if (!res?.success) {
        setUserReaction(comment?.reaction);
        return;
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.errorSource[0].message ||
        error?.data?.message ||
        error?.error ||
        "Something went wrong!";
      if (errorInfo) {
        setUserReaction(comment?.reaction);
      }
    }
  };

  return (
    <div key={comment?._id} className="flex items-start gap-4 ">
      <div>
        {comment?.userId?.profileImage ? (
          <img
            className="w-11 h-11 rounded-full "
            src={comment?.userId?.profileImage}
          />
        ) : (
          <img className="w-12 h-12 rounded-full " src={profileIcon} />
        )}
      </div>
      <div className="w-full">
        <p className="font-medium text-white">
          {comment?.userId?.name.firstName}{" "}
          {comment?.userId?.name.middleName && comment?.userId?.name.middleName}{" "}
          {comment?.userId?.name.lastName}
        </p>
        <p className="font-medium text-white/70 ">{comment?.content}</p>
        <div className="text-white font-semibold flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-10">
            {user ? (
              <div>
                {isLoading ? (
                  <span>Like</span>
                ) : (
                  <button
                    onClick={handlereaction}
                    className={`hover:text-blue-700 duration-500 ${
                      myReaction ? " text-blue-700" : "text-white"
                    }`}
                  >
                    {myReaction ? "Liked" : "Like"}
                  </button>
                )}
              </div>
            ) : (
              <span>Like</span>
            )}
            <button
              onClick={() =>
                dispatch(
                  setReplyOpen(
                    currentCommentState.replyOpen === comment?._id
                      ? null
                      : comment?._id
                  )
                )
              }
              className="hover:text-blue-700 duration-500"
            >
              Reply
            </button>
            <span className="flex items-center gap-1">
              {userReaction}{" "}
              <BiSolidLike className="text-blue-700 bg-white p-1 rounded-full text-xl" />{" "}
            </span>
          </div>
          <p className="text-xs lg:text-sm">{timeAgo(comment?.createdAt)}</p>
        </div>
        <ReplyComment
          reply={comment?.replies}
          commentId={comment?._id}
          id={comment?.blogId}
        />
      </div>
    </div>
  );
};

export default CommentCard;
