import { TFormSelectProps } from "./formInput.type";

const FormSelect = ({
  label,
  name,
  options,
  register,
  error,
  required,
}: TFormSelectProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        {...register(name, {
          ...(required && { required: `${label} is required` }),
        })}
        className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormSelect;
