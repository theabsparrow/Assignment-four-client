import { resetBlogInfo } from "@/redux/features/blog/blogInfoSlice";
import { TBlogInfo } from "@/redux/features/blog/blogSlice.const";
import { useAppDispatch } from "@/redux/hooks";
import { ReactNode, useState } from "react";
import { MdEdit } from "react-icons/md";

type blogEditInputProps = {
  label: string;
  name: string;
  blogInfo: Partial<TBlogInfo>;
  setBlogInfo: React.Dispatch<React.SetStateAction<Partial<TBlogInfo> | null>>;
  blog: TBlogInfo;
  handleChange: (value: string) => void;
  handleSubmit: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<any>;
};

const BlogEditingInput = ({
  label,
  name,
  blogInfo,
  setBlogInfo,
  blog,
  handleChange,
  handleSubmit,
}: blogEditInputProps) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-end justify-between bg-gray-200 px-4 py-2 rounded-xl">
      <div className=" w-full">
        {open ? (
          <div className="space-y-2 w-full  px-4">
            <div className="flex flex-col gap-2">
              <label>{label}</label>
              <input
                type="text"
                value={blogInfo?.[name as keyof TBlogInfo] as string}
                onChange={(e) => {
                  const value = e.target.value;
                  handleChange(value);
                }}
                className="w-full peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>

            <div className="flex items-center gap-10">
              <button
                onClick={() => {
                  setOpen(false);
                  setBlogInfo(blog);
                  dispatch(resetBlogInfo());
                }}
                className="text-secondary font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit(setOpen)}
                className="text-secondary font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {blogInfo?.[name as keyof TBlogInfo] as ReactNode}
          </h2>
        )}
      </div>
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
            dispatch(resetBlogInfo());
          }}
          className="text-red-600 text-lg "
        >
          <MdEdit />
        </button>
      )}
    </div>
  );
};

export default BlogEditingInput;
