import { TBlogStatus } from "@/interface/blogInterface/blog.interface";
import { resetBlogInfo } from "@/redux/features/blog/blogInfoSlice";
import { TBlogInfo } from "@/redux/features/blog/blogSlice.const";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

type TBlogDropownProps = {
  label: string;
  name: string;
  blogInfo: Partial<TBlogInfo>;
  setBlogInfo: React.Dispatch<React.SetStateAction<Partial<TBlogInfo> | null>>;
  blog: TBlogInfo;
  handleChange: (value: string) => void;
  options: TBlogStatus[];
  handleSubmit: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<any>;
};

const BlogDropdownComponent = ({
  label,
  name,
  blogInfo,
  setBlogInfo,
  blog,
  handleChange,
  options,
  handleSubmit,
}: TBlogDropownProps) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center justify-between gap-10 bg-gray-200  py-2 rounded-xl">
      <div>
        {open ? (
          <div className="space-y-2">
            <div className="flex flex-col ">
              <label>{label}</label>
              <select
                value={blogInfo?.[name as keyof TBlogInfo] as string}
                onChange={(e) => {
                  const value = e.target.value;
                  handleChange(value);
                }}
                className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              >
                <option value="" disabled hidden>
                  Select
                </option>
                {options
                  .slice()
                  .sort((a, b) => a.localeCompare(b))
                  .map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
              </select>
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
          <p
            className={`px-2 py-1 ${
              (blogInfo?.[name as keyof TBlogInfo] as string) === "published"
                ? "bg-green-400 text-green-700 rounded-xl"
                : "bg-blue-400 text-blue-700 rounded-xl"
            }`}
          >
            {blogInfo?.[name as keyof TBlogInfo] as string}
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

export default BlogDropdownComponent;
