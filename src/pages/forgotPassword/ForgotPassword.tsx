/* eslint-disable @typescript-eslint/no-explicit-any */
import FormInput from "@/myComponent/formInput/FormInput";
import {
  useForgetPasswordMutation,
  useSendOtpMutation,
} from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { decodeToken } from "@/utills/decodeToken";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [forgetPassword] = useForgetPasswordMutation();
  const [sendOtp] = useSendOtpMutation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await forgetPassword(data).unwrap();
      if (res?.data) {
        setOpen(true);
        setUserInfo(res.data);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  const handleSendOTP = async () => {
    setLoading(true);
    const loadingId = toast.loading("sending OTP", { duration: 3000 });
    try {
      const data = { id: userInfo?._id };
      const res = await sendOtp(data).unwrap();
      if (res?.data) {
        toast.success("otp sent successfully", {
          id: loadingId,
          duration: 3000,
        });
        dispatch(setUser({ token: res.data }));
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
    <section className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      {open ? (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
          <img
            src={userInfo?.profileImage}
            alt={userInfo?.name?.firstName}
            className="w-24 h-24 rounded-full mx-auto border-4 border-secondary shadow-md"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
            {userInfo?.name?.firstName} {userInfo?.name?.lastName}
          </h2>
          <div className="mt-6">
            <button
              disabled={loading}
              onClick={handleSendOTP}
              className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-md shadow hover:scale-105 duration-300"
            >
              Send OTP
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
            Forgot Password
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            Enter your email and we’ll send you an otp.
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
                {loading ? "Searching..." : "Search Your Profile"}
              </button>
            </form>
          </FormProvider>

          <div className="text-center mt-4 hover:scale-110 duration-500">
            <Link to="/sign-in" className="text-blue-500 ">
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default ForgotPassword;
