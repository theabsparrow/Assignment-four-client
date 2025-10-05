/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { TUserInfo } from "@/interface/userInterface/userInfo";
import {
  useClearCookieMutation,
  useMyProfileQuery,
  useResendOTPMutation,
  useVerifyEmailMutation,
} from "@/redux/features/user/userApi";
import { TMyProfileQUery } from "@/interface/navbar.types";
import { useLocation, useNavigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import VerifyOTP from "@/pages/forgotPassword/VerifyOTP";
import { toast } from "sonner";
import {
  TTimerhandler,
  TUserByEmail,
} from "@/pages/forgotPassword/forgetPassword.types";

const SignUp = () => {
  // redux storage
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "navbar";
  const { data, refetch } = useMyProfileQuery(query);
  const user = data?.data || {};
  const [sendOtp] = useResendOTPMutation();
  const [verifyEmail] = useVerifyEmailMutation();
  const [clearCookie] = useClearCookieMutation();
  // local storage
  const [otpPage, setOtpPage] = useState(() =>
    JSON.parse(localStorage.getItem("otpPage") || "false")
  );
  const [userData, setUserData] = useState<TUserByEmail | null>(() =>
    JSON.parse(localStorage.getItem("userData") || "null")
  );
  const timerRef = useRef<TTimerhandler>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm<TUserInfo>();

  // side effect run
  useEffect(() => {
    localStorage.setItem("otpPage", JSON.stringify(otpPage));
  }, [otpPage]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  // --- clear data when navigating away ---
  useEffect(() => {
    const currentPath = location.pathname;
    return () => {
      if (location.pathname !== currentPath) {
        localStorage.removeItem("otpPage");
        localStorage.removeItem("userData");
      }
    };
  }, [location.pathname]);

  // handler function
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    otpNum: string[],
    setIsExpired: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    e.preventDefault();
    if (!userData) {
      toast.error("something went wrong.");
      return;
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
      const res = await verifyEmail(otp).unwrap();
      if (res?.data) {
        toast.success("Email verified successfully", {
          id: toastId,
          duration: 3000,
        });
        navigate("/my-profile");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("openOTP");
        setUserData(null);
        setOtpPage(false);
        setIsExpired(true);
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const resendOTP = async ({
    setLoad,
    setIsExpired,
  }: {
    setLoad: React.Dispatch<React.SetStateAction<boolean>>;
    setIsExpired: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    setLoad(true);
    const loadingId = toast.loading("sending OTP", { duration: 3000 });
    try {
      const res = await sendOtp(user?._id).unwrap();
      if (res?.success) {
        toast.success("otp sent successfully", {
          id: loadingId,
          duration: 3000,
        });
        setLoad(false);
        setIsExpired(false);
        timerRef.current?.reset();
      }
    } catch (error: any) {
      setLoad(false);
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
      navigate("/my-profile");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("openOTP");
      setUserData(null);
      setOtpPage(false);
      setIsExpired(true);
    }
  };

  useEffect(() => {
    if (data && !otpPage) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <section className="flex justify-center bg-gray-100 dark:bg-gray-900 py-4 lg:py-14 font-inter ">
      {otpPage ? (
        <VerifyOTP
          userInfo={user as TUserByEmail}
          timerRef={timerRef}
          handleSubmit={handleSubmit}
          resendOTP={resendOTP}
          handleSkip={handleSkip}
        />
      ) : (
        <SignUpForm
          methods={methods}
          refetch={refetch}
          setOtpPage={setOtpPage}
          setUserData={setUserData}
          userInfo={user}
          timerRef={timerRef}
        />
      )}
    </section>
  );
};

export default SignUp;
