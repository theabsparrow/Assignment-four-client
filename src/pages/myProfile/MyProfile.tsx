/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMyProfileQuery,
  useUpdateUserInfoMutation,
} from "@/redux/features/user/userApi";
import profileIcon from "../../assets/profile-photo.png";
import coverImageIcon from "../../assets/coverImage.png";
import { imageUpload } from "@/utills/uploadImage";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { calculateAge } from "./myProfile.utills";
import ProfileLoader from "@/myComponent/loader/ProfileLoader";
import { TMyProfileQUery } from "@/interface/navbar.types";

const MyProfile = () => {
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "profile";
  const { data, isLoading } = useMyProfileQuery(query);
  const profileInfo = data?.data;

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
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (profileInfo) {
      const age = calculateAge(profileInfo?.dateOfBirth);
      setAge(age);
    }
  }, [profileInfo?.dateOfBirth]);

  const methods = useForm({
    defaultValues: {
      homeTown: homeTown || "",
      currentAddress: currentAddress || "",
    },
  });
  const [editing, setEditing] = useState(false);
  const [updatedInfo] = useUpdateUserInfoMutation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const onSubmit = async (data: any) => {
    const toastId = toast.loading(`address info updating....`);
    try {
      const res = await updatedInfo(data).unwrap();
      if (res.data.result?.homeTown) {
        setHomeTown(res.data.result?.homeTown);
        toast.success(res.message, {
          id: toastId,
          duration: 3000,
        });
      }
      if (res.data.result?.currentAddress) {
        setCurrentAddress(res.data.result?.currentAddress);
        setEditing(!editing);
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  if (isLoading) {
    return <ProfileLoader />;
  }
  return (
    <div className="max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden font-inter pb-10 dark:bg-gray-800">
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
      <div className="relative w-24 h-24 md:w-44 md:h-44 rounded-full border border-primary cursor-pointer">
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
      <div className="flex items-center dark:text-gray-400">
        <h2 className="text-3xl mx-4 font-bold my-2 ">
          {profileInfo?.name.firstName}{" "}
          {profileInfo?.name?.middleName && profileInfo.name.middleName}{" "}
          {profileInfo?.name.lastName}
        </h2>{" "}
        <span className="font-bold text-lg">({profileInfo?.gender})</span>
      </div>

      <div className=" mt-4 p-4 bg-white dark:bg-gray-950 mx-4 rounded-lg shadow-md ">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <div className="mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-gray-600">{profileInfo?.email}</p>
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <p className="mt-1 text-gray-600">{profileInfo?.phoneNumber}</p>
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <p className="mt-1 text-gray-600">
              {profileInfo?.dateOfBirth} <span>(Age: {age})</span>
            </p>
          </div>
        </div>
        <h1 className="text-center">
          Go to{" "}
          <Link to="/settings" className="text-blue-600 font-semibold text-lg">
            Settings
          </Link>{" "}
          to update personal info
        </h1>
      </div>

      <div className="p-4 bg-white dark:bg-gray-950 mt-4 mx-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Address Information</h3>

          <button
            onClick={() => setEditing(!editing)}
            className="text-blue-500 font-semibold hover:underline"
          >
            {editing ? "cancel " : "Edit"}
          </button>
        </div>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Home Town
            </label>
            {editing ? (
              <input
                type="text"
                {...methods.register("homeTown")}
                className="mt-1 w-full p-2 border rounded-lg outline-none dark:bg-gray-700"
              />
            ) : (
              <p className="mt-1 text-gray-600">{homeTown || "Not set"}</p>
            )}
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Current Address
            </label>
            {editing ? (
              <input
                type="text"
                {...methods.register("currentAddress")}
                className="mt-1 w-full p-2 border rounded-lg outline-none dark:bg-gray-700"
              />
            ) : (
              <p className="mt-1 text-gray-600">
                {currentAddress || "Not set"}
              </p>
            )}
          </div>
          {editing && (
            <div className="mt-4">
              <button className="bg-secondary dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition ">
                {" "}
                update{" "}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
