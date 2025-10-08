import { baseApi } from "@/redux/api/baseApi";
import { useClearTokenMutation } from "@/redux/features/auth/authApi";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ErrorComponent = () => {
  const dispatch = useAppDispatch();
  const [logout] = useClearTokenMutation();
  const navigate = useNavigate();

  const handleLogOut = async (label: string) => {
    try {
      const res = await logout(undefined);
      if (res.data?.success) {
        dispatch(logOut());
        dispatch(baseApi.util.resetApiState());
        if (label === "login") {
          navigate("/sign-in");
        } else {
          navigate("/forgot-password");
        }
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  return (
    <section className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
      <h2 className="text-xl font-bold text-red-500">Session Expired</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Please request a new OTP and try again.
      </p>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleLogOut("forget")}
          className="text-blue-700 font-semibold"
        >
          Forget Password ?
        </button>
        <button
          onClick={() => handleLogOut("login")}
          className="text-blue-700 font-semibold"
        >
          Back to Login
        </button>
      </div>
    </section>
  );
};

export default ErrorComponent;
