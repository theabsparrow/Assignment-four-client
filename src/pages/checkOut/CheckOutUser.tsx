import { TUser } from "./checkOutInterface";

type UserInfoProps = {
  user: TUser;
};

const CheckOutUser = ({ user }: UserInfoProps) => {
  return (
    <section className="font-inter">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 dark:text-gray-200">
        User Information
      </h2>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="shrink-0">
          <img
            src={user?.profileImage}
            alt="User"
            className="w-72 h-52 object-cover rounded-lg border-4 border-gray-300 dark:border-gray-700 shadow-lg"
          />
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
            <p className="text-gray-600 dark:text-gray-400">
              Hometown:{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {user?.homeTown}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Current Address:{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {user?.currentAddress}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOutUser;
