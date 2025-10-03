import { useState } from "react";
import { TFormInputProps } from "./formInput.type";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { AiFillWarning } from "react-icons/ai";

const SignInFormInput = ({
  label,
  name,
  type,
  placeholder,
  register,
  required = false,
  error,
}: TFormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type === "password" && showPassword ? "text" : type}
        {...register(name, {
          ...(required && { required: `${label} is required` }),

          ...(type === "email" && {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "enter a valid email address",
            },
          }),
        })}
        className={`mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
      />

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
      {error && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <AiFillWarning /> {error.message as string}
        </p>
      )}
    </div>
  );
};

export default SignInFormInput;
