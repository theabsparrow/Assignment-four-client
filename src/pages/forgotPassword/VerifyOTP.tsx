/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import TimerComponent from "./TimerComponent";
import { TVerifyOtpProps } from "./forgetPassword.types";
import profileIcon from "../../assets/profile-photo.png";

const VerifyOTP = ({
  userInfo,
  timerRef,
  loading,
  handleSubmit,
  resendOTP,
  handleLocalStorage,
  handleBackHome,
  handleSkip,
}: TVerifyOtpProps) => {
  const [otpNum, setOtpNum] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isExpired, setIsExpired] = useState(false);

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
    <section className="w-full max-w-xl bg-white/35 dark:bg-gray-800/60 p-3 md:p-10 lg:p-6 rounded-2xl shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        {handleLocalStorage && (
          <button
            className="text-red-600"
            onClick={() => handleLocalStorage(setIsExpired)}
          >
            <FaArrowLeft />
          </button>
        )}

        {handleBackHome && (
          <button
            className="text-red-600"
            onClick={() => handleBackHome(setIsExpired)}
          >
            Back to home
          </button>
        )}
      </div>
      <div>
        {userInfo?.profileImage ? (
          <img
            src={userInfo?.profileImage}
            alt={`${userInfo?.name?.firstName} ${userInfo?.name?.lastName}`}
            className="w-24 h-24 rounded-full mx-auto  shadow-md"
          />
        ) : (
          <img
            src={profileIcon}
            alt={`${userInfo?.name?.firstName} ${userInfo?.name?.lastName}`}
            className="w-24 h-24 rounded-full mx-auto  shadow-md"
          />
        )}

        <h1 className=" text-xl flex justify-center font-bold text-gray-800 dark:text-white">
          {userInfo?.name?.firstName} {userInfo?.name?.lastName}
        </h1>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
          Enter OTP
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center ">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e, otpNum, setIsExpired)}
        className="space-y-4"
      >
        <div className=" flex justify-center gap-2 md:gap-4">
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
              className="w-12 h-12 text-center text-xl font-semibold border border-gray-600
                focus:ring-2 focus:ring-secondary outline-none rounded-lg dark:bg-gray-700 dark:text-white"
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          {handleSkip && (
            <button
              disabled={loading}
              type="button"
              onClick={() => handleSkip(setIsExpired)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Skip
            </button>
          )}

          <div className="flex items-center gap-10">
            <button
              type="button"
              disabled={!isExpired || loading}
              onClick={() => resendOTP(setIsExpired)}
              className="bg-gray-900 text-gray-200 font-bold p-2 rounded-md duration-500 transition disabled:cursor-not-allowed disabled:bg-gray-500"
            >
              Resend OTP
            </button>
            <button
              type="submit"
              disabled={loading}
              className=" bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition"
            >
              Verify OTP
            </button>
          </div>
        </div>
      </form>
      <div>
        <TimerComponent ref={timerRef} setIsExpired={setIsExpired} />
      </div>
    </section>
  );
};

export default VerifyOTP;
