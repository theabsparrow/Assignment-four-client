import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { TFormPhoneInputProps } from "./formInput.type";
import { Controller } from "react-hook-form";

const FormPhoneInput = ({
  label,
  name,
  control,
  required = false,
}: TFormPhoneInputProps) => {
  return (
    <div className="flex flex-col">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={required ? { required: "Phone number is required" } : {}}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div
            className={`mt-1 rounded-md overflow-hidden ${
              error ? "border-2 border-red-500" : "border border-gray-300"
            }`}
          >
            <PhoneInput
              country={"bd"}
              value={value || ""}
              onChange={(phone) => {
                onChange(phone);
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default FormPhoneInput;
