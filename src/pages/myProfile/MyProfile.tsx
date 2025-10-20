/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMyProfileQuery,
  useUpdateUserInfoMutation,
} from "@/redux/features/user/userApi";
import profileIcon from "../../assets/profile-photo.png";
import coverImageIcon from "../../assets/coverImage.png";
import { imageUpload } from "@/utills/uploadImage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { calculateAge, formatedDate } from "./myProfile.utills";
import ProfileLoader from "@/myComponent/loader/ProfileLoader";
import { TMyProfileQUery } from "@/interface/navbar.types";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentSettings,
  resetProfile,
  setCurrent,
  setHome,
} from "@/redux/features/setting/settingSlice";
import { MdEdit } from "react-icons/md";

const MyProfile = () => {
  // redux state
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "profile";
  const { data, isLoading } = useMyProfileQuery(query);
  const profileInfo = data?.data;
  const personalInfo = useAppSelector(currentSettings);
  const dispatch = useAppDispatch();
  const [updatedInfo] = useUpdateUserInfoMutation();
  // local state
  const [open, setOpen] = useState<"home" | "current" | "">("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | "">(
    profileInfo?.profileImage
  );
  const [coverImage, setCoverImage] = useState<string | "">(
    profileInfo?.coverImage
  );
  const [homeTown, setHomeTown] = useState<string | " ">(
    profileInfo?.homeTown ?? "No hometown"
  );
  const [currentAddress, setCurrentAddress] = useState<string | " ">(
    profileInfo?.currentAddress ?? "No current address"
  );

  useEffect(() => {
    if (profileInfo) {
      setProfileImage(profileInfo.profileImage);
      setCoverImage(profileInfo.coverImage);
      setHomeTown(profileInfo.homeTown);
      setCurrentAddress(profileInfo.currentAddress);
    }
  }, [profileInfo]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = event.target.files?.[0];
    const toastId = toast.loading(`${type} photo uploading....`);
    try {
      const image: { profileImage?: string; coverImage?: string } = {};
      if (type === "cover") {
        image.coverImage = await imageUpload(file!);
      } else {
        image.profileImage = await imageUpload(file!);
      }
      let res;
      if (image) {
        res = await updatedInfo(image).unwrap();
      }
      if (res.data.result?.coverImage) {
        setCoverImage(res.data.result?.coverImage);
      } else if (res.data.result?.profileImage) {
        setProfileImage(res.data.result?.profileImage);
      }
      toast.success(`${type} photo uploaded successfully`, {
        id: toastId,
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (!personalInfo || Object.keys(personalInfo).length === 0) {
      return toast.error("nothing to update", { duration: 3000 });
    }
    const toastId = toast.loading("updating personal info....");
    try {
      const res = await updatedInfo(personalInfo).unwrap();
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

  if (isLoading) {
    return <ProfileLoader />;
  }
  return (
    <div className="mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden font-inter pb-10 dark:bg-gray-800 px-2 lg:px-16">
      <div className="relative h-40 md:h-60 bg-gray-200 ">
        {coverImage ? (
          <img
            src={coverImage}
            alt="Cover"
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setSelectedImage(coverImage)}
          />
        ) : (
          <img
            src={coverImageIcon}
            alt="Cover"
            className="w-full h-full object-cover cursor-pointer"
          />
        )}

        <label className="absolute bottom-1 right-1 bg-gray-300 dark:bg-gray-700 p-2 rounded-full shadow-md cursor-pointer">
          📷
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleImageChange(e, "cover")}
          />
        </label>
      </div>
      <div className="relative w-24 h-24 md:w-44 md:h-44 rounded-full cursor-pointer">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 md:w-44 md:h-44 rounded-full border border-primary cursor-pointer"
            onClick={() => setSelectedImage(profileImage)}
          />
        ) : (
          <img
            src={profileIcon}
            alt="Profile"
            className="w-24 h-24 md:w-44 md:h-44 rounded-full border border-primary cursor-pointer"
          />
        )}

        <label className="absolute bottom-1 left-4 bg-white dark:bg-gray-500 p-1 rounded-full shadow-md cursor-pointer">
          📷
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleImageChange(e, "profile")}
          />
        </label>
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full View"
            className="max-w-full max-h-full p-4"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-5 right-5 text-white text-2xl"
            onClick={() => setSelectedImage(null)}
          >
            ✖
          </button>
        </div>
      )}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2 dark:text-gray-400">
          <h2 className="text-2xl lg:text-3xl font-bold ">
            {profileInfo?.name.firstName}{" "}
            {profileInfo?.name?.middleName && profileInfo.name.middleName}{" "}
            {profileInfo?.name.lastName}
          </h2>{" "}
          <span className="font-bold text-lg">({profileInfo?.gender})</span>
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
        </div>
        <h1 className="font-semibold">
          Since {formatedDate(new Date(profileInfo?.createdAt)).creationDate}{" "}
          {formatedDate(new Date(profileInfo?.createdAt)).creationTime}
        </h1>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-6 ">
          <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md w-full space-y-2">
            <h3 className="text-lg font-semibold text-gray-400">
              Personal Information
            </h3>
            <div>
              <div>
                <label className="block text-sm font-medium ">Email</label>
                <p className="mt-1 ">{profileInfo?.email}</p>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium ">
                  Phone Number
                </label>
                <p className="mt-1 ">{profileInfo?.phoneNumber}</p>
              </div>

              <div className="mt-2">
                <label className="block text-sm font-medium ">
                  Date of Birth
                </label>
                <p className="mt-1 ">
                  {profileInfo?.dateOfBirth}{" "}
                  <span>(Age: {calculateAge(profileInfo?.dateOfBirth)})</span>
                </p>
              </div>
            </div>
            <h1 className="text-center">
              Go to{" "}
              <Link
                to="/settings"
                className="text-blue-600 font-semibold text-lg"
              >
                Settings
              </Link>{" "}
              to update personal info
            </h1>
          </div>

          <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md w-full space-y-2">
            <div className="flex items-end justify-between">
              <div>
                {open === "home" ? (
                  <div className="space-y-2">
                    <div className="flex flex-col ">
                      <label>Home Town</label>
                      <input
                        type="text"
                        value={homeTown}
                        onChange={(e) => {
                          const value = e.target.value;
                          dispatch(setHome(value));
                          setHomeTown(value);
                        }}
                        className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                      />
                    </div>

                    <div className="flex items-center gap-10">
                      <button
                        onClick={() => {
                          setOpen("");
                          dispatch(resetProfile());
                          setHomeTown(profileInfo?.homeTown);
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
                      Home Town
                    </h1>
                    <p className="text-gray-600">
                      {profileInfo?.homeTown ?? "No home town"}{" "}
                    </p>
                  </div>
                )}
              </div>
              {open !== "home" && (
                <button
                  onClick={() => {
                    setOpen("home");
                    dispatch(resetProfile());
                  }}
                  className="text-red-600 text-lg "
                >
                  <MdEdit />
                </button>
              )}
            </div>
            <div className="flex items-end justify-between">
              <div>
                {open === "current" ? (
                  <div className="space-y-2">
                    <div className="flex flex-col ">
                      <label>Current Address</label>
                      <input
                        type="text"
                        value={currentAddress}
                        onChange={(e) => {
                          const value = e.target.value;
                          dispatch(setCurrent(value));
                          setCurrentAddress(value);
                        }}
                        className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                      />
                    </div>

                    <div className="flex items-center gap-10">
                      <button
                        onClick={() => {
                          setOpen("");
                          dispatch(resetProfile());
                          setHomeTown(profileInfo?.currentAddress);
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
                      Current Address
                    </h1>
                    <p className="text-gray-600">
                      {profileInfo?.currentAddress ?? "No current address"}{" "}
                    </p>
                  </div>
                )}
              </div>
              {open !== "current" && (
                <button
                  onClick={() => {
                    setOpen("current");
                    dispatch(resetProfile());
                  }}
                  className="text-red-600 text-lg "
                >
                  <MdEdit />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
