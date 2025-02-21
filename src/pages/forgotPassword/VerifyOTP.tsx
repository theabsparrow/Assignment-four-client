/* eslint-disable @typescript-eslint/no-explicit-any */
import useMyProfile from "@/hook/useMyProfile";
import {
  useForgetPasswordMutation,
  useResetPasswordMutation,
} from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { decodeToken } from "@/utills/decodeToken";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyOTP = () => {
  const { myProfile, refetch } =
    useMyProfile(["name", "profileImage", "email"]) || undefined;
  const [otpNum, setOtpNum] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const [forgetPassword] = useForgetPasswordMutation();
  const dispatch = useAppDispatch();
  const [resetPassword] = useResetPasswordMutation();

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otpNum];
    newOtp[index] = value;
    setOtpNum(newOtp);
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && otpNum[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resendOTP = async () => {
    let data;
    if (myProfile) {
      const email = myProfile.email;
      data = { email };
    }
    if (!data) {
      return navigate("/sign-in");
    }
    try {
      const res = await forgetPassword(data).unwrap();
      if (res.data) {
        const user = decodeToken(res.data);
        dispatch(setUser({ user, token: res.data }));
        toast.success("otp generated successfully", { duration: 3000 });
        await refetch();
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const toastId = toast.loading("otp submitting....");
    e.preventDefault();
    if (!myProfile) {
      return navigate("/sign-in");
    }
    const enteredOTP = otpNum.join("");
    if (enteredOTP.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      const otp = {
        otp: enteredOTP,
      };
      const res = await resetPassword(otp).unwrap();
      if (res.data) {
        const user = decodeToken(res.data);
        dispatch(setUser({ user, token: res.data }));
        toast.success("otp matched successfullt", {
          id: toastId,
          duration: 3000,
        });
        await refetch();
        navigate("/set-newPassword");
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h1 className="text-center text-xl text-red-400 dark:text-gray-900 flex justify-center items-center mb-2 bg-red-200 dark:bg-slate-700 px-2 py-2 rounded-xl font-bold">
          {myProfile?.name?.firstName} {myProfile?.name?.lastName}
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
          Enter OTP
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mt-6 flex justify-center space-x-2">
            {otpNum.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(index, e)}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 dark:border-gray-600 
                focus:ring-2 focus:ring-secondary outline-none rounded-lg dark:bg-gray-700 dark:text-white"
              />
            ))}
          </div>

          <button className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary mt-4 text-white font-bold p-2 rounded-md duration-500 transition">
            Verify OTP
          </button>
        </form>

        <div className="text-center mt-4 flex justify-center items-center space-x-3">
          <p className="text-gray-600 dark:text-gray-400">
            Didn’t receive a code?{" "}
          </p>
          <button
            onClick={resendOTP}
            className="text-blue-500 hover:scale-110 duration-500"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
