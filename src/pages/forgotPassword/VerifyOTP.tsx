/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useResetPasswordMutation,
  useSendOtpMutation,
} from "@/redux/features/auth/authApi";
import { logOut, setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TUserByEmail } from "./ForgotPassword";

const VerifyOTP = ({ userInfo }: { userInfo: TUserByEmail }) => {
  const [loading, setLoading] = useState(false);
  const [otpNum, setOtpNum] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const [sendOtp] = useSendOtpMutation();
  const dispatch = useAppDispatch();
  const [resetPassword] = useResetPasswordMutation();

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      setOtpNum(pastedData.split(""));
      pastedData.split("").forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = char;
        }
      });
      inputRefs.current[5]?.focus();
    }
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInfo) {
      return navigate("/sign-in");
    }
    const enteredOTP = otpNum.join("");
    if (enteredOTP.length !== 6) {
      toast.error("Please enter a valid OTP.");
      return;
    }
    const toastId = toast.loading("otp submitting....");
    try {
      const otp = {
        otp: enteredOTP,
      };
      const res = await resetPassword(otp).unwrap();
      if (res?.data) {
        dispatch(setUser({ token: res?.data }));
        toast.success("otp matched successfully", {
          id: toastId,
          duration: 3000,
        });
        navigate("/set-newPassword");
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const resendOTP = async () => {
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
        dispatch(setUser({ token: res?.data?.resetToken }));
        setLoading(false);
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
        <img
          src={userInfo?.profileImage || "/default-avatar.png"}
          alt={`${userInfo?.name?.firstName} ${userInfo?.name?.lastName}`}
          className="w-24 h-24 rounded-full mx-auto border-4 border-secondary shadow-md"
        />
        <h1 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
          {userInfo?.name?.firstName} {userInfo?.name?.lastName}
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
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-secondary outline-none rounded-lg dark:bg-gray-700 dark:text-white"
              />
            ))}
          </div>

          <button
            disabled={loading}
            className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary mt-4 text-white font-bold p-2 rounded-md duration-500 transition"
          >
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
