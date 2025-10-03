import { FieldError, Merge, UseFormRegister } from "react-hook-form";

type TCheckboxGroupProps = {
  label: string;
  register: UseFormRegister<any>;
  options: string[];
  name: string;
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
  required?: boolean;
};

const InputCheckboxArray = ({
  label,
  register,
  options,
  name,
  error,
  required = false,
}: TCheckboxGroupProps) => {
  return (
    <section className=" font-inter">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {options.map((allergy) => (
          <label
            key={allergy}
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-md px-3 py-2 border border-gray-300 dark:border-gray-600 hover:border-primary transition-all cursor-pointer"
          >
            <input
              type="checkbox"
              value={allergy}
              {...register(name, {
                ...(required && { required: `${name} are required` }),
              })}
              className="accent-green-700 w-4 h-4"
            />
            <span className="text-gray-800 dark:text-gray-100">{allergy}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">
          {Array.isArray(error) ? error.find((e) => e)?.message : error.message}
        </p>
      )}
    </section>
  );
};

export default InputCheckboxArray;
