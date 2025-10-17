import { FieldError, UseFormRegister, UseFormWatch } from "react-hook-form";

interface TextAreaTypeProps {
  label?: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  rows?: number;
  watch?: UseFormWatch<any>;
  max?: number;
  min?: number;
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
  max = 500,
  min = 10,
}: TextAreaTypeProps) => {
  const value: string = watch ? watch(name) || "" : "";
  const length = value.length;
  return (
    <section className="w-full font-inter space-y-1 ">
      {label && (
        <label className="block text-sm font-semibold text-gray-200 ">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div>
        <textarea
          rows={rows}
          {...register(name, {
            ...(required && { required: `${name} is required` }),
            minLength: {
              value: min,
              message: `${label} must be at least 10 characters`,
            },
            maxLength: {
              value: max,
              message: `${label} must be at most 500 characters`,
            },
          })}
          placeholder={
            placeholder || `Enter your ${label ? label.toLowerCase() : "value"}`
          }
          className={`peer w-full px-4 py-2 rounded-xl border-2 transition-all duration-300 outline-none resize-none
            bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-300"
                : " border-gray-300 dark:border-gray-600 "
            }`}
        />
        {watch && (
          <div className="flex justify-end text-xs text-gray-200">
            {length}/ {max}
          </div>
        )}
      </div>
    </section>
  );
};

export default InputTextArea;
