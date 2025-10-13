import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@/myComponent/formInput/FormInput";
import { imageUpload } from "@/utills/uploadImage";
import { toast } from "sonner";
import { useAddBlogMutation } from "@/redux/features/blog/blogApi";

export type TBlogStatus = "draft" | "published";

const CreateBlog = () => {
  const [open, setOpen] = useState(false);
  const methods = useForm();
  const [addBlog] = useAddBlogMutation();

  const onSubmit = async (data: any) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => {
        if (value === undefined || value === null) return false;
        if (typeof value === "string" && value.trim() === "") return false;
        return true;
      })
    );

    if (filteredData?.tags) {
      const tags = filteredData?.tags as string;
      const tagsArray = tags
        .split(",")
        .map((item) => `#${item.trim()}`)
        .filter((item) => item);
      filteredData.tags = tagsArray;
    }
    const toastId = toast.loading("blog data uploading.....");
    try {
      if (data?.image) {
        const imageUrl = await imageUpload(data.image);
        if (!imageUrl) {
          toast.error("faild to upload image", { duration: 3000 });
          return;
        }
        filteredData.image = imageUrl;
      }
      const res = await addBlog(filteredData).unwrap();
      if (res?.data) {
        toast.success("blog posted successfully ", {
          id: toastId,
          duration: 3000,
        });
        setOpen(false);
        methods.reset();
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.errorSource[0].message ||
        error?.data?.message ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const handlePublish = () => {
    methods.setValue("status", "published");
    methods.handleSubmit(onSubmit)();
  };

  const handleDraft = () => {
    methods.setValue("status", "draft");
    methods.handleSubmit(onSubmit)();
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-full max-w-2xl relative shadow-xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => {
                setOpen(false);
                methods.reset();
              }}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Create Blog
            </h2>
            <FormProvider {...methods}>
              <form className="flex flex-col space-y-4">
                <FormInput
                  label="Title"
                  name="title"
                  placeholder="Your blog title"
                  type="text"
                  maxLength={50}
                  register={methods.register}
                  required={true}
                />

                <div className="mb-4">
                  <label
                    htmlFor="specialEquipments"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tags (Optional)
                  </label>
                  <input
                    id="specialEquipments"
                    type="text"
                    placeholder="e.g. car, model, best"
                    {...methods.register("tags")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm placeholder-gray-400"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate items with commas ( , )
                  </p>
                  {methods.formState.errors.tags && (
                    <p className="text-red-500 text-sm mt-1">
                      {
                        methods.formState.errors.specialEquipments
                          ?.message as string
                      }
                    </p>
                  )}
                </div>
                <div className="flex justify-between gap-4 mt-4">
                  <button
                    type="button"
                    onClick={handlePublish}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Publish
                  </button>
                  <button
                    type="button"
                    onClick={handleDraft}
                    className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                  >
                    Save as Draft
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBlog;
