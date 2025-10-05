import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AiFillWarning } from "react-icons/ai";
import { Link } from "react-router-dom";

interface ITermsCheckboxProps {
  register: UseFormRegister<any>;
  name: string;
  errors?: FieldErrors;
  required?: boolean;
}

const AcceptTermsInput = ({
  register,
  name,
  errors,
  required = false,
}: ITermsCheckboxProps) => {
  return (
    <section className="mt-4 font-inter">
      <label className="flex items-start space-x-2 cursor-pointer">
        {errors?.[name] && <AiFillWarning className="text-red-600 text-xl" />}
        <input
          type="checkbox"
          {...register(name, {
            ...(required && { required: `${name} is required` }),
          })}
          className="accent-green-600 mt-1 w-4 h-4"
        />
        <span className="text-gray-200">
          I agree to the{" "}
          <Link
            to="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline font-semibold"
          >
            Terms & Conditions
          </Link>
        </span>
      </label>
    </section>
  );
};

export default AcceptTermsInput;
