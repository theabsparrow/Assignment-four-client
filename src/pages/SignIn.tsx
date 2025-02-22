/* eslint-disable @typescript-eslint/no-explicit-any */

import useMyProfile from "@/hook/useMyProfile";
import SignInFormInput from "@/myComponent/formInput/SignInFormInput";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";

import { useAppDispatch } from "@/redux/hooks";
import { decodeToken } from "@/utills/decodeToken";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignIn = () => {
  const methods = useForm();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { refetch } = useMyProfile();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("signing in....");
    const loginInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await login(loginInfo).unwrap();

      const user = decodeToken(res.data);
      dispatch(setUser({ user, token: res.data }));
      toast.success("successfully signed in", { id: toastId, duration: 3000 });
      await refetch();
      navigate("/");
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };
  return (
    <div className="flex justify-center pt-10 lg:pt-20 min-h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 px-4 font-inter ">
      <div className=" p-6 dark:bg-gray-800 rounded-lg shadow-md h-[50%]">
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
            <p className="text-blue-600 font-medium duration-500">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <button
              type="submit"
              className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition"
            >
              Sign In
            </button>
          </form>
        </FormProvider>
        <div className="mt-2">
          <p>
            New to this site?{" "}
            <Link
              className="text-blue-600 font-bold hover:scale-125 duration-500"
              to="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
