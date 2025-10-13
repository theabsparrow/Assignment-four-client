import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Controller } from "react-hook-form";

export type TFormPhoneInputProps = {
  label: string;
  name: string;
  control: any;
  error?: string | undefined;
  required?: boolean;
  useExistingNumber?: boolean;
};

const FormPhoneInput = ({
  label,
  name,
  control,
  required = false,
  useExistingNumber,
}: TFormPhoneInputProps) => {
  return (
    <div className="flex flex-col">
      <label className="block text-sm font-semibold text-gray-200 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={
          required && required === true
            ? { required: "Phone number is required" }
            : {}
        }
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div
            className={`rounded-md  ${
              error ? "border-2 border-red-500" : "border border-gray-300"
            }`}
          >
            <PhoneInput
              country={"bd"}
              value={value || ""}
              onChange={(phone) => {
                onChange(phone);
              }}
              disabled={useExistingNumber}
              inputStyle={{
                backgroundColor: "transparent",
                color: "white",
                width: "100%",
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default FormPhoneInput;
