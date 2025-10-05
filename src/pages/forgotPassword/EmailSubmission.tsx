import InputType from "@/myComponent/formInput/InputType";
import { UseFormReturn } from "react-hook-form";
import { Link } from "react-router-dom";
import { TEmail } from "./forgetPassword.types";

type TEmailSubmitProps = {
  method: UseFormReturn<TEmail>;
  onSubmit: (data: any) => Promise<void>;
};

const EmailSubmission = ({ method, onSubmit }: TEmailSubmitProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = method;
  return (
    <section className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg ">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        Forgot Password
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
        Enter your email and we’ll send you an otp.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <InputType
          label="Email"
          name="email"
          register={register}
          error={errors.email}
          type="email"
          required={true}
        />
        <button
          type="submit"
          className="w-full bg-secondary mt-2 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Searching..." : "Search Your Profile"}
        </button>
      </form>

      <div className="text-center mt-4 hover:scale-110 duration-500">
        <Link to="/sign-in" className="text-blue-500 ">
          Back to Login
        </Link>
      </div>
    </section>
  );
};

export default EmailSubmission;
