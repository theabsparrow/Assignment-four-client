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
    <section className="flex justify-center bg-gray-100 dark:bg-gray-900 lg:px-4 font-inter py-10 lg:py-20">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4 ">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:gap-20">
          <button
            onClick={handleAdminSignIn}
            className=" px-3 py-2 rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold shadow-md transition duration-300 ease-in-out"
          >
            Login as Admin
          </button>
          <button
            onClick={handleUserSignIn}
            className=" px-3 py-2 rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold shadow-md transition duration-300 ease-in-out"
          >
            Login as User
          </button>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login to your account
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
            Login
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
    </section>
  );
};

export default SignIn;
