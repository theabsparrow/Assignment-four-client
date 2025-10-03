import { years } from "@/const/carInfo.const";
import InputSelect from "@/myComponent/formInput/InputSelect";
import InputType from "@/myComponent/formInput/InputType";
import { TEngineFormProps } from "./EngineInfoForm";
import { countries } from "@/const/country.const";
import AllButtonSet from "./AllButtonSet";

const RegistrationDataForm = ({
  methods,
  onNext,
  onBack,
  onRoot,
}: TEngineFormProps) => {
  const {
    register,
    trigger,
    resetField,
    reset,
    formState: { errors },
  } = methods;

  const registrationFields = [
    "registrationData.licensePlate",
    "registrationData.vin",
    "registrationData.registrationYear",
    "registrationData.registrationAuthority",
    "registrationData.previousOwner",
    "registrationData.previousOwnerAddress",
    "registrationData.registrationCountry",
    "registrationData.roadTaxPaid",
  ] as const;

  const handleNext = async () => {
    const valid = await trigger(registrationFields);
    if (!valid) return;
    onNext();
  };

  const handleSkip = () => {
    resetField("registrationData");
    onNext();
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
        Registration Data
      </h1>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5 ">
          <InputType
            label="Lisence Plate"
            name="registrationData.licensePlate"
            register={register}
            error={errors.registrationData?.licensePlate}
            required={true}
          />
          <InputType
            label="Vin No."
            name="registrationData.vin"
            register={register}
            error={errors.registrationData?.vin}
            required={true}
          />
          <InputSelect
            register={register}
            name="registrationData.registrationYear"
            label="Registration Year"
            error={errors.registrationData?.registrationYear}
            options={years}
            required={true}
          />
          <InputType
            label="Registration Authority"
            name="registrationData.registrationAuthority"
            register={register}
            error={errors.registrationData?.registrationAuthority}
            required={true}
          />
          <InputType
            label="Previous Owner"
            name="registrationData.previousOwner"
            register={register}
            error={errors.registrationData?.previousOwner}
          />
          <InputType
            label="Previous Owner Address"
            name="registrationData.previousOwnerAddress"
            register={register}
            error={errors.registrationData?.previousOwnerAddress}
          />
          <InputSelect
            register={register}
            name="registrationData.registrationCountry"
            label="Registration Country"
            error={errors.registrationData?.registrationCountry}
            options={countries}
            required={true}
          />
          <InputSelect
            register={register}
            name="registrationData.roadTaxPaid"
            label="Road Tax Paid"
            error={errors.registrationData?.roadTaxPaid}
            options={["Yes", "No"]}
            required={true}
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
      </div>
    </section>
  );
};

export default RegistrationDataForm;
