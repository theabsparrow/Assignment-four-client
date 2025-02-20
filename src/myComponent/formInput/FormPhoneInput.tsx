import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { TFormPhoneInputProps } from "./formInput.type";
import { Controller } from "react-hook-form";
import { AiFillWarning } from "react-icons/ai";

const FormPhoneInput = ({
  label,
  name,
  control,
  required = false,
}: TFormPhoneInputProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={required ? { required: "Phone number is required" } : {}}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="mt-1">
            <PhoneInput
              country={"bd"}
              value={value || ""}
              onChange={(phone) => {
                onChange(phone);
              }}
            />
            {error && !value && (
              <p className="text-red-500 text-sm mt-1">
                <AiFillWarning /> {error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default FormPhoneInput;
