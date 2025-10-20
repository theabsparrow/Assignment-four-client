import {
  TComment,
  TCommentInfo,
} from "@/interface/blogInterface/comment.Interface";
import InputTextArea from "@/myComponent/formInput/InputTextArea";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { BsSendFill } from "react-icons/bs";
import {
  useAddCommentMutation,
  useGetAllCommentQuery,
} from "@/redux/features/comment/comentApi";
import { toast } from "sonner";
import { currentUser } from "@/redux/features/auth/authSlice";
import BlogCommentSkeleton from "@/myComponent/loader/BlogCommentSkeleton";
import CommentCard from "@/myComponent/comment/CommentCard";
import { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { resetCommentState } from "@/redux/features/comment/commentModalSlice";
type TCommentModalProps = {
  id: string;
  totalComment: number;
  forComment?: string;
};

const CommentModal = ({ id, totalComment, forComment }: TCommentModalProps) => {
  const [open, setopen] = useState(false);
  const user = useAppSelector(currentUser);
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (isLoading && open) {
    return <BlogCommentSkeleton />;
  }

  return (
    <>
      {forComment === "cmntButton" ? (
        <button
          onClick={() => setopen(true)}
          className="font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-700 hover:underline duration-500"
        >
          Comments: {totalComment}
        </button>
      ) : (
        <button
          onClick={() => setopen(true)}
          className="px-4 py-1 rounded-full transition text-sm font-semibold flex items-center gap-2 bg-gray-600 text-white"
        >
          <FaRegComment /> Comment
        </button>
      )}

      {open && (
        <section className="fixed -top-2 inset-0 z-50 flex items-center justify-center bg-black/30 ">
          <div className="bg-gray-500 dark:bg-gray-900 rounded-lg shadow-lg lg:w-[40vw] h-[70vh] lg:h-[85vh] flex flex-col px-12 py-8 relative">
            <button
              disabled={isSubmitting}
              onClick={() => {
                setopen(false);
                dispatch(resetCommentState());
              }}
              className="bg-gray-500 text-white p-1 dark:text-gray-7 rounded-full absolute top-2 right-2 hover:bg-gray-600 duration-500"
            >
              <RxCross1 />
            </button>
            <div className="flex-1 overflow-y-auto w-full scrollbar-hide">
              {!(comments as TCommentInfo[]).length ? (
                <div>
                  <h1 className="text-white/80 text-2xl font-medium text-center">
                    no comments for this post
                  </h1>
                </div>
              ) : (
                <div className="space-y-8 lg:space-y-4">
                  {(comments as TCommentInfo[]).map((comment) => (
                    <CommentCard key={comment?._id} comment={comment} />
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
      )}
    </>
  );
};

export default CommentModal;
