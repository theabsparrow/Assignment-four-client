import { resetBlogInfo } from "@/redux/features/blog/blogInfoSlice";
import { TBlogInfo } from "@/redux/features/blog/blogSlice.const";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

type TEditBlogDescriptionProps = {
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
const BlogEditDescription = ({
  label,
  name,
  blogInfo,
  setBlogInfo,
  blog,
  handleChange,
  handleSubmit,
}: TEditBlogDescriptionProps) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-start justify-between bg-gray-200 py-2 rounded-xl">
      <div className=" w-full">
        {open ? (
          <div className="space-y-2 w-full ">
            <div className="flex flex-col ">
              <label>{label}</label>
              <textarea
                value={(blogInfo?.[name as keyof TBlogInfo] as string) ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  handleChange(value);
                }}
                rows={4}
                className="w-full peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 resize-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-700 dark:text-gray-300 ">
                {blogInfo?.content?.length} / 5000
              </p>
              <div className="flex items-center justify-end gap-10">
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
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300 ">
            {(blogInfo?.[name as keyof TBlogInfo] as string) ||
              "No description"}
          </p>
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

export default BlogEditDescription;
