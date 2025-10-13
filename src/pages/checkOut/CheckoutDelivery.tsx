import {
  TDeliveryAndPayment,
  TDeliveryMethod,
  TDeliveryOptions,
  TPaymentMethod,
  TPaymentOptions,
} from "@/interface/carInterface/carDelivery.interface";
import { FaTruckFront } from "react-icons/fa6";
import { SiCashapp } from "react-icons/si";
import {
  deliveryIconMap,
  paymentIconMap,
  paymentOptionIconMap,
} from "./CheckOut.const";
import { FaCcAmazonPay } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentDeliveryAndPayment,
  setDeliveryOption,
  setPaymentMethod,
  setPaymentOption,
} from "@/redux/features/checkout/checkoutSlice";

const CheckoutDelivery = ({
  deliveryAndPayment,
}: {
  deliveryAndPayment: TDeliveryAndPayment;
}) => {
  const dispatch = useAppDispatch();
  const currentState = useAppSelector(currentDeliveryAndPayment);
  return (
    <section className="w-full lg:w-[40vw] space-y-4">
      <h2 className="text-xl font-extrabold  text-gray-800 dark:text-gray-200">
        Order Methods
      </h2>
      {/* Delivery Method Selection */}
      <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg  space-y-2">
        <p className="font-bold text-gray-800 dark:text-gray-200 text-xl flex items-center gap-2">
          Delivery Method <FaTruckFront className="text-primary text-xl" />
        </p>
        <div className=" space-y-2">
          {deliveryAndPayment?.deliveryMethod.map((method: TDeliveryMethod) => (
            <div
              key={method?.deliveryOption}
              onClick={() =>
                dispatch(
                  setDeliveryOption(method?.deliveryOption as TDeliveryOptions)
                )
              }
              className={`p-3 rounded-lg shadow-md cursor-pointer transition flex items-center gap-3
                      ${
                        currentState.deliveryOptions === method?.deliveryOption
                          ? "border-2 border-green-500 bg-green-100 dark:bg-green-900"
                          : "border border-gray-300 bg-white dark:bg-gray-700 hover:scale-x-105 duration-500"
                      }
                      text-gray-900 dark:text-gray-100 hover:border-2 hover:border-green-500 hover:bg-green-100 dark:hover:bg-green-900  duration-500`}
            >
              {
                deliveryIconMap[
                  method?.deliveryOption as keyof typeof deliveryIconMap
                ]
              }
              {method?.deliveryOption}
            </div>
          ))}
        </div>
      </div>

      {/* payment method section */}
      {currentState?.deliveryOptions && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-2">
          <p className="font-bold text-gray-800 dark:text-gray-200 text-xl flex items-center gap-2">
            Payment Method <SiCashapp className="text-primary text-xl" />
          </p>
          <div className="space-y-2">
            {deliveryAndPayment?.paymentMethod.map(
              (method: TPaymentMethod, i: number) => (
                <div
                  key={i}
                  onClick={() =>
                    dispatch(setPaymentMethod(method as TPaymentMethod))
                  }
                  className={`p-3 rounded-lg shadow-md cursor-pointer transition flex items-center gap-3 
                ${
                  currentState.paymentMethods === method
                    ? "border-2 border-blue-500 bg-blue-100 dark:bg-blue-900"
                    : "border border-gray-300 bg-white dark:bg-gray-700"
                }
                text-gray-900 dark:text-gray-100`}
                >
                  {paymentIconMap[method as keyof typeof paymentIconMap]}
                  {method}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* payment options section */}
      {currentState.paymentMethods &&
        currentState.paymentMethods === "Online Payment" && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg  space-y-2">
            <p className="font-bold text-gray-800 dark:text-gray-200 text-xl flex items-center gap-2">
              Payment Options <FaCcAmazonPay className="text-primary text-xl" />
            </p>
            <div className="space-y-2">
              {(deliveryAndPayment?.paymentOption as TPaymentOptions[])
                .length &&
                (deliveryAndPayment?.paymentOption as TPaymentOptions[]).map(
                  (method: TPaymentOptions) => (
                    <div
                      key={method}
                      onClick={() =>
                        dispatch(setPaymentOption(method as TPaymentOptions))
                      }
                      className={`p-3 rounded-lg shadow-md cursor-pointer transition flex items-center gap-3 
                    ${
                      currentState.paymentOptions === method
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
                  )
                )}
            </div>
          </div>
        )}
    </section>
  );
};

export default CheckoutDelivery;
