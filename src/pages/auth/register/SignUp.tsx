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
import { imageUpload } from "@/utills/uploadImage";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { decodeToken } from "@/utills/decodeToken";
import { setUser } from "@/redux/features/auth/authSlice";
import signUpImage from "../../../assets/signUp-photo.webp";
import verifyEmailPhoto from "../../../assets/email verify photo.webp";

const SignUp = () => {
  // redux storage
  const [registration] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "navbar";
  const { data, refetch } = useMyProfileQuery(query);
  const user = data?.data || {};
  const [sendOtp] = useResendOTPMutation();
  const [verifyEmail] = useVerifyEmailMutation();
  const [clearCookie] = useClearCookieMutation();
  // local storage
  const [loading, setLoading] = useState(false);
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
  const onSubmit = async (data: TUserInfo) => {
    const toastId = toast.loading("regestering");
    try {
      if (data?.profileImage) {
        const profileImage = await imageUpload(data?.profileImage as File);
        if (!profileImage) {
          setLoading(false);
          toast.error("faild to upload image", { duration: 3000 });
        }
        data.profileImage = profileImage as string;
      }
      const res = await registration(data).unwrap();
      const user = decodeToken(res?.data?.access);
      dispatch(setUser({ user, token: res?.data?.access }));
      toast.success("successfully registered", { id: toastId, duration: 3000 });
      refetch();
      setUserData(user as TUserByEmail);
      setOtpPage(true);
      localStorage.setItem("otpPage", JSON.stringify(otpPage));
      localStorage.setItem("userData", JSON.stringify(userData));
      timerRef.current?.reset();
      methods.reset();
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    otpNum: string[],
    setIsExpired: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    e.preventDefault();
    setLoading(true);
    if (!userData) {
      toast.error("something went wrong.");
      setLoading(false);
      return;
    }
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
        navigate("/my-profile");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("openOTP");
        setUserData(null);
        setOtpPage(false);
        setIsExpired(true);
        setLoading(true);
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
      const res = await sendOtp(user?._id).unwrap();
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
    console.log("clickerd");
    const result = await clearCookie(undefined).unwrap();
    if (result?.success) {
      navigate("/my-profile");
      localStorage.removeItem("userData");
      localStorage.removeItem("otpPage");
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
    <section
      style={{
        backgroundImage: `url(${
          otpPage && userData ? verifyEmailPhoto : signUpImage
        })`,
      }}
      className="bg-cover bg-center bg-no-repeat h-screen lg:h-[calc(100vh-76px)] relative font-inter"
    >
      {otpPage && userData ? (
        <div className="absolute lg:left-[35%] md:left-[25%] left-[5%] top-[10%] md:top-[15%] lg:top-[5%]">
          <VerifyOTP
            userInfo={user as TUserByEmail}
            timerRef={timerRef}
            loading={loading}
            handleSubmit={handleSubmit}
            resendOTP={resendOTP}
            handleSkip={handleSkip}
          />
        </div>
      ) : (
        <SignUpForm methods={methods} onSubmit={onSubmit} />
      )}
    </section>
  );
};

export default SignUp;
