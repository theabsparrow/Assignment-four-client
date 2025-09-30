import { X } from "lucide-react";
import { useRef, useState } from "react";
import { FieldError, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";

interface IInputImageProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  error?: FieldError | any;
  required?: boolean;
  setValue: UseFormSetValue<any>;
}

const InputImage = ({
  name,
  label,
  register,
  error,
  required = false,
  setValue,
}: IInputImageProps) => {
  const [imageFile, setImageFile] = useState<File | "">("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      setImageFile(file);
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      setValue(name, file, { shouldValidate: true });
    }
  };

  const handleRemove = () => {
    setImageFile("");
    setImagePreview("");
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <section className="relative">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        type="file"
        accept="image/*"
        {...register(name, {
          ...(required && { required: `${label} is required` }),
        })}
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      {imagePreview ? (
        <div className="relative w-48 rounded-md overflow-hidden border border-dashed border-gray-300">
          <img src={imagePreview} alt={`Car image`} />
          <button
            type="button"
            onClick={handleRemove}
            className="bg-red-300 hover:bg-red-400 absolute -top-0 -right-0 w-6 h-6 p-0 rounded-full cursor-pointer"
          >
            <X className="w-4 h-4 mx-auto" />
          </button>
        </div>
      ) : (
        <div
          className={`md:w-[13vw] w-[40vw] h-28 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer bg-white dark:bg-gray-800 transition ${
            error
              ? "border-red-500"
              : "border-gray-600 dark:border-gray-600 hover:border-primary"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-2 px-2">
            <FaCloudUploadAlt className="text-3xl text-gray-500" />
            <p className="text-gray-500">Upload car photos</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default InputImage;
