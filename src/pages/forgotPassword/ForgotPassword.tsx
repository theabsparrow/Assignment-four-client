/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useSendOtpMutation,
} from "@/redux/features/auth/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SendOTP from "./SendOTP";
import EmailSubmission from "./EmailSubmission";
import VerifyOTP from "./VerifyOTP";
import { useAppDispatch } from "@/redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "@/redux/features/auth/authSlice";

export type TUserByEmail = {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  profileImage?: string;
};

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
  const [loading, setLoading] = useState(false);
  // redux state
  const [forgetPassword] = useForgetPasswordMutation();
  const dispatch = useAppDispatch();
  const [resetPassword] = useResetPasswordMutation();
  const [sendOtp] = useSendOtpMutation();

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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    otpNum: string[]
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
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const resendOTP = async (
    setLoad: React.Dispatch<React.SetStateAction<boolean>>,
    id: string
  ) => {
    setLoad(true);
    const loadingId = toast.loading("sending OTP", { duration: 3000 });
    try {
      const data = { id };
      const res = await sendOtp(data).unwrap();
      if (res?.data) {
        toast.success("otp sent successfully", {
          id: loadingId,
          duration: 3000,
        });
        setLoad(false);
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
    <section className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      {open && userInfo ? (
        <SendOTP
          userInfo={userInfo as TUserByEmail}
          setOpenOTP={setOpenOTP}
          setOpen={setOpen}
        />
      ) : openOTP && userInfo ? (
        <VerifyOTP
          userInfo={userInfo as TUserByEmail}
          handleSubmit={handleSubmit}
          resendOTP={resendOTP}
          handleLocalStorage={handleLocalStorage}
          handleBackHome={handleBackHome}
        />
      ) : (
        <EmailSubmission onSubmit={onSubmit} loading={loading} />
      )}
    </section>
  );
};

export default ForgotPassword;
