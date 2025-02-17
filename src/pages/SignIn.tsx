/* eslint-disable @typescript-eslint/no-explicit-any */

import SignInFormInput from "@/myComponent/formInput/SignInFormInput";
import { FormProvider, useForm } from "react-hook-form";

const SignIn = () => {
  const methods = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 font-inter">
      <div className=" p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Sign in With <br /> Email and Password
        </h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <SignInFormInput
              label="Email"
              name="email"
              placeholder="Enter your email address"
              type="email"
              register={methods.register}
              required={true}
            />
            <SignInFormInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              register={methods.register}
              required={true}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
            >
              Sign In
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SignIn;
