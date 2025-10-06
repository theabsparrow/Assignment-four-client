import AcceptTermsInput from "@/myComponent/formInput/AcceptTermsInput";
import SignInFormInput from "@/myComponent/formInput/SignInFormInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillWarning } from "react-icons/ai";
type TPassword = {
  password: string;
};
const DelationSettings = () => {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TPassword>();

  const onSubmit = (data: TPassword) => {
    console.log(data);
  };
  return (
    <section>
      <h3 className="text-lg font-semibold flex justify-center items-center">
        Account deletion
      </h3>
      <div className="py-2 px-4 bg-red-100 dark:bg-gray-800 rounded-lg mt-4">
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={() => setOpen(!open)}
            className="text-lg font-bold text-secondary dark:text-gray-100 hover:scale-110 duration-500"
          >
            Delete Account
          </button>
        </div>
        {open && (
          <form onSubmit={handleSubmit(onSubmit)} className="w-72 space-y-4">
            <SignInFormInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              register={register}
              required={true}
              error={errors.password}
            />
            <div className=" font-medium text-lg text-secondary">
              <h1 className="flex items-center gap-1">
                {" "}
                <AiFillWarning />
                If you delete your account, all your information will be lost
                forever.{" "}
              </h1>
              <h1 className="flex items-center gap-1">
                {" "}
                <AiFillWarning /> Do you agree ?
              </h1>
            </div>
            <AcceptTermsInput
              register={register}
              name="acceptTerms"
              errors={errors}
              required={true}
              label="Yes I agree to delete"
            />

            <button
              disabled={isSubmitting}
              type="submit"
              className="flex items-center bg-red-500 px-2 py-1 rounded-lg hover:bg-red-600 duration-500 text-white"
            >
              Delete Account
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default DelationSettings;
