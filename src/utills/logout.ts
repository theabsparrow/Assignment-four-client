import { baseApi } from "@/redux/api/baseApi";
import { logOut } from "@/redux/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";
import { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";

type HandleLogoutParams = {
  e: React.MouseEvent<HTMLElement>;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
  setDisplay?: (value: boolean) => void;
  logout: (id?: string) => Promise<any>;
  display?: boolean;
};

export const LogoutFunc = async ({
  e,
  open,
  setOpen,
  dispatch,
  navigate,
  setDisplay,
  logout,
  display,
}: HandleLogoutParams) => {
  const toastId = toast.loading("Signing out...");
  e.stopPropagation();
  if (setDisplay) {
    setDisplay(!display);
  }
  if (setOpen) {
    setOpen(!open);
  }
  try {
    const res = await logout();
    if (res.data?.success) {
      dispatch(logOut());
      dispatch(baseApi.util.resetApiState());
      toast.success("Successfully signed out", { id: toastId, duration: 3000 });
      localStorage.removeItem("OTP");
      localStorage.removeItem("otpExpiry");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("openOTP");
      localStorage.removeItem("Settings");
      navigate("/sign-in");
    }
  } catch (error: any) {
    const errorInfo =
      error?.data?.message || error?.error || "Something went wrong!";
    toast.error(errorInfo, { id: toastId, duration: 3000 });
  }
};
