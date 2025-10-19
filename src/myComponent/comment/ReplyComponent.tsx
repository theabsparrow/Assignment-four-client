import { TCommentInfo } from "@/interface/blogInterface/comment.Interface";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import profileIcon from "../../assets/profile-photo.png";
import { BiSolidLike } from "react-icons/bi";
import { formatedDate } from "../../pages/myProfile/myProfile.utills";
import { timeAgo } from "@/utills/timeAgo";

const ReplyComponent = ({ comment }: { comment: TCommentInfo }) => {
  const user = useAppSelector(currentUser);
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
              <button className="hover:text-blue-700 duration-500">Like</button>
            ) : (
              <span>Like</span>
            )}

            <span className="flex items-center gap-1">
              {comment?.reaction}{" "}
              <BiSolidLike className="text-blue-700 bg-white p-1 rounded-full text-xl" />{" "}
            </span>
          </div>
          <p className="text-xs lg:text-sm">{timeAgo(comment?.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default ReplyComponent;
