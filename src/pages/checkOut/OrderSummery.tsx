import { TbCurrencyTaka } from "react-icons/tb";
import { OrderSummaryProps } from "./checkOutInterface";
import PhoneInput from "react-phone-input-2";
import { FaMapMarkerAlt, FaPhoneAlt, FaStore } from "react-icons/fa";
import { TDeliveryMethod } from "../dashboard/admin/addCar/addcar.interface";

const OrderSummery = ({
  selectedDeliveryMethod,
  selectedPaymentMethod,
  selectedPaymentOption,
  userPhoneNumber,
  phoneNumber,
  useExistingNumber,
  car,
  deliveryIconMap,
  paymentIconMap,
  paymentOptionIconMap,
  location,
  nearestDealer,
  handleSubmit,
  handleChange,
  setPhoneNumber,
  setUseExistingNumber,
}: OrderSummaryProps) => {
  return (
    <section className="md:w-[40vw]">
      {selectedDeliveryMethod && (
        <div className="mb-6 bg-white dark:bg-gray-800 px-6 py-4 rounded-lg border-2 border-green-500">
          <p className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-2xl flex items-center gap-4">
            {selectedDeliveryMethod === "Home Delivery" ||
            selectedDeliveryMethod === "Express Delivery" ? (
              <>
                <FaMapMarkerAlt className="text-primary text-2xl" />
                Enter Your Delivery Address
              </>
            ) : (
              <>
                <FaStore className="text-primary text-2xl" />
                Select Your Nearest Dealer
              </>
            )}
          </p>
          <form onSubmit={handleSubmit} id="myForm">
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
            <div className="mt-6">
              <p className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-2xl flex items-center gap-4">
                <FaPhoneAlt className="text-primary text-2xl" /> Phone Number
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
                  <span className="text-blue-600">({userPhoneNumber})</span>
                </label>
              </div>
              <PhoneInput
                country={"bd"}
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
                disabled={useExistingNumber}
              />
            </div>
          </form>
        </div>
      )}

      {/* Display selected options */}
      <div className="bg-blue-50 dark:bg-gray-800 rounded-lg shadow-md px-6 py-4 border-2 border-green-500 space-y-2">
        <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-2xl">
          Selected Methods
        </h3>
        <div className="space-y-2">
          <p className="text-gray-900 dark:text-gray-100 flex justify-between items-center">
            <span className="font-semibold">Delivery Method :</span>{" "}
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
            <span className="font-semibold">Payment Method :</span>{" "}
            <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
              {
                paymentIconMap[
                  selectedPaymentMethod as keyof typeof paymentIconMap
                ]
              }{" "}
              {selectedPaymentMethod || "Not Selected"}
            </span>
          </p>
          {selectedPaymentMethod === "Online Payment" && (
            <p className="text-gray-900 dark:text-gray-100 flex justify-between items-center">
              <span className="font-semibold">Online Payment Option :</span>{" "}
              <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                {
                  paymentOptionIconMap[
                    selectedPaymentOption as keyof typeof paymentOptionIconMap
                  ]
                }{" "}
                {selectedPaymentOption || "Not Selected"}
              </span>
            </p>
          )}
        </div>
        <div className=" mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-800 dark:text-gray-200 font-semibold">
              Estimated Delivery :
            </span>
            <span className="text-green-600 dark:text-green-400 font-semibold">
              {
                car?.deliveryMethod.find(
                  (method: TDeliveryMethod) =>
                    method?.method === selectedDeliveryMethod
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
              {car?.deliveryMethod
                .find(
                  (method: TDeliveryMethod) =>
                    method?.method === selectedDeliveryMethod
                )
                ?.deliveryCost.toFixed(2)}
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center  ">
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Total :
            </span>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
              <TbCurrencyTaka className="text-3xl  font-bold" />{" "}
              {(
                car?.price +
                car?.deliveryMethod
                  .find(
                    (method: TDeliveryMethod) =>
                      method?.method === selectedDeliveryMethod
                  )
                  ?.deliveryCost.toFixed(2)
              ).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {selectedPaymentOption && (
        <div className="mt-5 flex justify-end">
          <button
            className="bg-secondary dark:bg-gray-500 dark:text-gray-200 dark:hover:bg-secondary flex justify-center md:w-36 text-white font-bold py-2 px-1 rounded-md duration-500 transition"
            type="submit"
            form="myForm"
          >
            Place Order
          </button>
        </div>
      )}
    </section>
  );
};

export default OrderSummery;
