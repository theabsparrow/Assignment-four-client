import { useState } from "react";
import { TFormInputProps } from "./formInput.type";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useFormContext } from "react-hook-form";

const SignInFormInput = ({
  label,
  name,
  type,
  placeholder,
  register,
  required,
}: TFormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
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
          errors[name] ? "border-red-500" : "border-gray-300"
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
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message as string}</p>
      )}
    </div>
  );
};

export default SignInFormInput;
