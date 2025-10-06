import InputType from "@/myComponent/formInput/InputType";
import SignInFormInput from "@/myComponent/formInput/SignInFormInput";
import { useForm } from "react-hook-form";
type TPasswordSettings = {
  oldPassword: string;
  newPassword: string;
  confirmPass: string;
};

const PasswordSettings = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TPasswordSettings>();

  const onSubmit = async (data: TPasswordSettings) => {
    console.log(data);
  };

  return (
    <section className="space-y-2 bg-gray-500 dark:bg-gray-800 rounded-lg py-4">
      <h3 className="text-lg font-semibold text-white dark:text-gray-100 flex justify-center items-center">
        Password Settings
      </h3>
      <div className="px-2 lg:px-20 py-4 rounded-lg space-y-4 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-72 space-y-6 mx-auto"
        >
          <SignInFormInput
            label=" Old Password"
            name="oldPassword"
            type="password"
            placeholder="Enter your old password"
            register={register}
            required={true}
            error={errors.oldPassword}
          />
          <InputType
            label="New Password"
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
          <button
            disabled={isSubmitting}
            type="submit"
            className="flex items-center bg-red-500 px-2 py-1 rounded-lg hover:bg-red-600 duration-500 text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default PasswordSettings;
