import { USER_ROLE } from "@/config/role.const";
import useMyProfile from "@/hook/useMyProfile";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetSingleCarQuery } from "@/redux/features/car/carApi";
import { useOrderDetailsQuery } from "@/redux/features/order/orderApi";

import { useGetASingleUSerQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { Link, useParams } from "react-router-dom";
import {
  progressPercentage,
  statusColors,
  trackingstatusColors,
} from "./orderDetails.const";
import { TOrderStatus, TTrackingStatus } from "./orderDetails.interface";

const OrderDetails = () => {
  const user = useAppSelector(currentUser);
  const { id } = useParams();
  const { data, isLoading } = useOrderDetailsQuery(id);

  const order = data?.data;
  const carId = data?.data?.car;
  const userId = data?.data?.userID;

  const { data: carData, isLoading: loading } = useGetSingleCarQuery(carId);
  const car = carData?.data;

  const { data: userData, isLoading: userLoading } = useGetASingleUSerQuery(
    userId,
    {
      skip:
        user?.userRole !== USER_ROLE.admin ||
        user?.userRole !== USER_ROLE.superAdmin,
    }
  );

  const myprofile =
    useMyProfile([
      "name",
      "profileImage",
      "email",
      "phoneNumber",
      "currentAddress",
      "homeTown",
      "gender",
      "_id",
    ]) || {};

  const userInfo =
    user?.userRole === USER_ROLE.admin ||
    user?.userRole === USER_ROLE.superAdmin
      ? {
          name: userData?.data?.name || {},
          profileImage: userData?.data?.profileImage || "",
          email: userData?.data?.email || "",
          phoneNumber: userData?.data?.phoneNumber || "",
          currentAddress: userData?.data?.currentAddress || "",
          gender: userData?.data?.gender || "",
          homeTown: userData?.data?.homeTown || "",
          id: userData?.data?._id || "",
        }
      : {
          name: myprofile?.myProfile?.name || {},
          profileImage: myprofile?.myProfile?.profileImage || "",
          email: myprofile?.myProfile?.email || "",
          phoneNumber: myprofile?.myProfile?.phoneNumber || "",
          currentAddress: myprofile?.myProfile?.currentAddress || "",
          gender: myprofile?.myProfile?.gender || "",
          homeTown: myprofile?.myProfile?.homeTown || "",
          id: myprofile?.myProfile?._id || "",
        };

  if (isLoading || loading || userLoading || myprofile?.isLoading) {
    return <p>loading........</p>;
  }
  return (
    <div className="px-4 md:px-32 md:p-8 bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* User Info */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 shadow-lg rounded-xl px-3 py-3 border border-blue-200 dark:border-gray-600">
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 border-b-2 border-indigo-300 dark:border-indigo-600 pb-2">
            👩‍🦰 User Information
          </h2>
          <div className="flex items-center gap-2">
            <img
              src={userInfo?.profileImage}
              alt={`${userInfo?.name?.firstName} ${userInfo?.name?.lastName}`}
              className=" w-[10vw] rounded-lg shadow-md border border-gray-300 dark:border-gray-600"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
              <p className=" mt-1">
                <span className="text-gray-700 dark:text-gray-400">Name:</span>{" "}
                <span className="font-semibold text-indigo-800 dark:text-indigo-300">
                  {" "}
                  {userInfo?.name?.firstName} {userInfo?.name?.lastName}
                </span>
              </p>
              <p className=" mt-1">
                <span className="text-gray-700 dark:text-gray-400">
                  Gender:
                </span>{" "}
                <span className="font-semibold text-indigo-800 dark:text-indigo-300">
                  {userInfo?.gender}{" "}
                  {userInfo?.gender === "female" ? "👩" : "👨"}
                </span>
              </p>
              <p className=" mt-1">
                <span className="text-gray-700 dark:text-gray-400">Email:</span>{" "}
                <span className="font-semibold text-indigo-800 dark:text-indigo-300">
                  {userInfo?.email}
                </span>
              </p>
              <p className=" mt-1">
                <span className="text-gray-700 dark:text-gray-400">
                  Phone Number:
                </span>{" "}
                <span className="font-semibold text-indigo-800 dark:text-indigo-300">
                  {userInfo?.phoneNumber}
                </span>
              </p>
              <p className=" mt-1">
                <span className="text-gray-700 dark:text-gray-400">
                  Current Address:
                </span>{" "}
                <span className="font-semibold text-indigo-800 dark:text-indigo-300">
                  {userInfo?.currentAddress || "N/A"}
                </span>
              </p>

              <p className=" mt-1">
                <span className="text-gray-700 dark:text-gray-400">
                  Current Address:
                </span>{" "}
                <span className="font-semibold text-indigo-800 dark:text-indigo-300">
                  {userInfo?.homeTown || "N/A"}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              className="bg-primary p-2 rounded-lg text-white font-semibold  hover:bg-secondary  duration-500 "
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

        {/* Car Info */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 shadow-lg rounded-xl px-6 py-3  border border-blue-200 dark:border-gray-600 transition-all duration-300 hover:shadow-2xl">
          <div className="border-b-2 border-indigo-300 dark:border-indigo-600 pb-2 flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 ">
              🚗 Car Information
            </h2>
            <div>
              <img
                src={car?.carBrandLogo}
                alt={`${car?.brand} logo`}
                className="w-12 h-12 rounded-full  border border-gray-300 bg-white shadow-md"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-full md:w-48">
              <img
                src={car?.image}
                alt={`${car?.brand} ${car?.model}`}
                className="w-[15vw] h-[9vw] rounded-lg shadow-md border border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
              {/* Brand */}
              <div>
                <span className="font-semibold text-indigo-800 dark:text-indigo-300">
                  Brand:
                </span>{" "}
                <span className="text-gray-700 dark:text-gray-400">
                  {car?.brand}
                </span>
              </div>

              {/* Category */}
              <div>
                <span className="font-semibold text-indigo-800 dark:text-indigo-300">
                  Category:
                </span>{" "}
                <span className="text-gray-700 dark:text-gray-400">
                  {car?.category}
                </span>
              </div>

              {/* Model */}
              <div>
                <span className="font-semibold text-indigo-800 dark:text-indigo-300">
                  Model:
                </span>{" "}
                <span className="text-gray-700 dark:text-gray-400">
                  {car?.model}
                </span>
              </div>

              {/* Year */}
              <div>
                <span className="font-semibold text-indigo-800 dark:text-indigo-300">
                  Year:
                </span>{" "}
                <span className="text-gray-700 dark:text-gray-400">
                  {car?.year}
                </span>
              </div>

              {/* Price */}
              <div>
                <span className="font-semibold text-indigo-800 dark:text-indigo-300">
                  Price:
                </span>{" "}
                <span className="text-green-600 dark:text-green-400 font-bold">
                  ${car?.price}
                </span>
              </div>

              {/* Quantity */}
              <div>
                <span className="font-semibold text-indigo-800 dark:text-indigo-300">
                  Quantity:
                </span>{" "}
                <span className="text-gray-700 dark:text-gray-400">
                  {order?.quantity}
                </span>
              </div>

              {/* Condition */}
              <div>
                <span className="font-semibold text-indigo-800 dark:text-indigo-300">
                  Condition:
                </span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    car?.condition === "New"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {car?.condition}
                </span>
              </div>
              <div>
                <span className="font-semibold text-indigo-800 dark:text-indigo-300">
                  Seating Capacity:
                </span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold `}
                >
                  {car?.seatingCapacity}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link
              className="bg-primary p-2 rounded-lg text-white font-semibold  hover:bg-secondary  duration-500 "
              to={`/details/${car?._id}`}
            >
              View car details
            </Link>
          </div>
        </div>
      </div>

      {/* Order Status */}
      <div className="mb-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Order Status</h2>
        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1 rounded-full ${
              statusColors[order?.status as TOrderStatus]
            }`}
          >
            {order?.status}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(order?.date_time).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Tracking Info */}
      <div className="mb-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Tracking Information</h2>
        <div>
          <span className="font-semibold">Tracking ID:</span>{" "}
          {order?.tracking?.trackingID}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold">Tracking Status:</span>
          <div
            className={`px-3 py-1 rounded-full ${
              trackingstatusColors[
                order?.tracking.trackingStatus as TTrackingStatus
              ]
            }`}
          >
            {order?.tracking.trackingStatus}{" "}
            {
              progressPercentage[
                order?.tracking?.trackingStatus as TTrackingStatus
              ]
            }
            %`
          </div>
        </div>
        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full order?.status ? ${
              trackingstatusColors[
                order?.tracking.trackingStatus as TTrackingStatus
              ]
            }`}
            style={{
              width: `${
                progressPercentage[
                  order?.tracking?.trackingStatus as TTrackingStatus
                ]
              }%`,
            }}
          ></div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Delivery Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="font-semibold">Delivery Method:</span>{" "}
            {order?.deliveryMethod}
          </div>
          {order?.location && (
            <div>
              <span className="font-semibold">Location:</span> {order?.location}
            </div>
          )}
          {order?.nearestDealer && (
            <div>
              <span className="font-semibold">Nearest Dealer:</span>{" "}
              {order?.nearestDealer}
            </div>
          )}

          <div>
            <span className="font-semibold">Estimated Delivery:</span>{" "}
            {order?.estimatedDeliveryTime}
          </div>
          <div>
            <span className="font-semibold">Phone Number:</span>{" "}
            {order?.phoneNumber}
          </div>

          <div>
            <span className="font-semibold">Payment Method:</span>{" "}
            {order?.paymentMethod}
          </div>
          <div>
            <span className="font-semibold">Payment Option:</span>{" "}
            {order?.paymentOption}
          </div>
          <div>
            <span className="font-semibold">Delivery Cost:</span> $
            {order?.deliveryCost}
          </div>
          <div>
            <span className="font-semibold">Total Price:</span> $
            {order?.totalPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
