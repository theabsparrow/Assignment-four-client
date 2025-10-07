import { useState } from "react";
import { TSettingExtendType } from "./Settings";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useUpdateUserInfoMutation } from "@/redux/features/user/userApi";
import {
  currentSettings,
  resetProfile,
  setEmail,
  setPhone,
} from "@/redux/features/setting/settingSlice";
import { toast } from "sonner";
import { MdEdit } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
  // redux state
  const personalInfo = useAppSelector(currentSettings);
  const dispatch = useAppDispatch();
  const [updateuser] = useUpdateUserInfoMutation();

  const handleSubmit = async () => {
    if (!personalInfo || Object.keys(personalInfo).length === 0) {
      return toast.error("nothing to update", { duration: 3000 });
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
            <div>
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
              <div className="flex items-center gap-10">
                <button
                  onClick={() => {
                    setOpen("");
                    dispatch(resetProfile());
                    setemail(profileInfo?.email);
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
                Email
              </h1>
              <p className="text-gray-600">{profileInfo?.email} </p>
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
