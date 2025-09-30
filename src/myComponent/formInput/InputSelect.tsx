import { FieldError, UseFormRegister } from "react-hook-form";

type TInputSelectProps = {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  error?: FieldError;
  options: string[];
  required?: boolean;
};

const InputSelect = ({
  register,
  name,
  label,
  error,
  options,
  required = false,
}: TInputSelectProps) => {
  return (
    <section className="w-full">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          {...register(name, {
            ...(required && { required: `${label} is required` }),
          })}
          className={`block w-full appearance-none px-4 py-2 rounded-xl outline-none 
            bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
            transition-all duration-500 pr-10 border-2
            ${
              error &&
              "border-2 border-red-500 focus:border-red-500 focus:ring-red-300"
            }`}
        >
          <option value="">{label}</option>
          {options
            .slice()
            .sort((a, b) => a.localeCompare(b))
            .map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.084l3.71-3.854a.75.75 0 111.08 1.04l-4.24 4.396a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
        </svg>
      </div>
    </section>
  );
};

export default InputSelect;
