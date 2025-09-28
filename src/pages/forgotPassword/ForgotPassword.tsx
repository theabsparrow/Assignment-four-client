/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { toast } from "sonner";
import SendOTP from "./SendOTP";
import EmailSubmission from "./EmailSubmission";
import VerifyOTP from "./VerifyOTP";

export type TUserByEmail = {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  profileImage?: string;
};

const ForgotPassword = () => {
  const [open, setOpen] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);
  const [userInfo, setUserInfo] = useState<TUserByEmail | null>(null);
  const [forgetPassword] = useForgetPasswordMutation();
  const [loading, setLoading] = useState(false);

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

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      {open ? (
        <SendOTP
          userInfo={userInfo as TUserByEmail}
          setOpenOTP={setOpenOTP}
          setOpen={setOpen}
        />
      ) : openOTP ? (
        <VerifyOTP userInfo={userInfo as TUserByEmail} />
      ) : (
        <EmailSubmission onSubmit={onSubmit} loading={loading} />
      )}
    </section>
  );
};

export default ForgotPassword;
