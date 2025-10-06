import { TGender, TUserInfo } from "@/interface/userInterface/userInfo";
import { calculateAge, formatedDate } from "../myProfile/myProfile.utills";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentSettings,
  resetProfile,
  setDOB,
  setFirstName,
  setGender,
  setLastName,
  setMiddleName,
} from "@/redux/features/setting/settingSlice";
import { toast } from "sonner";
import { useUpdateUserInfoMutation } from "@/redux/features/user/userApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PersonalInfoSettings = ({ profileInfo }: { profileInfo: TUserInfo }) => {
  // local state
  const [open, setOpen] = useState<"name" | "date" | "gender" | "">("");
  const [firstName, setfirstName] = useState(
    profileInfo?.name?.firstName ?? ""
  );
  const [middleName, setmiddleName] = useState(
    profileInfo?.name?.middleName ?? ""
  );
  const [lastName, setlastName] = useState(profileInfo?.name?.lastName ?? "");
  const [date, setDate] = useState<Date>(
    new Date(profileInfo?.dateOfBirth as string) ?? ""
  );
  const [gender, setgender] = useState(profileInfo?.gender ?? "");
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
        Personal Information
      </h3>
      <div className=" px-2 lg:px-20 py-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-4">
        <div className="flex items-end justify-between">
          <div>
            {open === "name" ? (
              <div className="space-y-2">
                <div className="flex flex-col ">
                  <label>First name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      const value = e.target.value;
                      dispatch(setFirstName(value));
                      setfirstName(value);
                    }}
                    className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  />
                </div>
                <div className="flex flex-col ">
                  <label>Middle name</label>
                  <input
                    type="text"
                    value={middleName}
                    onChange={(e) => {
                      const value = e.target.value;
                      dispatch(setMiddleName(value));
                      setmiddleName(value);
                    }}
                    className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  />
                </div>
                <div className="flex flex-col ">
                  <label>Last name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      const value = e.target.value;
                      dispatch(setLastName(value));
                      setlastName(value);
                    }}
                    className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  />
                </div>
                <div className="flex items-center gap-10">
                  <button
                    onClick={() => {
                      setOpen("");
                      dispatch(resetProfile());
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
                  Full Name
                </h1>
                <p className="text-gray-600">
                  {profileInfo?.name?.firstName}{" "}
                  {profileInfo?.name?.middleName &&
                    profileInfo?.name?.middleName}{" "}
                  {profileInfo?.name?.lastName}
                </p>
              </div>
            )}
          </div>
          {open !== "name" && (
            <button
              onClick={() => setOpen("name")}
              className="text-red-600 text-lg "
            >
              <MdEdit />
            </button>
          )}
        </div>

        <div className="flex items-end justify-between">
          {open === "date" ? (
            <div className="flex flex-col">
              <label>Date of Birth</label>
              <DatePicker
                selected={date}
                onChange={(date) => {
                  const age = calculateAge(date?.toDateString() as string);
                  if (age < 18) {
                    toast.error("your age should be over 18", {
                      duration: 3000,
                    });
                    setDate(new Date(profileInfo?.dateOfBirth as string));
                    return;
                  }
                  setDate(date as Date);
                  dispatch(setDOB((date as Date).toISOString().split("T")[0]));
                }}
                dateFormat="yyyy-MM-dd"
                className="border p-2 rounded"
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
              />
              <div className="flex items-center gap-10">
                <button
                  onClick={() => {
                    setOpen("");
                    dispatch(resetProfile());
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
            <div>
              <h1 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Date of Birth
              </h1>
              <div className="flex lg:flex-col">
                <p className="text-gray-600 ">
                  {formatedDate(new Date(profileInfo?.dateOfBirth))}{" "}
                </p>
                <p className="text-gray-600">
                  ( {calculateAge(profileInfo?.dateOfBirth)} years old)
                </p>
              </div>
            </div>
          )}
          {open !== "date" && (
            <button
              onClick={() => setOpen("date")}
              className="text-red-600 text-lg "
            >
              <MdEdit />
            </button>
          )}
        </div>

        <div className="flex items-end justify-between">
          {open === "gender" ? (
            <div className="space-y-2">
              <div className="relative">
                <label>Gender</label>
                <select
                  value={gender}
                  onChange={(e) => {
                    const value = e.target.value;
                    dispatch(setGender(value as TGender));
                    setgender(value as TGender);
                  }}
                  className="block w-full appearance-none px-4 py-2 rounded-xl outline-none 
            bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
            transition-all duration-500 pr-10 border-2"
                >
                  {["male", "female", "others"].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-12 -translate-y-1/2 pointer-events-none text-secondary"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.084l3.71-3.854a.75.75 0 111.08 1.04l-4.24 4.396a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </div>
              <div className="flex items-center gap-10">
                <button
                  onClick={() => {
                    setOpen("");
                    dispatch(resetProfile());
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
                Gender
              </h1>
              <p className="text-gray-600">{profileInfo?.gender}</p>
            </div>
          )}
          {open !== "gender" && (
            <button
              onClick={() => setOpen("gender")}
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

export default PersonalInfoSettings;
