import { FieldError, UseFormRegister, UseFormWatch } from "react-hook-form";

interface TextAreaTypeProps {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  rows?: number;
  watch?: UseFormWatch<any>;
}

const InputTextArea = ({
  label,
  name,
  placeholder,
  register,
  error,
  required = false,
  rows = 4,
  watch,
}: TextAreaTypeProps) => {
  const value: string = watch ? watch(name) || "" : "";
  const length = value.length;
  return (
    <section className="w-full font-inter space-y-1">
      <label className="block text-sm font-semibold text-gray-200 ">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div>
        <textarea
          rows={rows}
          {...register(name, {
            ...(required && { required: `${name} is required` }),
            minLength: {
              value: 10,
              message: `${label} must be at least 10 characters`,
            },
            maxLength: {
              value: 500,
              message: `${label} must be at most 500 characters`,
            },
          })}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
          className={`peer w-full px-4 py-2 rounded-xl border transition-all duration-300 outline-none resize-none
            bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-300"
                : "border border-gray-300 dark:border-gray-600 "
            }`}
        />
        <div className="flex justify-end text-xs text-gray-500 dark:text-gray-400">
          {length}/500
        </div>
      </div>
    </section>
  );
};

export default InputTextArea;
