/* eslint-disable @typescript-eslint/no-explicit-any */
import useMyProfile from "@/hook/useMyProfile";
import FormInput from "@/myComponent/formInput/FormInput";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { decodeToken } from "@/utills/decodeToken";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [forgetPassword] = useForgetPasswordMutation();
  const dispatch = useAppDispatch();
  const { refetch } = useMyProfile();
  const [loading, setLoading] = useState(false);
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await forgetPassword(data).unwrap();
      if (res.data) {
        const user = decodeToken(res.data);
        dispatch(setUser({ user, token: res.data }));
        setLoading(false);
        toast.success("otp generated successfully", { duration: 3000 });
        await refetch();
        navigate("/verify-otp");
      }
    } catch (error: any) {
      setLoading(false);
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
          Forgot Password
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
          Enter your email and we’ll send you a reset link.
        </p>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-6">
            <FormInput
              label="Email"
              name="email"
              placeholder="Enter your email address"
              type="email"
              register={methods.register}
              required={true}
            />

            <button
              type="submit"
              className="w-full bg-secondary mt-2 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset otp"}
            </button>
          </form>
        </FormProvider>
        <div className="text-center mt-4 hover:scale-110 duration-500">
          <Link to="/sign-in" className="text-blue-500 ">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
