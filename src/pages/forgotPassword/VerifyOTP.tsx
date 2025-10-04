/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { TUserByEmail } from "./ForgotPassword";
import { FaArrowLeft } from "react-icons/fa";

type TVerifyOtpProps = {
  userInfo: TUserByEmail;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    otpNum: string[]
  ) => Promise<any>;
  resendOTP: (
    setLoad: React.Dispatch<React.SetStateAction<boolean>>,
    id: string
  ) => Promise<void>;
  handleLocalStorage: () => void;
  handleBackHome?: () => void;
};

const VerifyOTP = ({
  userInfo,
  handleSubmit,
  resendOTP,
  handleLocalStorage,
  handleBackHome,
}: TVerifyOtpProps) => {
  const [loading, setLoading] = useState(false);
  const [otpNum, setOtpNum] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-red-500">
        <div className="flex items-center justify-between">
          <button className="text-red-600" onClick={handleLocalStorage}>
            <FaArrowLeft />
          </button>
          {handleBackHome && (
            <button className="text-red-600" onClick={handleBackHome}>
              Back to home
            </button>
          )}
        </div>
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

        <form onSubmit={(e) => handleSubmit(e, otpNum)}>
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
            onClick={() => resendOTP(setLoading, userInfo?._id)}
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
