import { useState } from "react";
import { TUserByEmail } from "./ForgotPassword";
import { toast } from "sonner";
import { useSendOtpMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

type TSendOTPPRops = {
  userInfo: TUserByEmail;
  setOpenOTP: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SendOTP = ({ userInfo, setOpenOTP, setOpen }: TSendOTPPRops) => {
  const [loading, setLoading] = useState(false);
  const [sendOtp] = useSendOtpMutation();
  const dispatch = useAppDispatch();

  const handleSendOTP = async () => {
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
        setOpenOTP(true);
        setLoading(false);
        setOpen(false);
      }
    } catch (error: any) {
      setLoading(false);
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  return (
    <section className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
      <img
        src={userInfo?.profileImage}
        alt={userInfo?.name?.firstName}
        className="w-24 h-24 rounded-full mx-auto border-4 border-secondary shadow-md"
      />
      <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
        {userInfo?.name?.firstName} {userInfo?.name?.lastName}
      </h2>
      <div className="mt-6">
        <button
          disabled={loading}
          onClick={handleSendOTP}
          className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-md shadow hover:scale-105 duration-300"
        >
          Send OTP
        </button>
      </div>
    </section>
  );
};

export default SendOTP;
