import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AiFillWarning } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";

interface ImageUploadProps {
  name: string;
  label: string;
  required?: boolean;
}

const MultipleImageUpload = ({ name, label, required }: ImageUploadProps) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newFiles = Array.from(files);
      if (imageFiles.length + newFiles.length > 5) {
        setError(name, {
          type: "manual",
          message: `You can only upload up to 5 images.`,
        });
        return;
      }
      clearErrors(name);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
      setValue(name, [...imageFiles, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...imagePreviews];

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    setValue(name, updatedFiles);
    clearErrors(name);
  };

  return (
    <>
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          {...register(name, {
            ...(required && { required: `${label} is required` }),
          })}
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <div
          className="mt-2 flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700"
          onClick={() => fileInputRef.current?.click()}
        >
          {imagePreviews.length > 0 ? (
            <div className="flex items-center  gap-1">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover rounded-lg hover:scale-110 duration-500"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation(), removeImage(index);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 px-2">
              <FaCloudUploadAlt className="text-3xl text-gray-500" />
              <p className="text-gray-500">Upload car photos</p>
            </div>
          )}
        </div>

        {errors[name]?.message && (
          <span className="text-red-500 text-sm flex items-center gap-1">
            <AiFillWarning /> {errors[name]?.message as string}
          </span>
        )}
      </div>
    </>
  );
};

export default MultipleImageUpload;
