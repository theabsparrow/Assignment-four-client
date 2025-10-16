import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddBlogMutation } from "@/redux/features/blog/blogApi";
import InputType from "@/myComponent/formInput/InputType";
import { TBlog } from "@/interface/blogInterface/blog.interface";
import InputTextArea from "@/myComponent/formInput/InputTextArea";
import InputImage from "@/myComponent/formInput/InputImage";
import { imageUpload } from "@/utills/uploadImage";
import { toast } from "sonner";

const CreateBlog = () => {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TBlog>();
  const [addBlog] = useAddBlogMutation();

  const onSubmit = async (data: TBlog) => {
    if (data?.tags) {
      const tags = data?.tags as string;
      const tagsArray = tags
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
        .map((item) => `#${item}`);
      data.tags = tagsArray as string[];
    }
    try {
      if (data?.image as File) {
        const blogImage = await imageUpload(data?.image as File);
        if (!blogImage) {
          toast.error("faild to upload image", { duration: 3000 });
          return;
        }
        data.image = blogImage as string;
      }
      const res = await addBlog(data).unwrap();
      if (res?.success) {
        toast.success("car info uploaded successfully ", {
          duration: 3000,
        });
        reset();
        setOpen(false);
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

  return (
    <div>
      <div className="flex justify-end ">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Post a Blog
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-500 p-4 rounded-2xl w-[90vw] lg:w-2xl shadow-xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col lg:space-y-2"
            >
              <InputType
                label="Title"
                name="title"
                register={register}
                error={errors.title}
                required={true}
              />
              <InputTextArea
                label="Content"
                name="content"
                placeholder="write your blog content"
                register={register}
                error={errors.content}
                required={true}
                watch={watch}
                max={5000}
                min={50}
              />
              <InputImage
                name={"image"}
                label={"Image"}
                register={register}
                error={errors.image}
                setValue={setValue}
              />
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-1">
                  Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  placeholder="e.g. sedan, suv, car"
                  {...register("tags", {})}
                  className="peer w-full px-4 py-2 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate items with commas ( , )
                </p>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-1 lg:py-2 rounded-xl bg-gray-700 hover:bg-gray-800 text-white/80 duration-500"
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="px-2 py-1 lg:px-4 lg:py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white duration-500"
                >
                  {isSubmitting ? "Posting" : "Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBlog;
