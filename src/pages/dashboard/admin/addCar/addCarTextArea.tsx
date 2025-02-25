import { FieldErrors, UseFormRegister } from "react-hook-form";

type TextAreaProps = {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  validationRules?: object;
};

const TextArea = ({
  name,
  label,
  placeholder,
  rows = 3,
  register,
  errors,
  validationRules,
}: TextAreaProps) => {
  return (
    <div className="w-full font-inter">
      <label className="block font-semibold">*{label}:</label>
      <textarea
        {...register(name, validationRules)}
        placeholder={placeholder}
        rows={rows}
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
