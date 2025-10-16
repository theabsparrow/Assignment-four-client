import { TComment } from "@/interface/blogInterface/comment.Interface";
import InputTextArea from "@/myComponent/formInput/InputTextArea";
import { setOpen } from "@/redux/features/comment/commentModalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { BsSendFill } from "react-icons/bs";

const CommentModal = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TComment>();

  const onSubmit = async (data: TComment) => {
    console.log(data);
  };

  return (
    <div className="fixed -top-2 inset-0 z-50 flex items-center justify-center bg-black/30 ">
      <div className="bg-gray-500 dark:bg-gray-900 rounded-lg shadow-lg w-[40vw] h-[85vh] flex flex-col p-4 relative">
        <button
          disabled={isSubmitting}
          onClick={() => {
            dispatch(setOpen(false));
            reset();
          }}
          className="bg-gray-500 text-white p-1 dark:text-gray-7 rounded-full absolute top-2 right-2 hover:bg-gray-600 duration-500"
        >
          <RxCross1 />
        </button>
        <div className="flex-1 overflow-y-auto "></div>

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
      </div>
    </div>
  );
};

export default CommentModal;
