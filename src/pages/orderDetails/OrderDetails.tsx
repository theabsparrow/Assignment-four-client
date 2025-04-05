import { USER_ROLE } from "@/config/role.const";
import useMyProfile from "@/hook/useMyProfile";
import { currentUser, TUser } from "@/redux/features/auth/authSlice";
import { useGetSingleCarQuery } from "@/redux/features/car/carApi";
import { useOrderDetailsQuery } from "@/redux/features/order/orderApi";
import { useGetASingleUSerQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "react-router-dom";
import UserInfoSection from "./UserInfoSection";
import CarInfoSection from "./CarInfoSection";
import OrderInfoSection from "./OrderInfoSection";
import DelioveryInfoSection from "./DelioveryInfoSection";
import CountTime from "./CountTime";
import Tracking from "./Tracking";
import { useState } from "react";
import { FiMapPin, FiEyeOff } from "react-icons/fi";

const OrderDetails = () => {
  const user = useAppSelector(currentUser);
  const { id } = useParams();
  const { data, isLoading } = useOrderDetailsQuery(id);
  const [isEnable, setIsEnable] = useState(false);
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

  const switchTracking = async (isTracking: boolean) => {
    setIsEnable(isTracking);
    console.log(isTracking);
  };

  if (isLoading || loading || userLoading || myprofile?.isLoading) {
    return <p>loading........</p>;
  }
  return (
    <div className="px-4 md:px-32 md:p-8 bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen font-inter">
      <section className="flex flex-col md:flex-row md:items-center md:justify-between">
        <UserInfoSection
          userInfo={userInfo}
          user={user as TUser}
        ></UserInfoSection>
        <CarInfoSection car={car}></CarInfoSection>
      </section>
      <section className="flex flex-col md:flex-row md:items-center justify-between">
        <OrderInfoSection order={order}></OrderInfoSection>
        <DelioveryInfoSection order={order}></DelioveryInfoSection>
      </section>

      {/* Tracking Info */}
      <section className="mb-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 shadow-lg rounded-xl px-2 py-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => switchTracking(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
              !isEnable
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            <FiEyeOff className="text-lg" />
            Tracking Off
          </button>
          <button
            onClick={() => switchTracking(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
              isEnable
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            <FiMapPin className="text-lg" />
            Tracking On
          </button>
        </div>

        <CountTime estimatedTime={order?.estimatedDeliveryTime}></CountTime>
        <Tracking tracking={order?.tracking}></Tracking>
      </section>
    </div>
  );
};

export default OrderDetails;
