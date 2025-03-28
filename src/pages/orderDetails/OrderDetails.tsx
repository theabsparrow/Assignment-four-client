import { USER_ROLE } from "@/config/role.const";
import useMyProfile from "@/hook/useMyProfile";
import { currentUser, TUser } from "@/redux/features/auth/authSlice";
import { useGetSingleCarQuery } from "@/redux/features/car/carApi";
import { useOrderDetailsQuery } from "@/redux/features/order/orderApi";
import { useGetASingleUSerQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "react-router-dom";
import { progressPercentage, trackingstatusColors } from "./orderDetails.const";
import { TTrackingStatus } from "./orderDetails.interface";
import UserInfoSection from "./UserInfoSection";
import CarInfoSection from "./CarInfoSection";
import OrderInfoSection from "./OrderInfoSection";
import DelioveryInfoSection from "./DelioveryInfoSection";

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
    </div>
  );
};

export default OrderDetails;
