import { useGetCheckoutInfoQuery } from "@/redux/features/car/carApi";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTruckFront } from "react-icons/fa6";
import { SiCashapp } from "react-icons/si";
import { FaCcAmazonPay } from "react-icons/fa";
import CheckOutCar from "./CheckOutCar";
import CheckOutUser from "./CheckOutUser";
import OrderSummery from "./OrderSummery";
import {
  deliveryIconMap,
  paymentIconMap,
  paymentOptionIconMap,
} from "./CheckOut.const";
import { TOrderInfo } from "./checkOutInterface";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { toast } from "sonner";
import { TDeliveryMethod } from "@/interface/carInterface/carDelivery.interface";
import CheckoutDelivery from "./CheckoutDelivery";

const CheckOut = () => {
  // redux state
  const { id } = useParams();
  const { data, isLoading } = useGetCheckoutInfoQuery(id);
  const { car, userInfo } = data?.data || {};
  const { deliveryAndPayment } = car || {};
  // local state
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [nearestDealer, setNearestDealer] = useState("");
  const [useExistingNumber, setUseExistingNumber] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber ?? "");
  const [errorMessage, setErrorMessage] = useState("");
  const [createOrder] = useCreateOrderMutation();

  const handleChange = (label: string, value: string) => {
    if (label === "user") setLocation(value);
    if (label === "dealer") setNearestDealer(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    // const toastId = "order";
    // if (selectedPaymentMethod === "Cash on Delivery") {
    //   return toast.error(
    //     "cash on delivery will no work yet! please select online payment",
    //     { id: toastId }
    //   );
    // }

    // if (
    //   selectedPaymentOption === "SSLCommerz" ||
    //   selectedPaymentOption === "Stripe"
    // ) {
    //   return toast.error(
    //     `${selectedPaymentOption} payment method is unavailable. select surjoPay`,
    //     { id: toastId }
    //   );
    // }

    // if (!nearestDealer && selectedDeliveryMethod === "Pickup") {
    //   return setErrorMessage("nearest dealer information needed");
    // }
    // if (
    //   !location &&
    //   (selectedDeliveryMethod === "Home Delivery" ||
    //     selectedDeliveryMethod === "Express Delivery")
    // ) {
    //   return setErrorMessage("your address needed");
    // }

    // const estimatedDeliveryTime = car?.deliveryMethod.find(
    //   (method: TDeliveryMethod) =>
    //     method?.deliveryOption === selectedDeliveryMethod
    // )?.estimatedTime;

    // const deliveryCost = car?.deliveryMethod.find(
    //   (method: TDeliveryMethod) =>
    //     method?.deliveryOption === selectedDeliveryMethod
    // )?.deliveryCost;

    // const orderInfo: TOrderInfo = {
    //   deliveryMethod: selectedDeliveryMethod as string,
    //   estimatedDeliveryTime,
    //   phoneNumber,
    //   deliveryCost,
    //   paymentMethod: selectedPaymentMethod as string,
    //   paymentOption: selectedPaymentOption as string,
    // };
    // if (location) orderInfo.location = location;
    // if (nearestDealer) orderInfo.nearestDealer = nearestDealer;
    // const carId = car._id;

    // try {
    //   toast.loading("order processing....", { id: toastId });
    //   const res = await createOrder({ orderInfo, carId }).unwrap();
    //   if (res?.success) {
    //     window.location.href = res.data;
    //     toast.success(res?.message, { id: toastId });
    //   }
    // } catch (error: any) {
    //   const errorInfo =
    //     error?.data?.errorSource[0].message ||
    //     error?.data?.message ||
    //     error?.error ||
    //     "Something went wrong!";
    //   toast.error(errorInfo, { id: toastId, duration: 3000 });
    // }
  };

  if (isLoading) {
    return <h1>loading ...</h1>;
  }
  return (
    <section className=" mx-auto px-4 pb-4 md:pb-0 md:px-32 bg-gray-50 dark:bg-gray-900 shadow-lg rounded-lg min-h-[calc(100vh-80px)] font-inter">
      {/* car and user information */}
      <div className="flex flex-col gap-8 md:gap-0 md:flex-row items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-md py-8 px-4">
        <CheckOutCar car={car} />
        <CheckOutUser user={userInfo} />
      </div>

      {/* Order Details */}
      <div className="mt-8">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 dark:text-gray-200">
          Order Details
        </h2>
        <div className="flex flex-col md:flex-row justify-between">
          <CheckoutDelivery deliveryAndPayment={deliveryAndPayment} />

          {/* {(selectedDeliveryMethod || selectedPaymentMethod) && (
            <OrderSummery
              selectedDeliveryMethod={selectedDeliveryMethod}
              selectedPaymentMethod={selectedPaymentMethod}
              selectedPaymentOption={selectedPaymentOption}
              userPhoneNumber={phoneNumber}
              phoneNumber={phoneNumber}
              useExistingNumber={useExistingNumber}
              car={car}
              deliveryIconMap={deliveryIconMap}
              paymentIconMap={paymentIconMap}
              paymentOptionIconMap={paymentOptionIconMap}
              location={location}
              nearestDealer={nearestDealer}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              setPhoneNumber={setPhoneNumber}
              setUseExistingNumber={setUseExistingNumber}
              errorMessage={errorMessage}
            />
          )} */}
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
