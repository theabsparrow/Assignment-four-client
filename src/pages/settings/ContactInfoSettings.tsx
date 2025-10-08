import { useState } from "react";
import { TSettingExtendType } from "./Settings";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useUpdateUserInfoMutation } from "@/redux/features/user/userApi";
import {
  currentSettings,
  resetProfile,
  setEmail,
  setPassword,
  setPhone,
} from "@/redux/features/setting/settingSlice";
import { toast } from "sonner";
import { MdEdit } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import RetrivePass from "./RetrivePass";
import { TUserByEmail } from "../forgotPassword/forgetPassword.types";
import VerifyEmail from "./VerifyEmail";

const ContactInfoSettings = ({
  profileInfo,
}: {
  profileInfo: TSettingExtendType;
}) => {
  // local state
  const [open, setOpen] = useState<"email" | "phone" | "">("");
  const [email, setemail] = useState(profileInfo?.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState(
    profileInfo?.phoneNumber ?? ""
  );
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // redux state
  const personalInfo = useAppSelector(currentSettings);
  const dispatch = useAppDispatch();
  const [updateuser] = useUpdateUserInfoMutation();

  const handleSubmit = async () => {
    if (!personalInfo.email) {
      return toast.error("nothing to update", { duration: 3000 });
    }
    if (personalInfo.email && !personalInfo.password) {
      return toast.error("please provide your password also", {
        duration: 3000,
      });
    }
    const toastId = toast.loading("updating personal info....");
    try {
      const res = await updateuser(personalInfo).unwrap();
      if (res?.data) {
        toast.success("successfully updated personal info", {
          id: toastId,
          duration: 3000,
        });
        setOpen("");
        dispatch(resetProfile());
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
      dispatch(resetProfile());
    }
  };

  return (
    <section className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex justify-center items-center">
        Contact Information
      </h3>

      <div className="px-2 lg:px-20 py-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-4">
        <div className="flex items-end justify-between">
          {open === "email" ? (
            <div className="space-y-3">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      const value = e.target.value;
                      dispatch(setEmail(value));
                      setemail(value);
                    }}
                    className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  />
                </div>
                <div className="flex flex-col gap-1 relative">
                  <label>Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="enter your password"
                    onChange={(e) => {
                      const value = e.target.value;
                      dispatch(setPassword(value));
                      setpassword(value);
                    }}
                    className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  />
                  <span
                    className="absolute top-9 right-3 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoEye /> : <IoEyeOff />}
                  </span>
                </div>
                <RetrivePass profileInfo={profileInfo as TUserByEmail} />
              </div>
              <div className="flex items-center gap-10">
                <button
                  onClick={() => {
                    setOpen("");
                    dispatch(resetProfile());
                    setemail(profileInfo?.email);
                    setpassword("");
                  }}
                  className="text-secondary font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="text-blue-600 font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-end gap-3 lg:gap-10">
              <div className="space-y-1">
                <h1 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </h1>
                <p className="text-gray-600">{profileInfo?.email} </p>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-4">
                <h1>
                  {profileInfo?.verifyWithEmail ? (
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
                      <FaCheckCircle className="w-4 h-4" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 text-sm font-medium">
                      <FaClock className="w-4 h-4 animate-pulse" />
                      Not verified
                    </span>
                  )}
                </h1>
                {!profileInfo?.verifyWithEmail && (
                  <VerifyEmail profileInfo={profileInfo} />
                )}
              </div>
            </div>
          )}
          {open !== "email" && (
            <button
              onClick={() => {
                setOpen("email");
                dispatch(resetProfile());
              }}
              className="text-red-600 text-lg "
            >
              <MdEdit />
            </button>
          )}
        </div>
        <div className="flex items-end justify-between">
          {open === "phone" ? (
            <div>
              <div className="flex flex-col gap-1">
                <label>Phone Number</label>
                <PhoneInput
                  country={"bd"}
                  value={phoneNumber}
                  onChange={(value) => {
                    dispatch(setPhone(value));
                    setPhoneNumber(value);
                  }}
                />
              </div>
              <div className="flex items-center gap-10">
                <button
                  onClick={() => {
                    setOpen("");
                    dispatch(resetProfile());
                    setPhoneNumber(profileInfo?.phoneNumber);
                  }}
                  className="text-secondary font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="text-secondary font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <h1 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </h1>
              <p className="text-gray-600">{profileInfo?.phoneNumber} </p>
            </div>
          )}
          {open !== "phone" && (
            <button
              onClick={() => {
                setOpen("phone");
                dispatch(resetProfile());
              }}
              className="text-red-600 text-lg "
            >
              <MdEdit />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSettings;
