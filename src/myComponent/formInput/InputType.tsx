import { FieldError, UseFormRegister } from "react-hook-form";

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
  return (
    <div className="w-full font-inter">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          {...register(name, {
            ...(required && { required: `${label} is required` }),
          })}
          className={`peer w-full px-4 py-2 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 ${
            error
              ? "border-2 border-red-500 focus:border-red-500 focus:ring-red-300"
              : "border border-gray-300 dark:border-gray-600 "
          }`}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );
};

export default InputType;
