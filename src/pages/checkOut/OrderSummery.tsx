import { TbCurrencyTaka } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentDeliveryAndPayment,
  resetDeliveryAndPayment,
} from "@/redux/features/checkout/checkoutSlice";
import {
  TDeliveryAndPayment,
  TDeliveryMethod,
  TDeliveryOptions,
  TEstimatedTime,
  TPaymentMethod,
  TPaymentOptions,
} from "@/interface/carInterface/carDelivery.interface";
import {
  deliveryIconMap,
  paymentIconMap,
  paymentOptionIconMap,
} from "./CheckOut.const";
import { Controller, useForm } from "react-hook-form";
// import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
// import { useNavigate } from "react-router-dom";
import InputType from "@/myComponent/formInput/InputType";
import FormPhoneInput from "@/myComponent/formInput/FormPhoneInput";
import { toast } from "sonner";

export interface OrderSummaryProps {
  car: {
    price: number;
    inStock: boolean;
    delivery: TDeliveryAndPayment;
  };
  user: {
    phoneNumber: string;
    verifyWithEmail: boolean;
  };
}

export type TOrderInfo = {
  deliveryOption: TDeliveryOptions;
  paymentMethod: TPaymentMethod;
  paymentOption?: TPaymentOptions;
  estimatedDeliveryTime: TEstimatedTime;
  phoneNumber: string;
  deliveryCost: number;
  location: string;
  existingPhone?: boolean;
};

const OrderSummery = ({ car, user }: OrderSummaryProps) => {
  const { phoneNumber: phone, verifyWithEmail } = user || {};
  const { price, inStock, delivery } = car || {};
  const currentState = useAppSelector(currentDeliveryAndPayment);
  const dispatch = useAppDispatch();
  // const [createOrder] = useCreateOrderMutation();
  // const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<TOrderInfo>();
  const existingPhone = watch("existingPhone");

  const onSubmit = async (data: TOrderInfo) => {
    if (!verifyWithEmail) {
      return toast.error("please verify your email at first");
    }
    if (!inStock) {
      return toast.error("this car is not available right now");
    }
    if (
      currentState.paymentMethods === "Online Payment" &&
      !currentState.paymentOptions
    ) {
      return toast.error("please select a payment option");
    }
    data.deliveryOption = currentState.deliveryOptions as TDeliveryOptions;
    data.paymentMethod = currentState.paymentMethods as TPaymentMethod;
    if (currentState.paymentOptions as TPaymentOptions) {
      data.paymentOption = currentState.paymentOptions as TPaymentOptions;
    }
    data.deliveryCost = delivery?.deliveryMethod.find(
      (method) => method.deliveryOption === currentState.deliveryOptions
    )?.deliveryCost as number;
    data.estimatedDeliveryTime = delivery?.deliveryMethod.find(
      (method) => method.deliveryOption === currentState.deliveryOptions
    )?.estimatedTime as TEstimatedTime;
    delete data.existingPhone;
  };

  return (
    <section className="w-full lg:w-[40vw] font-inter space-y-4">
      <h2 className="text-xl font-extrabold  text-gray-800 dark:text-gray-200">
        Order Summery
      </h2>
      {currentState.deliveryOptions && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="orderForm"
          className="space-y-4 bg-gray-500 dark:bg-gray-800 px-6 py-4 rounded-lg"
        >
          <InputType
            label="Your Location"
            name="location"
            register={register}
            error={errors.location}
            required={true}
          />
          <div className="flex items-center gap-4">
            <Controller
              name="existingPhone"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    id="useExistingNumber"
                    checked={field.value}
                    onChange={() => {
                      const newValue = !field.value;
                      field.onChange(newValue);
                      if (newValue) {
                        setValue("phoneNumber", phone);
                      } else {
                        setValue("phoneNumber", "");
                      }
                    }}
                    className="w-5 h-5 text-green-500 cursor-pointer"
                  />
                  <label
                    htmlFor="useExistingNumber"
                    className="text-white/80 dark:text-gray-200 cursor-pointer font-semibold space-x-4"
                  >
                    <span>Use existing number</span>
                    {field.value && (
                      <span className="text-green-500">({phone})</span>
                    )}
                  </label>
                </div>
              )}
            />
          </div>
          <FormPhoneInput
            label="Phone Number"
            name="phoneNumber"
            control={control}
            required={!existingPhone}
            useExistingNumber={existingPhone}
          />
        </form>
      )}

      {/* Display selected options */}
      <div className="bg-blue-50 dark:bg-gray-800 rounded-lg shadow-md px-6 py-4 space-y-2">
        <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-2xl">
          Selected Methods
        </h3>
        <div className="space-y-2 text-sm">
          <p className="text-gray-900 dark:text-gray-100 flex justify-between items-center">
            <span className="font-semibold">Delivery Method :</span>{" "}
            <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
              {
                deliveryIconMap[
                  currentState.deliveryOptions as keyof typeof deliveryIconMap
                ]
              }{" "}
              {currentState.deliveryOptions}{" "}
            </span>
          </p>
          <p className="text-gray-900 dark:text-gray-100 flex justify-between items-center">
            <span className="font-semibold">Payment Method :</span>{" "}
            <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
              {
                paymentIconMap[
                  currentState.paymentMethods as keyof typeof paymentIconMap
                ]
              }{" "}
              {currentState.paymentMethods || "Not Selected"}
            </span>
          </p>
          {currentState.paymentMethods === "Online Payment" && (
            <p className="text-gray-900 dark:text-gray-100 flex justify-between items-center">
              <span className="font-semibold">Online Payment Option :</span>{" "}
              <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                {
                  paymentOptionIconMap[
                    currentState.paymentOptions as keyof typeof paymentOptionIconMap
                  ]
                }{" "}
                {currentState.paymentOptions || "Not Selected"}
              </span>
            </p>
          )}
          <div className="flex justify-between items-center">
            <span className="text-gray-800 dark:text-gray-200 font-semibold">
              Estimated Delivery :
            </span>
            <span className="text-green-600 dark:text-green-400 font-semibold">
              {
                delivery?.deliveryMethod.find(
                  (method: TDeliveryMethod) =>
                    method?.deliveryOption === currentState.deliveryOptions
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
              {delivery?.deliveryMethod
                .find(
                  (method: TDeliveryMethod) =>
                    method?.deliveryOption === currentState.deliveryOptions
                )
                ?.deliveryCost?.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center text-lg font-bold">
          <span className=" text-gray-800 dark:text-gray-200">Total :</span>
          <span className=" text-green-600 dark:text-green-400 flex items-center gap-1">
            <TbCurrencyTaka />
            {price +
              (
                delivery?.deliveryMethod?.find(
                  (method: TDeliveryMethod) =>
                    method?.deliveryOption === currentState.deliveryOptions
                )?.deliveryCost || 0
              ).toFixed(2)}
          </span>
        </div>
      </div>

      {currentState.paymentMethods && (
        <div className="mt-5 flex justify-between">
          <button
            onClick={() => {
              reset();
              dispatch(resetDeliveryAndPayment());
            }}
            className="bg-gray-500 flex justify-center text-white font-bold py-2 px-3 rounded-md duration-500 transition"
            type="button"
          >
            Reset
          </button>
          <button
            className="bg-secondary dark:bg-gray-500 dark:text-gray-200 dark:hover:bg-secondary flex justify-center text-white font-bold py-2 px-3 rounded-md duration-500 transition"
            type="submit"
            form="orderForm"
          >
            Place Order
          </button>
        </div>
      )}
    </section>
  );
};

export default OrderSummery;
