import useMyProfile from "@/hook/useMyProfile";
import { useGetSingleCarQuery } from "@/redux/features/car/carApi";
import { useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { FaTruckFront } from "react-icons/fa6";
import { SiCashapp } from "react-icons/si";
import {
  FaCcAmazonPay,
  FaCreditCard,
  FaHome,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaShippingFast,
  FaStore,
  FaStripe,
} from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import { RiBankCardFill } from "react-icons/ri";

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

  useEffect(() => {
    if (!isLoading && car && !car.inStock) {
      navigate("/");
    }
  }, [car, isLoading, navigate]);

  const handleChange = (label: string, value: string) => {
    if (label === "user") setLocation(value);
    if (label === "dealer") setNearestDealer(value);
  };
  const orderInfo = {
    paymentMethods: ["Cash on Delivery", "Online Payment"],
    deliveryMethods: [
      {
        method: "Home Delivery",
        cost: 200,
        estimatedTime: "3-5 Business Days",
      },
      {
        method: "Pickup",
        cost: 0,
        estimatedTime: "Available Immediately",
      },
      {
        method: "Express Delivery",
        cost: 500,
        estimatedTime: "1-2 Business Days",
      },
    ],
    onlinePaymentOptions: ["SSLCommerz", "Stripe", "SurjoPay"],
  };

  const deliveryIconMap = {
    "Home Delivery": <FaHome className="text-2xl text-green-500" />,
    Pickup: <FaStore className="text-2xl text-blue-500" />,
    "Express Delivery": <FaShippingFast className="text-2xl text-red-500" />,
  };

  const paymentIconMap = {
    "Cash on Delivery": <FaMoneyBillWave className="text-3xl text-green-500" />,
    "Online Payment": <FaCreditCard className="text-3xl text-blue-500" />,
  };

  const paymentOptionIconMap = {
    SSLCommerz: <FaCreditCard className="text-blue-500 text-2xl" />,
    Stripe: <FaStripe className="text-purple-500 text-2xl" />,
    SurjoPay: <RiBankCardFill className="text-green-500 text-2xl" />,
  };

  return (
    <div className=" mx-auto px-4 md:px-32 bg-gray-50 dark:bg-gray-900 shadow-lg rounded-lg min-h-[calc(100vh-80px)] font-inter">
      <section className="flex md:flex-row items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-md py-8 px-4">
        {/* Car Information */}
        <section>
          <h2 className="text-3xl font-extrabold mb-8 text-gray-800 dark:text-gray-200">
            Car Information
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img
              src={car?.image}
              alt={car?.brand}
              className="w-72 h-52 object-cover rounded-lg border-4 border-gray-300 dark:border-gray-700 shadow-lg"
            />
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {car?.brand} - {car?.model}
              </h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <p className="text-gray-600 dark:text-gray-400 items-center flex gap-1">
                  Price:
                  <span className="font-semibold text-green-600 dark:text-gray-200 flex items-center gap-1">
                    <TbCurrencyTaka className="text-xl  font-bold" />{" "}
                    {car?.price.toLocaleString()}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 flex gap-1">
                  Category:
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {car?.category}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 flex gap-1">
                  Year:
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {car?.year}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 flex gap-1">
                  Made In:
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {car?.madeIn}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 flex gap-1">
                  Condition:
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {car?.condition}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* User Information */}
        <section>
          <h2 className="text-3xl font-extrabold mb-8 text-gray-800 dark:text-gray-200">
            User Information
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0">
              <img
                src={myprofile?.myProfile?.profileImage}
                alt="User"
                className="w-72 h-52 object-cover rounded-lg border-4 border-gray-300 dark:border-gray-700 shadow-lg"
              />
            </div>
            <div className="flex-1 space-y-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {myprofile?.myProfile?.name.firstName}{" "}
                {myprofile?.myProfile?.name.lastName}
              </h1>

              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <p className="text-gray-600 dark:text-gray-400">
                  Gender:{" "}
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {myprofile?.myProfile?.gender}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Email:{" "}
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {myprofile?.myProfile?.email}
                  </span>
                </p>

                <p className="text-gray-600 dark:text-gray-400">
                  Phone:{" "}
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {myprofile?.myProfile?.phoneNumber}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Hometown:{" "}
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {myprofile?.myProfile?.homeTown}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Current Address:{" "}
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {myprofile?.myProfile?.currentAddress}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
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
                {orderInfo.deliveryMethods.map((method) => (
                  <div
                    key={method.method}
                    onClick={() => setSelectedDeliveryMethod(method.method)}
                    className={`p-6 rounded-lg shadow-md cursor-pointer transition flex items-center gap-3
              ${
                selectedDeliveryMethod === method.method
                  ? "border-2 border-green-500 bg-green-100 dark:bg-green-900"
                  : "border border-gray-300 bg-white dark:bg-gray-700 hover:scale-x-105 duration-500"
              }
              text-gray-900 dark:text-gray-100 hover:border-2 hover:border-green-500 hover:bg-green-100 dark:hover:bg-green-900  duration-500`}
                  >
                    {
                      deliveryIconMap[
                        method.method as keyof typeof deliveryIconMap
                      ]
                    }
                    {method.method}
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
                  {orderInfo.paymentMethods.map((method) => (
                    <div
                      key={method}
                      onClick={() => setSelectedPaymentMethod(method)}
                      className={`p-6 rounded-lg shadow-md cursor-pointer transition flex items-center gap-3 
        ${
          selectedPaymentMethod === method
            ? "border-2 border-blue-500 bg-blue-100 dark:bg-blue-900"
            : "border border-gray-300 bg-white dark:bg-gray-700"
        }
        text-gray-900 dark:text-gray-100`}
                    >
                      {paymentIconMap[method as keyof typeof paymentIconMap]}
                      {method}
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
                    {orderInfo.onlinePaymentOptions.map((method) => (
                      <div
                        key={method}
                        onClick={() => setSelectedPaymentOption(method)}
                        className={`p-6 rounded-lg shadow-md cursor-pointer transition flex items-center gap-3 
            ${
              selectedPaymentOption === method
                ? "border-2 border-blue-500 bg-blue-100 dark:bg-blue-900"
                : "border border-gray-300 bg-white dark:bg-gray-700"
            }
            text-gray-900 dark:text-gray-100`}
                      >
                        {
                          paymentOptionIconMap[
                            method as keyof typeof paymentOptionIconMap
                          ]
                        }
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </section>

          {/* selected options section */}
          {(selectedDeliveryMethod || selectedPaymentMethod) && (
            <section className="md:w-[40vw]">
              <>
                {selectedDeliveryMethod && (
                  <div className="mb-6 bg-white dark:bg-gray-800 px-6 py-4 rounded-lg border-2 border-green-500">
                    <p className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-2xl flex items-center gap-4">
                      {selectedDeliveryMethod === "Home Delivery" ||
                      selectedDeliveryMethod === "Express Delivery" ? (
                        <>
                          <FaMapMarkerAlt className="text-primary text-2xl" />{" "}
                          Enter Your Delivery Address
                        </>
                      ) : (
                        <>
                          {" "}
                          <FaStore className="text-primary text-2xl" /> Select
                          Your Nearest Dealer
                        </>
                      )}
                    </p>
                    <input
                      type="text"
                      value={
                        selectedDeliveryMethod === "Home Delivery" ||
                        selectedDeliveryMethod === "Express Delivery"
                          ? location
                          : nearestDealer
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          selectedDeliveryMethod === "Home Delivery" ||
                          selectedDeliveryMethod === "Express Delivery"
                        ) {
                          handleChange("user", value);
                        } else {
                          handleChange("dealer", value);
                        }
                      }}
                      placeholder={
                        selectedDeliveryMethod === "Home Delivery" ||
                        selectedDeliveryMethod === "Express Delivery"
                          ? "Enter your address"
                          : "Enter dealer location"
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 outline-green-300"
                    />
                    <div className="mt-6 bg-white dark:bg-gray-800  ">
                      <p className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-2xl flex items-center gap-4">
                        <FaPhoneAlt className="text-primary text-2xl" /> Phone
                        Number
                      </p>
                      <div className="flex items-center gap-4 mb-4">
                        <input
                          type="checkbox"
                          id="useExistingNumber"
                          checked={useExistingNumber}
                          onChange={() => {
                            setUseExistingNumber(!useExistingNumber);
                            if (!useExistingNumber) {
                              setPhoneNumber(userPhoneNumber);
                            } else {
                              setPhoneNumber("");
                            }
                          }}
                          className="w-5 h-5 text-green-500 cursor-pointer"
                        />
                        <label
                          htmlFor="useExistingNumber"
                          className="text-gray-800 dark:text-gray-200 cursor-pointer font-semibold"
                        >
                          Use existing number{" "}
                          <span className="text-blue-600">
                            ({userPhoneNumber})
                          </span>
                        </label>
                      </div>
                      <PhoneInput
                        country={"bd"}
                        value={phoneNumber}
                        onChange={(value) => setPhoneNumber(value)}
                        disabled={useExistingNumber}
                      />
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 dark:bg-gray-800 rounded-lg shadow-md px-6 py-4  border-2 border-green-500 space-y-2">
                  {selectedDeliveryMethod && (
                    <div className="  py-4">
                      <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-2xl">
                        Selected Methods
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-900 dark:text-gray-100 flex justify-between items-center">
                          <span className="font-semibold">
                            Delivery Method :
                          </span>{" "}
                          <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                            {
                              deliveryIconMap[
                                selectedDeliveryMethod as keyof typeof deliveryIconMap
                              ]
                            }{" "}
                            {selectedDeliveryMethod}{" "}
                          </span>
                        </p>
                        <p className="text-gray-900 dark:text-gray-100 flex justify-between items-center">
                          <span className="font-semibold">
                            Payment Method :
                          </span>{" "}
                          <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                            {
                              paymentIconMap[
                                selectedPaymentMethod as keyof typeof paymentIconMap
                              ]
                            }{" "}
                            {selectedPaymentMethod || "Not Selected"}
                          </span>
                        </p>
                        <p className="text-gray-900 dark:text-gray-100 flex justify-between items-center">
                          <span className="font-semibold">
                            Online Payment Option :
                          </span>{" "}
                          <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                            {
                              paymentOptionIconMap[
                                selectedPaymentOption as keyof typeof paymentOptionIconMap
                              ]
                            }{" "}
                            {selectedPaymentOption || "Not Selected"}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedPaymentMethod && (
                    <div className=" mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 dark:text-gray-200 font-semibold">
                          Estimated Delivery :
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                          {
                            orderInfo.deliveryMethods.find(
                              (method) =>
                                method.method === selectedDeliveryMethod
                            )?.estimatedTime
                          }
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 dark:text-gray-200 font-semibold">
                          Delivery Cost :
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                          <TbCurrencyTaka className="text-xl  font-bold" />{" "}
                          {orderInfo.deliveryMethods
                            .find(
                              (method) =>
                                method.method === selectedDeliveryMethod
                            )
                            ?.cost.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedDeliveryMethod && selectedPaymentMethod && (
                    <div className="flex justify-between items-center  ">
                      <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Total :
                      </span>
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                        <TbCurrencyTaka className="text-3xl  font-bold" />{" "}
                        {(
                          car?.price +
                          orderInfo.deliveryMethods
                            .find(
                              (method) =>
                                method.method === selectedDeliveryMethod
                            )
                            ?.cost.toFixed(2)
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default CheckOut;
