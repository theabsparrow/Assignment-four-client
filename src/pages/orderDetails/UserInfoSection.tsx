import { TUser } from "@/redux/features/auth/authSlice";
import { TUSerInfo } from "./orderDetails.interface";
import { USER_ROLE } from "@/config/role.const";
import { Link } from "react-router-dom";

type TUserSectionProps = {
  userInfo: TUSerInfo;
  user: TUser;
};

const UserInfoSection = ({ userInfo, user }: TUserSectionProps) => {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 shadow-lg rounded-xl px-2 py-3 border border-blue-200 dark:border-gray-600 md:w-[40vw]">
      <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 border-b-2 border-indigo-300 dark:border-indigo-600 pb-2">
        👩‍🦰 User Information
      </h2>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <img
          src={userInfo?.profileImage}
          alt={`${userInfo?.name?.firstName} ${userInfo?.name?.lastName}`}
          className="md:w-[10vw] rounded-lg shadow-md border border-gray-300 dark:border-gray-600"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start">
          <p className="mt-1">
            <span className="text-gray-700 dark:text-gray-400">Name:</span>{" "}
            <span className="text-indigo-800 dark:text-indigo-300">
              {userInfo?.name?.firstName} {userInfo?.name?.lastName}
            </span>
          </p>
          <p className="mt-1">
            <span className="text-gray-700 dark:text-gray-400">Gender:</span>{" "}
            <span className="text-indigo-800 dark:text-indigo-300">
              {userInfo?.gender} {userInfo?.gender === "female" ? "👩" : "👨"}
            </span>
          </p>
          <p className="mt-1">
            <span className="text-gray-700 dark:text-gray-400">Email:</span>{" "}
            <span className="text-indigo-800 dark:text-indigo-300">
              {userInfo?.email}
            </span>
          </p>
          <p className="mt-1">
            <span className="text-gray-700 dark:text-gray-400">
              Phone Number:
            </span>{" "}
            <span className="text-indigo-800 dark:text-indigo-300">
              {userInfo?.phoneNumber}
            </span>
          </p>
          <p className="mt-1">
            <span className="text-gray-700 dark:text-gray-400">
              Current Address:
            </span>{" "}
            <span className="text-indigo-800 dark:text-indigo-300">
              {userInfo?.currentAddress || "N/A"}
            </span>
          </p>
          <p className="mt-1">
            <span className="text-gray-700 dark:text-gray-400">Home Town:</span>{" "}
            <span className="text-indigo-800 dark:text-indigo-300">
              {userInfo?.homeTown || "N/A"}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <Link
          className="bg-primary p-2 rounded-lg text-white hover:bg-secondary duration-500"
          to={
            user?.userRole === USER_ROLE.admin ||
            user?.userRole === USER_ROLE.superAdmin
              ? `/profile/${userInfo?.id}`
              : "/my-profile"
          }
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default UserInfoSection;
