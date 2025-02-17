import { useState, useRef } from "react";
import { TFormInputProps } from "./formInput.type";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useFormContext } from "react-hook-form";

const FormInput = ({
  label,
  name,
  type,
  placeholder,
  register,
  maxLength,
  required,
  setValue,
}: TFormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageText, setImageText] = useState<string | null>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    formState: { errors },
  } = useFormContext();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageText(file?.name);
      setValue(name, file);
    }
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {type === "file" ? (
        <>
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
          <div
            className="mt-2 flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700"
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 px-2">
                <FaCloudUploadAlt className="text-3xl text-gray-500" />
                <p className="text-gray-500">upload profile photo</p>
              </div>
            )}
          </div>
          <p>
            {imageText && imageText.length > 15
              ? imageText.split(".")[0].slice(0, 15) +
                "..." +
                imageText.split(".")[1]
              : imageText}
          </p>
        </>
      ) : (
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          {...register(name, {
            ...(required && { required: `${label} is required` }),
            ...(maxLength && {
              maxLength: {
                value: maxLength,
                message: `${label} can't be more than ${maxLength} characters`,
              },
            }),
            ...(type === "password" && {
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                message:
                  "pass needs at least 8 chars with include one uppercase, lowercase, number & special char.",
              },
            }),
            ...(type === "email" && {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "enter a valid email address",
              },
            }),
            ...(type === "date" && {
              validate: (value) => {
                const birthDate = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                const isUnderage =
                  age < 18 ||
                  (age === 18 &&
                    today <
                      new Date(birthDate.setFullYear(today.getFullYear())));
                return !isUnderage || "You must be at least 18 years old.";
              },
            }),
          })}
          className={`mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white outline-none ${
            errors[name] ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={placeholder}
        />
      )}
      {type === "password" && (
        <span
          className="absolute top-9 right-3 cursor-pointer text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <IoEye className="text-xl" />
          ) : (
            <IoEyeOff className="text-xl" />
          )}
        </span>
      )}
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message as string}</p>
      )}
    </div>
  );
};

export default FormInput;
