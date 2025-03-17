import { FieldErrors, useFormContext, UseFormRegister } from "react-hook-form";

type TextAreaProps = {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  clearErrors?: (name: string) => void;
};

const TextArea = ({
  name,
  label,
  placeholder,
  rows = 3,
  register,
  errors,
  clearErrors,
}: TextAreaProps) => {
  const { setValue } = useFormContext();
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValue(name, value, { shouldValidate: true });
    if (clearErrors) clearErrors(name);
  };
  return (
    <div className="w-full font-inter">
      <label className="block font-semibold">*{label}:</label>
      <textarea
        {...register(name, {
          required: "This field is required",
          minLength: {
            value: 10,
            message: "Must be at least 10 characters",
          },
        })}
        placeholder={placeholder}
        rows={rows}
        onChange={handleChange}
        className="w-full border p-2 rounded bg-white dark:bg-gray-800 outline-none dark:text-white focus:ring focus:ring-blue-300"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default TextArea;
