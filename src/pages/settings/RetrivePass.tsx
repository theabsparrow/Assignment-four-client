import { useEffect, useRef, useState } from "react";
import {
  TEmail,
  TTimerhandler,
  TUserByEmail,
} from "../forgotPassword/forgetPassword.types";
import { useForm } from "react-hook-form";
import InputType from "@/myComponent/formInput/InputType";
import {
  useLogoutMutation,
  useMatchOTPMutation,
  useOtpResendMutation,
  useRetrivePasswordMutation,
  useUpdatePasswordMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import VerifyOTP from "../forgotPassword/VerifyOTP";
import { useClearCookieMutation } from "@/redux/features/user/userApi";
import { useLocation } from "react-router-dom";
import SetPassword from "../forgotPassword/SetPassword";
import { TSetNewPass } from "../forgotPassword/SetNewPassword";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/features/auth/authSlice";
import { baseApi } from "@/redux/api/baseApi";

type TOpenProps = "otp" | "email" | "password";

const RetrivePass = ({ profileInfo }: { profileInfo: TUserByEmail }) => {
  const [isOpen, setIsOpen] = useState<TOpenProps | "">(
    () => JSON.parse(localStorage.getItem("OTP") as TOpenProps) || ""
  );
  const location = useLocation();
  const timerRef = useRef<TTimerhandler>(null);
  const [loading, setLoading] = useState(false);
  const [retrivePass] = useRetrivePasswordMutation();
  const [resendOtp] = useOtpResendMutation();
  const [matchOtp] = useMatchOTPMutation();
  const [clearCookie] = useClearCookieMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TEmail>();
  const method = useForm<TSetNewPass>();

  useEffect(() => {
    localStorage.setItem("OTP", JSON.stringify(isOpen));
  }, [isOpen]);

  useEffect(() => {
    const currentPath = location.pathname;
    return () => {
      if (location.pathname !== currentPath) {
        localStorage.removeItem("OTP");
        localStorage.removeItem("otpExpiry");
      }
    };
  }, [location.pathname]);

  const onSubmit = async (data: TEmail) => {
    const toastId = toast.loading("otp sending", { duration: 3000 });
    try {
      const res = await retrivePass(data).unwrap();
      if (res?.success) {
        toast.success("otp sent successfully", {
          id: toastId,
          duration: 3000,
        });
        setIsOpen("otp");
        localStorage.setItem("OTP", JSON.stringify("otp"));
        timerRef.current?.reset();
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const handleSubmitOTP = async (
    e: React.FormEvent<HTMLFormElement>,
    otpNum: string[],
    setIsExpired: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    e.preventDefault();
    const enteredOTP = otpNum.join("");
    if (enteredOTP.length !== 6) {
      toast.error("Please enter a valid OTP.");
      return;
    }
    const otp = {
      otp: enteredOTP,
    };

    const toastId = toast.loading("otp submitting....");
    try {
      const res = await matchOtp(otp).unwrap();
      if (res?.success) {
        toast.success("otp matched successfully", {
          id: toastId,
          duration: 3000,
        });
        setIsExpired(true);
        setIsOpen("password");
        localStorage.setItem("OTP", JSON.stringify("password"));
        localStorage.removeItem("otpExpiry");
        reset();
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const resendOTP = async (
    setIsExpired: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    const loadingId = toast.loading("sending OTP", { duration: 3000 });
    try {
      const res = await resendOtp(undefined).unwrap();
      if (res?.success) {
        toast.success("otp sent successfully", {
          id: loadingId,
          duration: 3000,
        });
        setLoading(false);
        setIsExpired(false);
        timerRef.current?.reset();
        reset();
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
      localStorage.removeItem("OTP");
      localStorage.removeItem("otpExpiry");
      setIsOpen("");
      setIsExpired(true);
      reset();
    }
  };

  const onPasswordSubmit = async (data: TSetNewPass) => {
    const toastId = toast.loading("Setting new Passoword....");
    try {
      const res = await updatePassword(data).unwrap();
      if (res?.success) {
        toast.success("successfully set new password", {
          id: toastId,
          duration: 3000,
        });
        method.reset();
        await logout(undefined);
        dispatch(logOut());
        dispatch(baseApi.util.resetApiState());
        localStorage.removeItem("otpExpiry");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("openOTP");
        localStorage.removeItem("Settings");
        localStorage.removeItem("OTP");
        localStorage.removeItem("otpPage");
        // navigate("/sign-in");
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const handleClose = () => {
    localStorage.removeItem("OTP");
    localStorage.removeItem("otpExpiry");
    setIsOpen("");
    reset();
  };

  return (
    <section>
      <button
        type="button"
        className="text-red-700 font-semibold hover:underline"
        onClick={() => setIsOpen("email")}
      >
        forget password?
      </button>
      {isOpen === "email" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md bg-gray-500 dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4">
            <p className="text-gray-200 dark:text-gray-400 text-center mt-2">
              Enter your email and we’ll send you an otp.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <InputType
                label="Email"
                name="email"
                register={register}
                error={errors.email}
                type="email"
                required={true}
              />
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setIsOpen("")}
                  className="bg-gray-800 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Searching..." : "Search Your Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isOpen === "otp" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <VerifyOTP
            userInfo={profileInfo as TUserByEmail}
            timerRef={timerRef}
            loading={loading}
            handleSubmit={handleSubmitOTP}
            resendOTP={resendOTP}
            handleSkip={handleSkip}
          />
        </div>
      )}
      {isOpen === "password" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <SetPassword
            method={method}
            onSubmit={onPasswordSubmit}
            handleClose={handleClose}
          />
        </div>
      )}
    </section>
  );
};

export default RetrivePass;
