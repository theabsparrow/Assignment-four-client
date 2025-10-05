/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useSendOtpMutation,
} from "@/redux/features/auth/authApi";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SendOTP from "./SendOTP";
import EmailSubmission from "./EmailSubmission";
import VerifyOTP from "./VerifyOTP";
import { useAppDispatch } from "@/redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "@/redux/features/auth/authSlice";
import { useForm } from "react-hook-form";
import { TEmail, TTimerhandler, TUserByEmail } from "./forgetPassword.types";

const ForgotPassword = () => {
  // local state
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openOTP, setOpenOTP] = useState(() =>
    JSON.parse(localStorage.getItem("openOTP") || "false")
  );
  const [userInfo, setUserInfo] = useState<TUserByEmail | null>(() =>
    JSON.parse(localStorage.getItem("userInfo") || "null")
  );
  const timerRef = useRef<TTimerhandler>(null);
  // redux state
  const [forgetPassword] = useForgetPasswordMutation();
  const dispatch = useAppDispatch();
  const [resetPassword] = useResetPasswordMutation();
  const [sendOtp] = useSendOtpMutation();
  const method = useForm<TEmail>();
  const { reset } = method;

  useEffect(() => {
    localStorage.setItem("openOTP", JSON.stringify(openOTP));
  }, [openOTP]);

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [userInfo]);

  // --- clear data when navigating away ---
  useEffect(() => {
    const currentPath = location.pathname;
    return () => {
      if (location.pathname !== currentPath) {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("openOTP");
      }
    };
  }, [location.pathname]);

  const onSubmit = async (data: any) => {
    try {
      const res = await forgetPassword(data).unwrap();
      if (res?.data) {
        setOpen(true);
        setUserInfo(res.data);
        reset();
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    otpNum: string[],
    setIsExpired: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
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
        localStorage.removeItem("userInfo");
        localStorage.removeItem("openOTP");
        setUserInfo(null);
        setOpenOTP(false);
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
      const res = await sendOtp(userInfo?._id).unwrap();
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

  const handleLocalStorage = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("openOTP");
    setUserInfo(null);
    setOpenOTP(false);
  };

  const handleBackHome = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("openOTP");
    setUserInfo(null);
    setOpenOTP(false);
    navigate("/");
  };

  return (
    <section className="flex min-h-screen lg:items-center justify-center bg-gray-200 dark:bg-gray-900 p-2 lg:p-6 ">
      {open && userInfo ? (
        <SendOTP
          userInfo={userInfo as TUserByEmail}
          setOpenOTP={setOpenOTP}
          setOpen={setOpen}
          timerRef={timerRef}
        />
      ) : openOTP && userInfo ? (
        <VerifyOTP
          userInfo={userInfo as TUserByEmail}
          timerRef={timerRef}
          handleSubmit={handleSubmit}
          resendOTP={resendOTP}
          handleLocalStorage={handleLocalStorage}
          handleBackHome={handleBackHome}
        />
      ) : (
        <EmailSubmission method={method} onSubmit={onSubmit} />
      )}
    </section>
  );
};

export default ForgotPassword;
