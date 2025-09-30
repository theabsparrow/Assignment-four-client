import { useRef, useState } from "react";
import { FieldError, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { AiFillWarning } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "sonner";

interface ImageUploadProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  error?: FieldError | any;
  required?: boolean;
  setValue: UseFormSetValue<any>;
}

const MultipleImageUpload = ({
  name,
  label,
  register,
  error,
  required = false,
  setValue,
}: ImageUploadProps) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      if (imageFiles.length + newFiles.length > 5) {
        toast.error("can`t upload more than 5 photo");
        return;
      }
      const updatedFiles = [...imageFiles, ...newFiles];
      setImageFiles(updatedFiles);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
      setValue(name, updatedFiles, { shouldValidate: true });
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...imagePreviews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    setValue(name, updatedFiles, { shouldValidate: true });
  };

  return (
    <section className="relative">
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
        className="mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700"
        onClick={() => fileInputRef.current?.click()}
      >
        {imagePreviews.length > 0 ? (
          <div className="flex items-center  gap-1">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-full h-32 object-cover rounded-lg "
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

      {error?.message && (
        <span className="text-red-500 text-sm flex items-center gap-1">
          <AiFillWarning /> {error?.message as string}
        </span>
      )}
    </section>
  );
};

export default MultipleImageUpload;
