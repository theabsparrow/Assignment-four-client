/* eslint-disable @typescript-eslint/no-explicit-any */
import useMyProfile from "@/hook/useMyProfile";
import {
  useUpdateAddressMutation,
  useUpdateImageMutation,
} from "@/redux/features/user/userApi";
import { imageUpload } from "@/utills/uploadImage";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const MyProfile = () => {
  const myprofile = useMyProfile();
  const [profileImage, setProfileImage] = useState<string | "">(
    myprofile.myProfile?.profileImage
  );
  const [coverImage, setCoverImage] = useState<string | "">(
    myprofile.myProfile?.coverImage
  );
  const [homeTown, setHomeTown] = useState<string | " ">(
    myprofile.myProfile?.homeTown
  );
  const [currentAddress, setCurrentAddress] = useState<string | " ">(
    myprofile.myProfile?.currentAddress
  );

  const methods = useForm({
    defaultValues: {
      homeTown: homeTown || "",
      currentAddress: currentAddress || "",
    },
  });
  const [editing, setEditing] = useState(false);
  const [updateImage] = useUpdateImageMutation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [updateAddress] = useUpdateAddressMutation();

  useEffect(() => {
    if (myprofile?.myProfile) {
      setProfileImage(myprofile.myProfile.profileImage);
      setCoverImage(myprofile.myProfile.coverImage);
      setHomeTown(myprofile.myProfile.homeTown);
      setCurrentAddress(myprofile.myProfile.currentAddress);
    }
  }, [myprofile]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const toastId = toast.loading(`${type} photo uploading....`);
    const file = event.target.files?.[0];
    try {
      const image: { profileImage?: string; coverImage?: string } = {};
      if (type === "cover") {
        image.coverImage = await imageUpload(file!);
      } else {
        image.profileImage = await imageUpload(file!);
      }
      let res;
      if (image) {
        res = await updateImage(image).unwrap();
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
    const res = await updateAddress(data);
    if (res.data.result?.homeTown) {
      setHomeTown(res.data.result?.homeTown);
    }
    if (res.data.result?.currentAddress) {
      setCurrentAddress(res.data.result?.currentAddress);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden font-inter pb-10 dark:bg-gray-800">
      <div className="relative h-40 md:h-60 bg-gray-200 ">
        {coverImage && (
          <img
            src={coverImage}
            alt="Cover"
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setSelectedImage(coverImage)}
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
      <div className="relative ">
        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 md:w-44 md:h-44 rounded-full border border-primary cursor-pointer"
            onClick={() => setSelectedImage(profileImage)}
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
          {myprofile.myProfile?.name.firstName}{" "}
          {myprofile.myProfile?.name?.middleName}{" "}
          {myprofile.myProfile?.name.lastName}
        </h2>{" "}
        <span className="font-bold text-lg">
          ({myprofile.myProfile?.gender})
        </span>
      </div>

      <div className=" mt-4 p-4 bg-white dark:bg-gray-950 mx-4 rounded-lg shadow-md ">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <div className="mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-gray-600">{myprofile.myProfile?.email}</p>
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <p className="mt-1 text-gray-600">
              {myprofile.myProfile?.phoneNumber}
            </p>
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <p className="mt-1 text-gray-600">
              {myprofile.myProfile?.dateOfBirth}{" "}
              <span>(Age: {myprofile.myProfile?.age})</span>
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
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Address Information</h3>
            <button
              className="text-blue-500 font-semibold hover:underline"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Save" : "Edit"}
            </button>
          </div>
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
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
