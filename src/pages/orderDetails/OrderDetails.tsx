import { USER_ROLE } from "@/config/role.const";
import useMyProfile from "@/hook/useMyProfile";
import { currentUser, TUser } from "@/redux/features/auth/authSlice";
import {
  useOrderDetailsQuery,
  useOrderTrackingMutation,
} from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "react-router-dom";
import UserInfoSection from "./UserInfoSection";
import CarInfoSection from "./CarInfoSection";
import OrderInfoSection from "./OrderInfoSection";
import DelioveryInfoSection from "./DelioveryInfoSection";
import CountTime from "./CountTime";
import Tracking from "./Tracking";
import { useEffect, useState } from "react";
import { FiMapPin, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";
import OrderDetailsLoader from "@/myComponent/loader/orderDetailsLoader/OrderDetailsLoader";

const OrderDetails = () => {
  const user = useAppSelector(currentUser);
  const { id } = useParams();
  const { data, isLoading } = useOrderDetailsQuery(id);
  const order = data?.data;
  const [isEnable, setIsEnable] = useState(false);
  const car = data?.data?.car;
  const userData = data?.data?.userID;
  const [trackingOrder] = useOrderTrackingMutation();
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

  useEffect(() => {
    if (order?.tracking?.isTracking !== undefined) {
      setIsEnable(order.tracking.isTracking);
    }
  }, [order?.tracking?.isTracking]);

  const switchTracking = async (tracking: boolean) => {
    const trackingInfo = {
      orderId: order?._id,
      isTracking: tracking,
    };
    const toastId = "order";
    try {
      toast.loading(
        `processing to ${
          tracking === true ? "activate" : "deactivate"
        } the tracking....`,
        { id: toastId }
      );
      const res = await trackingOrder(trackingInfo).unwrap();
      if (res?.data) {
        toast.success(
          `tracking system has been ${
            tracking === true ? "activated" : "deactivated"
          }`,
          { id: toastId }
        );
        setIsEnable(tracking);
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.errorSource[0].message ||
        error?.data?.message ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  if (isLoading || myprofile?.isLoading) {
    return <OrderDetailsLoader></OrderDetailsLoader>;
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
        <div className="flex items-center justify-center space-x-2">
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
        {["Paid", "Cash on Delivery"].includes(order?.status) &&
          order?.tracking?.isTracking === true && (
            <>
              <CountTime
                estimatedTime={order?.estimatedDeliveryTime}
              ></CountTime>
              <Tracking tracking={order?.tracking}></Tracking>
            </>
          )}
      </section>
    </div>
  );
};

export default OrderDetails;
