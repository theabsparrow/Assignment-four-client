import {
  deliveryMethods,
  estimatedTimes,
  paymentMethod,
  paymentOptions,
} from "@/const/carDelivery.const";
import { TcarInfoPayload } from "@/interface/carInterface/car.interface";
import InputCheckboxArray from "@/myComponent/formInput/InputCheckboxArray";
import InputType from "@/myComponent/formInput/InputType";
import { UseFormReturn } from "react-hook-form";

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
  const {
    register,
    reset,
    formState: { errors },
  } = methods;

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
        <InputCheckboxArray
          label="Payment Options"
          register={register}
          options={paymentOptions}
          name="deliveryAndPayment.paymentOption"
          error={errors.deliveryAndPayment?.paymentOption}
          required={true}
        />
        <InputCheckboxArray
          label="Delivery Method"
          register={register}
          options={deliveryMethods}
          name="deliveryAndPayment.deliveryMethod"
          error={errors.deliveryAndPayment?.deliveryMethod}
          required={true}
        />
        <InputCheckboxArray
          label="Estimated Time"
          register={register}
          options={estimatedTimes}
          name="deliveryAndPayment.estimatedTime"
          error={errors.deliveryAndPayment?.estimatedTime}
          required={true}
        />
        <InputType
          label="Delivery Cost"
          name="deliveryAndPayment.deliveryCost"
          register={register}
          error={errors.deliveryAndPayment?.deliveryCost}
          type="number"
          required={true}
        />
      </div>
      <div>
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={() => {
              reset();
              onRoot();
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
