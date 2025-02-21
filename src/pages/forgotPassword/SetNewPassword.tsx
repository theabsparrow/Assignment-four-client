/* eslint-disable @typescript-eslint/no-explicit-any */

import useMyProfile from "@/hook/useMyProfile";
import FormInput from "@/myComponent/formInput/FormInput";
import { useSetNewPasswordMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { decodeToken } from "@/utills/decodeToken";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SetNewPassword = () => {
  const { myProfile, refetch } =
    useMyProfile(["name", "profileImage", "email"]) || undefined;
  const [setNewPass] = useSetNewPasswordMutation();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Setting new Passoword....");
    setErrorMessage("");
    if (!myProfile) {
      navigate("/");
    }
    const { newPassword, confirmPass } = data;
    if (newPassword !== confirmPass) {
      return setErrorMessage(
        "new password and confirm new password doesn`t match"
      );
    }
    const password = { newPassword };
    try {
      const res = await setNewPass(password).unwrap();
      if (res.data) {
        const user = decodeToken(res.data);
        dispatch(setUser({ user, token: res.data }));
        toast.success("successfully set new password in", {
          id: toastId,
          duration: 3000,
        });
        await refetch();
        navigate("/");
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h1 className="text-center text-xl text-red-400 dark:text-gray-900 flex justify-center items-center gap-2 mb-2 bg-red-200 dark:bg-slate-700 px-2 py-2 rounded-xl font-bold">
          <span className="text-primary">HI</span> {myProfile?.name?.firstName}{" "}
          {myProfile?.name?.lastName}
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
          Set New Password
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
          Enter a new password for your account
        </p>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-6">
            {/* New Password */}
            <div className="mb-4 space-y-4">
              <FormInput
                label=" New Password"
                name="newPassword"
                type="password"
                placeholder="Enter your new password"
                register={methods.register}
                required={true}
              />
              <FormInput
                label="Confirm New Password"
                name="confirmPass"
                type="password"
                placeholder="confirm your new password"
                register={methods.register}
                required={true}
              />
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary mt-4 text-white font-bold p-2 rounded-md duration-500 transition"
            >
              Update Password
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SetNewPassword;
