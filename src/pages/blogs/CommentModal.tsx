import {
  TComment,
  TCommentInfo,
} from "@/interface/blogInterface/comment.Interface";
import InputTextArea from "@/myComponent/formInput/InputTextArea";
import {
  currentState,
  resetCommentState,
  setOpen,
  setReplyOpen,
} from "@/redux/features/comment/commentModalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { BsSendFill } from "react-icons/bs";
import profileIcon from "../../assets/profile-photo.png";
import {
  useAddCommentMutation,
  useGetAllCommentQuery,
} from "@/redux/features/comment/comentApi";
import { toast } from "sonner";
import { currentUser } from "@/redux/features/auth/authSlice";
import { BiSolidLike } from "react-icons/bi";
import { formatedDate } from "../myProfile/myProfile.utills";
import BlogCommentSkeleton from "@/myComponent/loader/BlogCommentSkeleton";
import ReplyComment from "./ReplyComment";

const CommentModal = ({ id }: { id: string }) => {
  const user = useAppSelector(currentUser);
  const currentCommentState = useAppSelector(currentState);
  const dispatch = useAppDispatch();
  const [addComment] = useAddCommentMutation();
  const { data, isLoading } = useGetAllCommentQuery(id);
  const comments = data?.data || [];
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TComment>();

  const onSubmit = async (data: TComment) => {
    data.content = data.content.trim();
    try {
      const args = { comment: data, id };
      const res = await addComment(args).unwrap();
      if (res?.success) {
        reset();
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.errorSource[0].message ||
        error?.data?.message ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  if (isLoading) {
    return <BlogCommentSkeleton />;
  }

  return (
    <section className="fixed -top-2 inset-0 z-50 flex items-center justify-center bg-black/30 ">
      <div className="bg-gray-500 dark:bg-gray-900 rounded-lg shadow-lg lg:w-[40vw] h-[70vh] lg:h-[85vh] flex flex-col p-2 lg:p-4 relative">
        <button
          disabled={isSubmitting}
          onClick={() => {
            dispatch(setOpen(false));
            dispatch(resetCommentState());
            reset();
          }}
          className="bg-gray-500 text-white p-1 dark:text-gray-7 rounded-full absolute top-2 right-2 hover:bg-gray-600 duration-500"
        >
          <RxCross1 />
        </button>
        <div className="flex-1 overflow-y-auto w-full scrollbar-hide">
          {!(comments as TCommentInfo[]).length ? (
            <div>
              <h1>no comments for this post</h1>
            </div>
          ) : (
            <div className="space-y-8 lg:space-y-4">
              {(comments as TCommentInfo[]).map((comment) => (
                <div key={comment?._id} className="flex items-start gap-4 ">
                  <div>
                    {comment?.userId?.profileImage ? (
                      <img
                        className="w-11 h-11 rounded-full "
                        src={comment?.userId?.profileImage}
                      />
                    ) : (
                      <img
                        className="w-12 h-12 rounded-full "
                        src={profileIcon}
                      />
                    )}
                  </div>
                  <div className="w-full">
                    <p className="font-medium text-white">
                      {comment?.userId?.name.firstName}{" "}
                      {comment?.userId?.name.middleName &&
                        comment?.userId?.name.middleName}{" "}
                      {comment?.userId?.name.lastName}
                    </p>
                    <p className="font-medium text-white/70 ">
                      {comment?.content}
                    </p>
                    <div className="text-white font-semibold flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-center gap-10">
                        {user ? (
                          <button className="hover:text-blue-700 duration-500">
                            Like
                          </button>
                        ) : (
                          <span>Like</span>
                        )}
                        {user ? (
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
                        ) : (
                          <span>Reply</span>
                        )}
                        <span className="flex items-center gap-1">
                          {comment?.recation}{" "}
                          <BiSolidLike className="text-blue-700 bg-white p-1 rounded-full text-xl" />{" "}
                        </span>
                      </div>
                      <p className="text-xs lg:text-sm">
                        {
                          formatedDate(new Date(comment?.createdAt))
                            .creationDate
                        }
                        ,
                        {
                          formatedDate(new Date(comment?.createdAt))
                            .creationTime
                        }
                      </p>
                    </div>
                    <ReplyComment
                      reply={comment?.replies}
                      commentId={comment?._id}
                      id={id}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {user && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="sticky bottom-0 bg-gray-500 dark:bg-gray-900 border-t border-gray-400 dark:border-gray-700 px-3 py-2 flex items-center gap-2"
          >
            <div className="flex-1">
              <InputTextArea
                name="content"
                placeholder="Write your comment..."
                register={register}
                error={errors.content}
                required={true}
                rows={1}
                watch={watch}
                max={500}
                min={1}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`p-1 rounded-full transition-colors duration-500 ${
                isSubmitting
                  ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              }`}
            >
              <BsSendFill className="text-white text-lg" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default CommentModal;
