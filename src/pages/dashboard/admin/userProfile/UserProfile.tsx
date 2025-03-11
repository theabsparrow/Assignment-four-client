import ProfileLoader from "@/myComponent/loader/ProfileLoader";
import { calculateAge } from "@/pages/myProfile/myProfile.utills";
import { useGetASingleUSerQuery } from "@/redux/features/user/userApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetASingleUSerQuery(id);
  const userInfo = data?.data;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [age, setAge] = useState<number>(0);
  useEffect(() => {
    if (userInfo?.dateOfBirth) {
      const age = calculateAge(userInfo?.dateOfBirth);
      setAge(age);
    }
  }, [userInfo?.dateOfBirth]);
  if (isLoading) {
    return <ProfileLoader></ProfileLoader>;
  }
  return (
    <div className="max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden font-inter pb-10 dark:bg-gray-800">
      <div className="relative h-40 md:h-60 bg-gray-200 ">
        {userInfo?.coverImage && (
          <img
            src={userInfo?.coverImage}
            alt="Cover"
            className="w-full h-full object-cover cursor-pointer"
          />
        )}
      </div>
      <div className="relative w-24 h-24 md:w-44 md:h-44 rounded-full border border-primary cursor-pointer">
        {userInfo?.profileImage && (
          <img
            src={userInfo?.profileImage}
            alt="Profile"
            className="w-24 h-24 md:w-44 md:h-44 rounded-full border border-primary cursor-pointer"
          />
        )}
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
          {userInfo?.name.firstName} {userInfo?.name?.middleName}{" "}
          {userInfo?.name.lastName}
        </h2>{" "}
        <span className="font-bold text-lg">({userInfo?.gender})</span>
      </div>

      <div className=" mt-4 p-4 bg-white dark:bg-gray-950 mx-4 rounded-lg shadow-md ">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <div className="mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-gray-600">{userInfo?.email}</p>
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <p className="mt-1 text-gray-600">{userInfo?.phoneNumber}</p>
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <p className="mt-1 text-gray-600">
              {userInfo?.dateOfBirth} <span>(Age: {age})</span>
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-gray-950 mt-4 mx-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Address Information</h3>
        </div>

        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Home Town
          </label>
          <p className="mt-1 text-gray-600">
            {userInfo?.homeTown || "Not set"}
          </p>
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Current Address
          </label>
          <p className="mt-1 text-gray-600">
            {userInfo?.currentAddress || "Not set"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
