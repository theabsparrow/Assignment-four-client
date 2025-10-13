import { TExtendedUser } from "@/interface/userInterface/userInfo";
import profileIcon from "../../assets/profile-photo.png";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

type UserInfoProps = {
  user: TExtendedUser;
};

const CheckOutUser = ({ user }: UserInfoProps) => {
  return (
    <section className="font-inter">
      <h2 className="text-3xl font-extrabold mb-4 md:mb-8 text-gray-800 dark:text-gray-200">
        User Information
      </h2>
      <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
        <div className="shrink-0">
          {(user?.profileImage as string) ? (
            <img
              src={user?.profileImage as string}
              alt="User"
              className="md:w-52 md:h-52 object-cover rounded-full border-4 border-gray-300 dark:border-gray-700 shadow-lg"
            />
          ) : (
            <img
              src={profileIcon}
              alt="User"
              className="md:w-52 md:h-52 object-cover rounded-full border-4 border-gray-300 dark:border-gray-700 shadow-lg"
            />
          )}
        </div>
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {user?.name.firstName} {user?.name.lastName}
          </h1>

          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            <p className="text-gray-600 dark:text-gray-400">
              Gender:{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {user?.gender}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Email:{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {user?.email}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Phone:{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {user?.phoneNumber}
              </span>
            </p>
            <p>
              {user?.verifyWithEmail ? (
                <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
                  <FaCheckCircle className="w-4 h-4" /> Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 text-sm font-medium">
                  <FaClock className="w-4 h-4 animate-pulse" />
                  Not verified
                </span>
              )}
            </p>
            {!user?.verifyWithEmail && (
              <p className="font-semibold">
                go to{" "}
                <Link to="/settings" className="text-blue-600 hover:underline">
                  settings
                </Link>{" "}
                to verify
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOutUser;
