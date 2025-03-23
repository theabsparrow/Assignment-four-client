import useMyProfile from "@/hook/useMyProfile";
import { useGetSingleCarQuery } from "@/redux/features/car/carApi";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTruckFront } from "react-icons/fa6";
import { SiCashapp } from "react-icons/si";
import { FaCcAmazonPay } from "react-icons/fa";
import { TDeliveryMethod } from "../dashboard/admin/addCar/addcar.interface";
import CheckOutCar from "./CheckOutCar";
import CheckOutUser from "./CheckOutUser";
import OrderSummery from "./OrderSummery";
import {
  deliveryIconMap,
  paymentIconMap,
  paymentOptionIconMap,
} from "./CheckOut.const";
import {
  TOrderInfo,
  TPaymentMethod,
  TPaymentOption,
} from "./checkOutInterface";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { toast } from "sonner";

const CheckOut = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCarQuery(id);
  const car = data?.data;
  const myprofile = useMyProfile() || {};
  const navigate = useNavigate();

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<
    string | null
  >(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<
    string | null
  >(null);

  const userPhoneNumber = myprofile?.myProfile?.phoneNumber || "";
  const [location, setLocation] = useState("");
  const [nearestDealer, setNearestDealer] = useState("");
  const [useExistingNumber, setUseExistingNumber] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(userPhoneNumber);
  const [errorMessage, setErrorMessage] = useState("");
  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    if (!isLoading && car && !car.inStock) {
      navigate("/");
    }
  }, [car, isLoading, navigate]);

  const handleChange = (label: string, value: string) => {
    if (label === "user") setLocation(value);
    if (label === "dealer") setNearestDealer(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    const toastId = "order";
    if (selectedPaymentMethod === "Cash on Delivery") {
      return toast.error(
        "cash on delivery will no work yet! please select online payment",
        { id: toastId }
      );
    }

    if (
      selectedPaymentOption === "SSLCommerz" ||
      selectedPaymentOption === "Stripe"
    ) {
      return toast.error(
        `${selectedPaymentOption} payment method is unavailable. select surjoPay`,
        { id: toastId }
      );
    }

    if (!nearestDealer && selectedDeliveryMethod === "Pickup") {
      return setErrorMessage("nearest dealer information needed");
    }
    if (
      !location &&
      (selectedDeliveryMethod === "Home Delivery" ||
        selectedDeliveryMethod === "Express Delivery")
    ) {
      return setErrorMessage("your address needed");
    }

    const estimatedDeliveryTime = car?.deliveryMethod.find(
      (method: TDeliveryMethod) => method?.method === selectedDeliveryMethod
    )?.estimatedTime;

    const deliveryCost = car?.deliveryMethod.find(
      (method: TDeliveryMethod) => method?.method === selectedDeliveryMethod
    )?.deliveryCost;

    const orderInfo: TOrderInfo = {
      deliveryMethod: selectedDeliveryMethod as string,
      estimatedDeliveryTime,
      phoneNumber,
      deliveryCost,
      paymentMethod: selectedPaymentMethod as string,
      paymentOption: selectedPaymentOption as string,
    };
    if (location) orderInfo.location = location;
    if (nearestDealer) orderInfo.nearestDealer = nearestDealer;
    const carId = car._id;

    try {
      toast.loading("order processing....", { id: toastId });
      const res = await createOrder({ orderInfo, carId }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId });
        window.location.href = res.data;
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

  return (
    <div className=" mx-auto px-4 md:px-32 bg-gray-50 dark:bg-gray-900 shadow-lg rounded-lg min-h-[calc(100vh-80px)] font-inter">
      {/* car and user information */}
      <section className="flex md:flex-row items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-md py-8 px-4">
        <CheckOutCar car={car} />
        <CheckOutUser user={myprofile?.myProfile} />
      </section>

      {/* Order Details */}
      <div className="mt-8">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 dark:text-gray-200">
          Order Details
        </h2>
        <main className="flex justify-between">
          <section className="md:w-[40vw]">
            {/* Delivery Method Selection */}
            <div className="mb-6 bg-white dark:bg-gray-800 px-6 py-4 rounded-lg  border-2 border-green-500">
              <p className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-2xl flex items-center gap-4">
                Delivery Method{" "}
                <FaTruckFront className="text-primary text-3xl" />
              </p>
              <div className=" space-y-3">
                {car?.deliveryMethod.map((method: TDeliveryMethod) => (
                  <div
                    key={method?.method}
                    onClick={() => setSelectedDeliveryMethod(method?.method)}
                    className={`p-6 rounded-lg shadow-md cursor-pointer transition flex items-center gap-3
              ${
                selectedDeliveryMethod === method?.method
                  ? "border-2 border-green-500 bg-green-100 dark:bg-green-900"
                  : "border border-gray-300 bg-white dark:bg-gray-700 hover:scale-x-105 duration-500"
              }
              text-gray-900 dark:text-gray-100 hover:border-2 hover:border-green-500 hover:bg-green-100 dark:hover:bg-green-900  duration-500`}
                  >
                    {
                      deliveryIconMap[
                        method?.method as keyof typeof deliveryIconMap
                      ]
                    }
                    {method?.method}
                  </div>
                ))}
              </div>
            </div>

            {/* payment method section */}
            {selectedDeliveryMethod && (
              <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-green-500">
                <p className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-2xl flex items-center gap-4">
                  Payment Method <SiCashapp className="text-primary text-3xl" />
                </p>
                <div className="space-y-3">
                  {car?.paymentMethod.map((method: TPaymentMethod) => (
                    <div
                      key={method?.method}
                      onClick={() => setSelectedPaymentMethod(method?.method)}
                      className={`p-6 rounded-lg shadow-md cursor-pointer transition flex items-center gap-3 
        ${
          selectedPaymentMethod === method?.method
            ? "border-2 border-blue-500 bg-blue-100 dark:bg-blue-900"
            : "border border-gray-300 bg-white dark:bg-gray-700"
        }
        text-gray-900 dark:text-gray-100`}
                    >
                      {
                        paymentIconMap[
                          method?.method as keyof typeof paymentIconMap
                        ]
                      }
                      {method?.method}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* payment options method section */}
            {selectedPaymentMethod &&
              selectedPaymentMethod === "Online Payment" && (
                <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-green-500">
                  <p className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-2xl flex items-center gap-4">
                    Payment Options{" "}
                    <FaCcAmazonPay className="text-primary text-3xl" />
                  </p>
                  <div className="space-y-3">
                    {car?.paymentOption.map((method: TPaymentOption) => (
                      <div
                        key={method?.option}
                        onClick={() => setSelectedPaymentOption(method?.option)}
                        className={`p-6 rounded-lg shadow-md cursor-pointer transition flex items-center gap-3 
            ${
              selectedPaymentOption === method?.option
                ? "border-2 border-blue-500 bg-blue-100 dark:bg-blue-900"
                : "border border-gray-300 bg-white dark:bg-gray-700"
            }
            text-gray-900 dark:text-gray-100`}
                      >
                        {
                          paymentOptionIconMap[
                            method?.option as keyof typeof paymentOptionIconMap
                          ]
                        }
                        {method?.option}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </section>

          {(selectedDeliveryMethod || selectedPaymentMethod) && (
            <OrderSummery
              selectedDeliveryMethod={selectedDeliveryMethod}
              selectedPaymentMethod={selectedPaymentMethod}
              selectedPaymentOption={selectedPaymentOption}
              userPhoneNumber={userPhoneNumber}
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
          )}
        </main>
      </div>
    </div>
  );
};

export default CheckOut;
