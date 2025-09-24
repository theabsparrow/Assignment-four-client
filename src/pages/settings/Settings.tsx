/* eslint-disable @typescript-eslint/no-explicit-any */
import { TMyProfileQUery } from "@/interface/navbar.types";
import FormInput from "@/myComponent/formInput/FormInput";
import { genders } from "@/myComponent/formInput/formInput.const";
import FormPhoneInput from "@/myComponent/formInput/FormPhoneInput";
import FormSelect from "@/myComponent/formInput/FormSelect";
import SignInFormInput from "@/myComponent/formInput/SignInFormInput";
import { baseApi } from "@/redux/api/baseApi";
import { useChnagePassowrdMutation } from "@/redux/features/auth/authApi";
import { logOut, setUser } from "@/redux/features/auth/authSlice";
import {
  useDeleteUserMutation,
  useMyProfileQuery,
  useUpdateUserInfoMutation,
} from "@/redux/features/user/userApi";
import { useAppDispatch } from "@/redux/hooks";
import { decodeToken } from "@/utills/decodeToken";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiFillWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Settings = () => {
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "settings";
  const { data, isLoading } = useMyProfileQuery(query);
  const profileInfo = data?.data;

  const [updatedInfo] = useUpdateUserInfoMutation();
  const [changePasswordInfo] = useChnagePassowrdMutation();
  const dispatch = useAppDispatch();
  const methods = useForm();
  const [editing, setEditing] = useState(false);
  const [contactEdit, setContactEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [deleteAccount] = useDeleteUserMutation();
  const navigate = useNavigate();

  const onInfoSubmit = async (data: any) => {
    setErrorMessage("");
    const updatedFields = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== "")
    );
    if (Object.keys(updatedFields).length === 0) {
      setEditing(true);
      return setErrorMessage("Nothing to update");
    }
    const nameFields = ["firstName", "middleName", "lastName"];
    const name: Record<string, string> = {};
    nameFields.forEach((key) => {
      if (updatedFields[key]) {
        name[key] = updatedFields[key] as string;
        delete updatedFields[key];
      }
    });
    if (Object.keys(name).length > 0) {
      updatedFields.name = name;
    }
    const toastId = toast.loading(`personal info updating....`);
    try {
      const res = await updatedInfo(updatedFields).unwrap();
      if (res.data.result) {
        setEditing(false);
        toast.success(res.message, {
          id: toastId,
          duration: 3000,
        });
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const onContactSubmit = (data: any) => {
    setErrorMessage("");
    const updatedFields = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== "")
    );
    if (Object.keys(updatedFields).length === 0) {
      setContactEdit(true);
      return setErrorMessage("Nothing to update");
    }
    console.log("Updated Data:", updatedFields);
  };

  const onPassChangeSubmit = async (data: any) => {
    setErrorMessage("");
    const { confirmNewPass, newPassword, oldPassword } = data;
    if (newPassword !== confirmNewPass) {
      return setErrorMessage(
        "new password and confirm new password doesn`t match"
      );
    }
    const changePassword = {
      oldPassword,
      newPassword,
    };
    const toastId = toast.loading("spassword is changing....");
    try {
      const res = await changePasswordInfo(changePassword).unwrap();
      if (res.data) {
        const user = decodeToken(res.data);
        dispatch(setUser({ user, token: res.data }));
        toast.success("password changed successfully", {
          id: toastId,
          duration: 3000,
        });
        setChangingPassword(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const onDeleteSubmit = async (data: any) => {
    const { password } = data;
    const toastId = toast.loading("deleting account....");
    try {
      const res = await deleteAccount({ password }).unwrap();
      if (res.success) {
        dispatch(logOut());
        toast.success("account deleted successfully", {
          id: toastId,
          duration: 3000,
        });
        dispatch(baseApi.util.resetApiState());
        navigate("/sign-in");
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Settings
        </h2>
        {((errorMessage && editing) || (errorMessage && contactEdit)) && (
          <h1 className="text-red-600 text-sm text-center mb-4">
            {errorMessage}
          </h1>
        )}
        {/* PERSONAL INFORMATION */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Personal Information
            </h3>
            <button
              className="text-blue-500 font-semibold hover:underline "
              onClick={() => {
                setEditing(!editing);
                setErrorMessage("");
              }}
            >
              {editing ? "Cancel" : "Edit"}
            </button>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onInfoSubmit)}>
              <label
                className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${
                  !editing ? "text-start" : "text-center"
                }`}
              >
                Full Name
              </label>
              <div
                className={`mb-3 ${
                  !editing
                    ? "flex items-center gap-2"
                    : "flex flex-col justify-center space-y-3"
                }`}
              >
                <div>
                  {editing ? (
                    <FormInput
                      label="First name"
                      name="firstName"
                      placeholder="Enter your first name"
                      type="text"
                      maxLength={30}
                      register={methods.register}
                    />
                  ) : (
                    <p className="mt-1 text-gray-800 dark:text-gray-300">
                      {profileInfo?.name.firstName}
                    </p>
                  )}
                </div>
                <div>
                  {editing ? (
                    <FormInput
                      label="Middle name"
                      name="middleName"
                      placeholder="Enter your middle name"
                      type="text"
                      maxLength={30}
                      register={methods.register}
                    />
                  ) : (
                    <p className="mt-1 text-gray-800 dark:text-gray-300">
                      {profileInfo?.name?.middleName}
                    </p>
                  )}
                </div>

                <div>
                  {editing ? (
                    <FormInput
                      label="Last name"
                      name="lastName"
                      placeholder="Enter your last name"
                      type="text"
                      maxLength={30}
                      register={methods.register}
                    />
                  ) : (
                    <p className="mt-1 text-gray-800 dark:text-gray-300">
                      {profileInfo?.name.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label
                  className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${
                    !editing ? "block" : "hidden"
                  }`}
                >
                  Date of Birth
                </label>
                {editing ? (
                  <FormInput
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    register={methods.register}
                  />
                ) : (
                  <p className="mt-1 text-gray-800 dark:text-gray-300">
                    {profileInfo?.dateOfBirth}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label
                  className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${
                    !editing ? "block" : "hidden"
                  }`}
                >
                  Gender
                </label>
                {editing ? (
                  <FormSelect
                    label="Gender"
                    name="gender"
                    options={genders}
                    register={methods.register}
                  />
                ) : (
                  <p className="mt-1 text-gray-800 dark:text-gray-300">
                    {profileInfo?.gender}
                  </p>
                )}
              </div>

              {editing && (
                <button
                  type="submit"
                  className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition "
                >
                  Save Changes
                </button>
              )}
            </form>
          </FormProvider>
        </div>

        {/* CONTACT INFORMATION */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Contact Information
            </h3>
            <button
              className="text-blue-500 font-semibold hover:underline"
              onClick={() => {
                setContactEdit(!contactEdit);
                setErrorMessage("");
              }}
            >
              {contactEdit ? "Cancel" : "Edit"}
            </button>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onContactSubmit)}>
              <div className="mt-2">
                <label
                  className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${
                    !contactEdit ? "block" : "hidden"
                  }`}
                >
                  Email
                </label>
                {contactEdit ? (
                  <FormInput
                    label="Email"
                    name="email"
                    placeholder="Enter your email address"
                    type="email"
                    register={methods.register}
                  />
                ) : (
                  <p className="mt-1 text-gray-600">{profileInfo?.email}</p>
                )}
              </div>
              <div className="mt-2">
                <label
                  className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${
                    !contactEdit ? "block" : "hidden"
                  }`}
                >
                  Phone Number
                </label>
                {contactEdit ? (
                  <FormPhoneInput
                    label="Phone Number"
                    name="phoneNumber"
                    control={methods.control}
                  />
                ) : (
                  <p className="mt-1 text-gray-600">
                    {profileInfo?.phoneNumber}
                  </p>
                )}
              </div>
              {contactEdit && (
                <button
                  type="submit"
                  className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition mt-3"
                >
                  Save Changes
                </button>
              )}
            </form>
          </FormProvider>
        </div>

        {/* CHANGE PASSWORD */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Change Password
            </h3>
            <button
              className="text-blue-500 font-semibold hover:underline"
              onClick={() => setChangingPassword(!changingPassword)}
            >
              {changingPassword ? "Cancel" : "Change"}
            </button>
          </div>
          {changingPassword && (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onPassChangeSubmit)}>
                <div className="mb-3">
                  <SignInFormInput
                    label=" Old Password"
                    name="oldPassword"
                    type="password"
                    placeholder="Enter your old password"
                    register={methods.register}
                    required={true}
                  />
                </div>

                <div className="mb-3">
                  <FormInput
                    label="New Password"
                    name="newPassword"
                    type="password"
                    placeholder="Enter your new password"
                    register={methods.register}
                    required={true}
                  />
                </div>

                <div className="mb-3">
                  <FormInput
                    label="Confirm New Password"
                    name="confirmNewPass"
                    type="password"
                    placeholder="Confirm your new password"
                    register={methods.register}
                    required={true}
                  />
                </div>
                {errorMessage && changingPassword && (
                  <h1 className="text-red-600 text-sm mb-3">{errorMessage}</h1>
                )}
                <button
                  type="submit"
                  className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition"
                >
                  Update Password
                </button>
              </form>
            </FormProvider>
          )}
        </div>

        {/* delete account */}
        <div className="py-2 px-4 bg-red-100 dark:bg-gray-800 rounded-lg mt-4">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={() => setOnDelete(!onDelete)}
              className="text-lg font-bold text-secondary dark:text-gray-100 hover:scale-110 duration-500"
            >
              Delete Account
            </button>
          </div>
          {onDelete && (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onDeleteSubmit)}>
                <div className="mb-3">
                  <SignInFormInput
                    label="  password "
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    register={methods.register}
                    required={true}
                  />
                </div>
                <div className=" font-medium text-lg text-secondary">
                  <h1 className="flex items-center gap-1">
                    {" "}
                    <AiFillWarning />
                    If you delete your account, all your information will be
                    lost forever.{" "}
                  </h1>
                  <h1 className="flex items-center gap-1">
                    {" "}
                    <AiFillWarning /> Do you agree ?
                  </h1>
                </div>
                <div className="flex flex-col justify-center mt-2">
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      {...methods.register("checked", {
                        required: true,
                      })}
                      id="checked"
                    />
                    <p>Yes I agree to delete.</p>
                  </div>
                  {methods.formState.errors.checked?.type === "required" && (
                    <span className="text-sm text-red-500 flex items-center gap-1">
                      <AiFillWarning /> you have to be agree mate!!
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-secondary mt-2 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition"
                >
                  Update Password
                </button>
              </form>
            </FormProvider>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
