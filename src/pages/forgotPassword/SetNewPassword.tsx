/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetUserQuery,
  useLoginMutation,
  useSetNewPasswordMutation,
} from "@/redux/features/auth/authApi";
import { logOut, setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SetPassword from "./SetPassword";
import SetPasswordSkeleton from "@/myComponent/loader/SetPasswordSkeleton";
import ErrorComponent from "./ErrorComponent";
import SuccessComponent from "./SuccessComponent";
import { decodeToken } from "@/utills/decodeToken";

type TUser = {
  email: string;
  password: string;
};

const SetNewPassword = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useGetUserQuery(undefined);
  const userInfo = data?.data || {};
  const [userData, setUserData] = useState<TUser | null>(null);
  const [setNewPass] = useSetNewPasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const onSubmit = async (data: any) => {
    const { newPassword, confirmPass } = data;
    if (newPassword !== confirmPass) {
      return toast.error("password doesn`t match");
    }
    const toastId = toast.loading("Setting new Passoword....");
    const password = { newPassword };
    try {
      const res = await setNewPass(password).unwrap();
      if (res?.data) {
        toast.success("successfully set new password", {
          id: toastId,
          duration: 3000,
        });
        setUserData(res?.data);
        setOpen(true);
        dispatch(logOut());
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const handleForceLogin = async () => {
    const loginInfo: { email: string; password: string } = {
      email: userData?.email as string,
      password: userData?.password as string,
    };
    const toastId = toast.loading("signing in....");
    try {
      const res = await login(loginInfo).unwrap();
      const user = decodeToken(res.data);
      dispatch(setUser({ user, token: res.data }));
      toast.success("successfully signed in", { id: toastId, duration: 3000 });
      navigate("/");
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.pathname !== "/") {
        dispatch(logOut());
        toast.error("Session expired! Please request OTP again.", {
          duration: 3000,
        });
      }
    };
    window.addEventListener("beforeunload", handleRouteChange);
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("beforeunload", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      {isLoading ? (
        <SetPasswordSkeleton />
      ) : isError || !userInfo ? (
        <ErrorComponent />
      ) : open ? (
        <SuccessComponent onForceLogin={handleForceLogin} />
      ) : (
        <SetPassword onSubmit={onSubmit} />
      )}
    </section>
  );
};

export default SetNewPassword;
