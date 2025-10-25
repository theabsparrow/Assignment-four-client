import {
  resetBlogInfo,
  setAddTags,
  setRemoveTags,
} from "@/redux/features/blog/blogInfoSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";

export type TArrayEditProps = {
  label: string;
  value: string[];
  handleSubmit: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<any>;
};

const BlogArrayEditing = ({ label, value, handleSubmit }: TArrayEditProps) => {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState("");
  const [error, setError] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const options: string[] = value ?? [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSelectedOptions(options as string[]);
  }, [value]);

  const handleRemove = (item: string) => {
    setSelectedOptions(selectedOptions.filter((a) => a !== item));
    dispatch(setRemoveTags(item as string));
  };

  const handleAdd = () => {
    setError(false);
    if (tags) {
      const blogTags = `#${tags}`;
      setSelectedOptions([...selectedOptions, blogTags]);
      dispatch(setAddTags(blogTags as string));
      setError(false);
      setTags("");
    } else {
      setError(true);
      setSelectedOptions([...selectedOptions]);
    }
  };

  return (
    <div className="flex items-end justify-between bg-gray-200 px-4 py-2 rounded-xl">
      <div className="space-y-2">
        <div className="flex items-start gap-1 flex-wrap">
          {selectedOptions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedOptions?.map((tag: string) => (
                <p
                  key={tag}
                  className="px-3 py-1 rounded-full bg-primary dark:bg-gray-700 text-white text-xs"
                >
                  {tag}
                  {open && (
                    <button
                      onClick={() => handleRemove(tag)}
                      className="text-red-500 hover:text-red-700 ml-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">None specified</p>
          )}
        </div>
        {open && (
          <div className="space-y-1">
            <label>{label}</label>
            <div className="flex items-center gap-1">
              <input
                type="text"
                placeholder="type tag"
                value={tags}
                onChange={(e) => {
                  const value = e.target.value
                    .trim()
                    .replace(/[\s,.-]+/g, "_")
                    .replace(/_+/g, "_");
                  setTags(value);
                }}
                className={`peer px-2 py-1 rounded-xl  transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 ${
                  error ? "border border-red-600" : "border"
                }`}
              />
              <button
                onClick={handleAdd}
                className="text-blue-700 font-semibold"
              >
                Add
              </button>
            </div>
            <div className="flex items-center gap-10">
              <button
                onClick={() => {
                  setOpen(false);
                  setSelectedOptions(options as string[]);
                  dispatch(resetBlogInfo());
                  setTags("");
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
        )}
      </div>
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="text-red-600 text-lg "
        >
          <MdEdit />
        </button>
      )}
    </div>
  );
};

export default BlogArrayEditing;
