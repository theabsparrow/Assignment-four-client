import {
  deliveryMethods,
  estimatedTimes,
  paymentMethod,
  paymentOptions,
} from "@/const/carDelivery.const";
import { TcarInfoPayload } from "@/interface/carInterface/car.interface";
import {
  TDeliveryOptions,
  TEstimatedTime,
} from "@/interface/carInterface/carDelivery.interface";
import InputCheckboxArray from "@/myComponent/formInput/InputCheckboxArray";
import { useState } from "react";
import { useFieldArray, UseFormReturn, useWatch } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";

export type TDeliveryAndPaymentProps = {
  methods: UseFormReturn<TcarInfoPayload>;
  onBack?: () => void;
  onRoot: () => void;
};

const DeliverAndPaymentForm = ({
  methods,
  onBack,
  onRoot,
}: TDeliveryAndPaymentProps) => {
  const [newDelivery, setNewDelivery] = useState({
    deliveryOption: "" as TDeliveryOptions,
    estimatedTime: "" as TEstimatedTime,
    deliveryCost: 0,
  });

  const [inputError, setInputError] = useState({
    deliveryOption: false,
    estimatedTime: false,
  });

  const {
    register,
    control,
    reset,
    watch,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "deliveryAndPayment.deliveryMethod",
  });
  const selectedDeliveryOptions: TDeliveryOptions[] =
    useWatch({
      control,
      name: "deliveryAndPayment.deliveryMethod",
    })?.map((d) => d.deliveryOption) || [];

  const selectedPaymentMethods =
    watch("deliveryAndPayment.paymentMethod") || [];

  const availableDeliveryOptions = deliveryMethods.filter(
    (option) => !selectedDeliveryOptions.includes(option)
  );

  const handleAddDelivery = () => {
    const newError = {
      deliveryOption: !newDelivery.deliveryOption,
      estimatedTime: !newDelivery.estimatedTime,
    };
    setInputError(newError);
    const hasError = Object.values(newError).some((v) => v);
    if (hasError) return;
    append(newDelivery);
    setNewDelivery({
      deliveryOption: "" as TDeliveryOptions,
      estimatedTime: "" as TEstimatedTime,
      deliveryCost: 0,
    });
    setInputError({
      deliveryOption: false,
      estimatedTime: false,
    });
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
        Delivery and Payment
      </h1>
      <div className="space-y-6">
        <InputCheckboxArray
          label="Payment Method"
          register={register}
          options={paymentMethod}
          name="deliveryAndPayment.paymentMethod"
          error={errors.deliveryAndPayment?.paymentMethod}
          required={true}
        />
        {selectedPaymentMethods?.includes("Online Payment") && (
          <InputCheckboxArray
            label="Payment Options"
            register={register}
            options={paymentOptions}
            name="deliveryAndPayment.paymentOption"
            error={errors.deliveryAndPayment?.paymentOption}
            required={true}
          />
        )}

        <div
          className={`space-y-2  ${
            errors.deliveryAndPayment?.deliveryMethod && "border border-red-500"
          }`}
        >
          {fields.length > 0 && (
            <div className="flex items-center gap-10 ">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative bg-gray-400 p-4 rounded-lg border border-red-600"
                >
                  <ul className="text-sm">
                    <li>
                      Delivery option:{" "}
                      <span className="font-medium">
                        {field.deliveryOption}
                      </span>{" "}
                    </li>
                    <li>
                      Estimated time:{" "}
                      <span className="font-medium">{field.estimatedTime}</span>{" "}
                    </li>
                    <li>
                      Delivery cost:{" "}
                      <span className="font-medium">{field.deliveryCost}</span>{" "}
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 absolute top-1 right-1"
                  >
                    <RxCross2 />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            <input
              type="hidden"
              {...register("deliveryAndPayment.deliveryMethod", {
                validate: (value) =>
                  (value && value.length > 0) ||
                  "At least one delivery method is required.",
              })}
            />
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Delivery Option <span className="text-red-500">*</span>
              </label>

              <select
                value={newDelivery.deliveryOption}
                onChange={(e) => {
                  setNewDelivery((prev) => ({
                    ...prev,
                    deliveryOption: e.target.value as TDeliveryOptions,
                  }));
                  setInputError((prev) => ({ ...prev, deliveryOption: false }));
                }}
                className={`block w-full appearance-none px-4 py-2 rounded-xl outline-none 
            bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
            transition-all duration-500 pr-10 border-2 ${
              inputError.deliveryOption ? "border-red-500" : "border-gray-300"
            }`}
              >
                <option value="">Select Option</option>
                {availableDeliveryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Estimated Time <span className="text-red-500">*</span>
              </label>
              <select
                value={newDelivery.estimatedTime}
                onChange={(e) => {
                  setNewDelivery((prev) => ({
                    ...prev,
                    estimatedTime: e.target.value as TEstimatedTime,
                  }));
                  setInputError((prev) => ({ ...prev, estimatedTime: false }));
                }}
                className={`block w-full appearance-none px-4 py-2 rounded-xl outline-none 
            bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
            transition-all duration-500 pr-10 border-2 ${
              inputError.estimatedTime ? "border-red-500" : "border-gray-300"
            }`}
              >
                <option value="">Select Time</option>
                {estimatedTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Delivery Cost <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                value={newDelivery.deliveryCost}
                onChange={(e) => {
                  setNewDelivery((prev) => ({
                    ...prev,
                    deliveryCost: Number(e.target.value),
                  }));
                  setInputError((prev) => ({ ...prev, deliveryCost: false }));
                }}
                className="block w-full appearance-none px-4 py-2 rounded-xl outline-none 
            bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
            transition-all duration-500 pr-10 border-2"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddDelivery}
            disabled={availableDeliveryOptions.length === 0}
            className="bg-green-700 text-white px-4 py-2 rounded mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Delivery Option
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={() => {
              reset();
              onRoot();
              setNewDelivery({
                deliveryOption: "" as TDeliveryOptions,
                estimatedTime: "" as TEstimatedTime,
                deliveryCost: 0,
              });
              setInputError({
                deliveryOption: false,
                estimatedTime: false,
              });
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Reset
          </button>
          <div className="flex items-center gap-10">
            <button
              type="button"
              onClick={onBack}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverAndPaymentForm;
