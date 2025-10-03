import InputType from "@/myComponent/formInput/InputType";
import { TEngineFormProps } from "./EngineInfoForm";
import InputTextArea from "@/myComponent/formInput/InputTextArea";
import AllButtonSet from "./AllButtonSet";

const ServiceHistoryForm = ({
  methods,
  onNext,
  onBack,
  onRoot,
}: TEngineFormProps) => {
  const {
    register,
    trigger,
    watch,
    resetField,
    reset,
    formState: { errors },
  } = methods;

  const serviceHistoryFileds = [
    "serviceHistory.serviceDate",
    "serviceHistory.serviceCenter",
    "serviceHistory.cost",
    "serviceHistory.mileageAtService",
    "serviceHistory.serviceDetails",
  ] as const;

  const handleNext = async () => {
    const valid = await trigger(serviceHistoryFileds);
    if (!valid) return;
    onNext();
  };

  const handleSkip = () => {
    resetField("serviceHistory");
    onNext();
  };

  return (
    <section className="w-2xl">
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
        Service History Info
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-5 ">
        <InputType
          label="Service Date"
          name="serviceHistory.serviceDate"
          register={register}
          error={errors.serviceHistory?.serviceDate}
          type="date"
          required={true}
        />
        <InputType
          label="Service Center"
          name="serviceHistory.serviceCenter"
          register={register}
          error={errors.serviceHistory?.serviceCenter}
          required={true}
        />
        <InputType
          label="Service Cost"
          name="serviceHistory.cost"
          register={register}
          error={errors.serviceHistory?.cost}
          type="number"
          required={true}
        />
        <InputType
          label="Milage at Service"
          name="serviceHistory.mileageAtService"
          register={register}
          error={errors.serviceHistory?.mileageAtService}
          type="number"
          required={true}
        />
        <InputTextArea
          label="Service Details"
          name="serviceHistory.serviceDetails"
          placeholder="write about service details"
          register={register}
          error={errors.serviceHistory?.serviceDetails}
          watch={watch}
        />
      </div>

      <AllButtonSet
        onNext={onNext}
        onBack={onBack}
        handleNext={handleNext}
        handleSkip={handleSkip}
        reset={reset}
        onRoot={onRoot}
      />
    </section>
  );
};

export default ServiceHistoryForm;
