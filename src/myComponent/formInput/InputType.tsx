import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

type TInputTypeProps = {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?: string;
  required?: boolean;
  validateMatch?: string | boolean;
};

const InputType = ({
  label,
  name,
  placeholder = "",
  register,
  error,
  type = "text",
  required = false,
}: TInputTypeProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full font-inter relative">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          {...register(name, {
            ...(required && { required: `${label} is required` }),
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
                if (label !== "Service Date") {
                  const isUnderage =
                    age < 18 ||
                    (age === 18 &&
                      today <
                        new Date(birthDate.setFullYear(today.getFullYear())));
                  return !isUnderage || "You must be at least 18 years old.";
                }
              },
            }),
            ...(type === "password" && {
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                message:
                  "pass needs at least 8 chars with include one uppercase, lowercase, number & special char.",
              },
            }),
          })}
          className={`peer w-full px-4 py-2 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 ${
            error
              ? "border-2 border-red-500 focus:border-red-500 focus:ring-red-300"
              : "border border-gray-300 dark:border-gray-600 "
          }`}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        />
        {type === "password" && (
          <span
            className="absolute top-3 right-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <IoEye className="text-xl" />
            ) : (
              <IoEyeOff className="text-xl" />
            )}
          </span>
        )}
      </div>
      {type === "password" && error && (
        <p className="text-red-700">{error?.message}</p>
      )}
    </div>
  );
};

export default InputType;
