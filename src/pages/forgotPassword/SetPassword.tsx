import InputType from "@/myComponent/formInput/InputType";
import { UseFormReturn } from "react-hook-form";
import { TSetNewPass } from "./SetNewPassword";
import { FaArrowLeft } from "react-icons/fa";

type TsetNewPasswordProps = {
  method: UseFormReturn<TSetNewPass>;
  onSubmit: (data: TSetNewPass) => Promise<void>;
  handleClose?: () => void;
};

const SetPassword = ({
  method,
  onSubmit,
  handleClose,
}: TsetNewPasswordProps) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = method;

  return (
    <section className="w-full max-w-md bg-white/35 dark:bg-gray-800/60 p-6 rounded-2xl shadow-lg space-y-6 ">
      {handleClose && (
        <button className="text-red-600" onClick={() => handleClose()}>
          <FaArrowLeft />
        </button>
      )}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
          Set New Password
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
          Enter a new password for your account
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 space-y-4">
          <InputType
            label="Password"
            name="newPassword"
            register={register}
            error={errors.newPassword}
            type="password"
            required={true}
          />
          <InputType
            label="Confirm Password"
            name="confirmPass"
            register={register}
            error={errors.confirmPass}
            type="password"
            required={true}
            validateMatch={watch("newPassword")}
          />
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary mt-4 text-white font-bold p-2 rounded-md duration-500 transition"
        >
          Reset Password
        </button>
      </form>
    </section>
  );
};

export default SetPassword;
