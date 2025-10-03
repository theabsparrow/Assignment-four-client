/* eslint-disable @typescript-eslint/no-explicit-any */

import { config } from "@/config";
import { TMyProfileQUery } from "@/interface/navbar.types";
import SignInFormInput from "@/myComponent/formInput/SignInFormInput";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useMyProfileQuery } from "@/redux/features/user/userApi";
import { useAppDispatch } from "@/redux/hooks";
import { decodeToken } from "@/utills/decodeToken";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type TSingInForm = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TSingInForm>();
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "navbar";
  const { data, refetch } = useMyProfileQuery(query);
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: TSingInForm) => {
    const toastId = toast.loading("signing in....");
    try {
      const res = await login(data).unwrap();
      const user = decodeToken(res.data);
      dispatch(setUser({ user, token: res.data }));
      toast.success("successfully signed in", { id: toastId, duration: 3000 });
      navigate("/my-profile");
      refetch();
      reset();
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const handleAdminSignIn = async () => {
    const loginInfo = {
      email: config.admin_email,
      password: config.admin_password,
    };
    const toastId = toast.loading("signing in....");
    try {
      const res = await login(loginInfo).unwrap();
      const user = decodeToken(res.data);
      dispatch(setUser({ user, token: res.data }));
      toast.success("successfully signed in", { id: toastId, duration: 3000 });
      navigate("/my-profile");
      refetch();
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const handleUserSignIn = async () => {
    const loginInfo = {
      email: config.user_email,
      password: config.user_password,
    };
    const toastId = toast.loading("signing in....");
    try {
      const res = await login(loginInfo).unwrap();
      const user = decodeToken(res.data);
      dispatch(setUser({ user, token: res.data }));
      toast.success("successfully signed in", { id: toastId, duration: 3000 });
      navigate("/my-profile");
      refetch();
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <div className="flex justify-center pt-10 lg:pt-20 min-h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 px-4 font-inter ">
      <div className=" p-6 dark:bg-gray-800 rounded-lg shadow-md h-[50%]">
        <div className="flex flex-col justify-center items-center mb-8 space-y-4">
          <button
            onClick={handleAdminSignIn}
            className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold shadow-md transition duration-300 ease-in-out"
          >
            Sign in as Admin
          </button>
          <button
            onClick={handleUserSignIn}
            className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 text-white font-semibold shadow-md transition duration-300 ease-in-out"
          >
            Sign in as User
          </button>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Sign in With <br /> Email and Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <SignInFormInput
            label="Email"
            name="email"
            placeholder="Enter your email address"
            type="email"
            register={register}
            required={true}
            error={errors.email}
          />
          <SignInFormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            register={register}
            required={true}
            error={errors.password}
          />
          <p className="text-blue-600 font-medium duration-500">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition"
          >
            Sign In
          </button>
        </form>
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
