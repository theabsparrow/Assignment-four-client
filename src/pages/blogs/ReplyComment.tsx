import {
  TComment,
  TCommentInfo,
} from "@/interface/blogInterface/comment.Interface";
import InputTextArea from "@/myComponent/formInput/InputTextArea";
import { currentUser } from "@/redux/features/auth/authSlice";
import {
  useAddCommentMutation,
  useGetAllRepliesQuery,
} from "@/redux/features/comment/comentApi";
import {
  currentState,
  setReplyOpen,
} from "@/redux/features/comment/commentModalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import { BsSendFill } from "react-icons/bs";
import { toast } from "sonner";
import ReplyComponent from "./ReplyComponent";
import ReplyComponentSkeleton from "@/myComponent/loader/ReplyComponent";

const ReplyComment = ({
  reply,
  commentId,
  id,
}: {
  reply?: number;
  commentId: string;
  id: string;
}) => {
  const currentCommentState = useAppSelector(currentState);
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const isOpen = currentCommentState?.replyOpen === commentId;
  const [addComment] = useAddCommentMutation();
  const { data, isLoading } = useGetAllRepliesQuery(commentId);
  const repliedInfo = data?.data;
  console.log(repliedInfo);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TComment>();

  const onSubmit = async (data: TComment) => {
    data.content = data.content.trim();
    data.commentId = commentId;
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
    return <ReplyComponentSkeleton />;
  }

  return (
    <section>
      {isOpen && (
        <div>
          {user && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="sticky bottom-0 bg-gray-500 dark:bg-gray-900 dark:border-gray-700 px-3 py-2 flex items-center gap-2"
            >
              <div className="flex-1">
                <InputTextArea
                  name="content"
                  placeholder="Write your comment..."
                  register={register}
                  error={errors.content}
                  required={true}
                  rows={1}
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
          {(repliedInfo as TCommentInfo[]) &&
            (repliedInfo as TCommentInfo[]).length > 0 && (
              <div className="space-y-4 lg:space-y-2">
                {(repliedInfo as TCommentInfo[]).map((comment) => (
                  <ReplyComponent key={comment?._id} comment={comment} />
                ))}
              </div>
            )}
        </div>
      )}
      {reply && reply > 0 && (
        <div className="flex justify-center items-center text-white font-semibold">
          <button
            onClick={() =>
              dispatch(
                setReplyOpen(
                  currentCommentState.replyOpen === commentId ? null : commentId
                )
              )
            }
          >
            {reply} {reply > 1 ? "replies" : "reply"}
          </button>
        </div>
      )}
    </section>
  );
};

export default ReplyComment;
