import { useFormContext } from "react-hook-form";
import { TFormSelectProps } from "./formInput.type";
import { AiFillWarning } from "react-icons/ai";

const FormSelect = ({
  label,
  name,
  options,
  register,
  required,
  setValue,
  clearErrors,
}: TFormSelectProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (setValue) setValue(name, value);
    if (clearErrors) clearErrors(name);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        {...register(name, {
          ...(required && { required: `${label} is required` }),
        })}
        onChange={handleChange}
        className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white outline-none"
      >
        {options.map((option) => (
          <option key={option.value as string} value={option.value as string}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <AiFillWarning /> {errors[name].message as string}
        </p>
      )}
    </div>
  );
};

export default FormSelect;
