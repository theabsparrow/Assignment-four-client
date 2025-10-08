import { useEffect, useRef, useState } from "react";
import VerifyOTP from "../forgotPassword/VerifyOTP";
import {
  TTimerhandler,
  TUserByEmail,
} from "../forgotPassword/forgetPassword.types";
import { TSettingExtendType } from "./Settings";
import { toast } from "sonner";
import {
  useClearCookieMutation,
  useResendOTPMutation,
  useVerifyEmailMutation,
} from "@/redux/features/user/userApi";
import { useLocation } from "react-router-dom";

const VerifyEmail = ({ profileInfo }: { profileInfo: TSettingExtendType }) => {
  // local state
  const [open, setOpen] = useState(() =>
    JSON.parse(localStorage.getItem("verifyOTP") || "false")
  );
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<TTimerhandler>(null);
  const location = useLocation();
  //   redux state
  const [verifyEmail] = useVerifyEmailMutation();
  const [sendOtp] = useResendOTPMutation();
  const [clearCookie] = useClearCookieMutation();

  useEffect(() => {
    localStorage.setItem("verifyOTP", JSON.stringify(open));
  }, [open]);

  useEffect(() => {
    const currentPath = location.pathname;
    return () => {
      if (location.pathname !== currentPath) {
        localStorage.removeItem("verifyOTP");
        localStorage.removeItem("otpExpiry");
      }
    };
  }, [location.pathname]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    otpNum: string[],
    setIsExpired: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    e.preventDefault();
    setLoading(true);
    const enteredOTP = otpNum.join("");
    if (enteredOTP.length !== 6) {
      toast.error("Please enter a valid OTP.");
      setLoading(false);
      return;
    }
    const toastId = toast.loading("otp submitting....");
    try {
      const otp = {
        otp: enteredOTP,
      };
      const res = await verifyEmail(otp).unwrap();
      if (res?.success) {
        toast.success("Email verified successfully", {
          id: toastId,
          duration: 3000,
        });
        localStorage.removeItem("verifyOTP");
        localStorage.removeItem("otpExpiry");
        setOpen(false);
        setIsExpired(true);
        setLoading(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
      setLoading(false);
    }
  };

  const resendOTP = async (
    setIsExpired: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    const loadingId = toast.loading("sending OTP", { duration: 3000 });
    try {
      const res = await sendOtp(undefined).unwrap();
      if (res?.success) {
        toast.success("otp sent successfully", {
          id: loadingId,
          duration: 3000,
        });
        setLoading(false);
        setIsExpired(false);
        timerRef.current?.reset();
      }
    } catch (error: any) {
      setLoading(false);
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  const handleSkip = async (
    setIsExpired: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const result = await clearCookie(undefined).unwrap();
    if (result?.success) {
      localStorage.removeItem("verifyOTP");
      localStorage.removeItem("otpExpiry");
      setOpen(false);
      setIsExpired(true);
    }
  };

  return (
    <section>
      <button
        onClick={() => {
          setOpen(true);
          localStorage.setItem("verifyOTP", JSON.stringify(open));
        }}
        className="text-white text-xs lg:text-sm bg-secondary px-1 lg:px-2 py-1 rounded-lg"
      >
        Verify Email
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <VerifyOTP
            userInfo={profileInfo as TUserByEmail}
            timerRef={timerRef}
            loading={loading}
            handleSubmit={handleSubmit}
            resendOTP={resendOTP}
            handleSkip={handleSkip}
          />
        </div>
      )}
    </section>
  );
};

export default VerifyEmail;
