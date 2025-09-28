import FormInput from "@/myComponent/formInput/FormInput";
import { FormProvider, useForm } from "react-hook-form";

const SetPassword = ({
  onSubmit,
}: {
  onSubmit: (data: any) => Promise<string | number | undefined>;
}) => {
  const methods = useForm();
  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
        Set New Password
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
        Enter a new password for your account
      </p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-6">
          <div className="mb-4 space-y-4">
            <FormInput
              label=" New Password"
              name="newPassword"
              type="password"
              placeholder="Enter your new password"
              register={methods.register}
              required={true}
            />
            <FormInput
              label="Confirm New Password"
              name="confirmPass"
              type="password"
              placeholder="confirm your new password"
              register={methods.register}
              required={true}
            />
          </div>

          <button
            disabled={methods.formState.isSubmitting}
            type="submit"
            className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary mt-4 text-white font-bold p-2 rounded-md duration-500 transition"
          >
            Update Password
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SetPassword;
