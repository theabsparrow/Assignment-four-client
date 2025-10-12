import { years } from "@/const/carInfo.const";
import InputSelect from "@/myComponent/formInput/InputSelect";
import InputType from "@/myComponent/formInput/InputType";
import { TEngineFormProps } from "./EngineInfoForm";
import { countries } from "@/const/country.const";

const RegistrationDataForm = ({
  methods,
  onNext,
  onBack,
  onRoot,
}: TEngineFormProps) => {
  const {
    register,
    trigger,
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
          />
          <InputType
            label="Registration Authority"
            name="registrationData.registrationAuthority"
            register={register}
            error={errors.registrationData?.registrationAuthority}
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
          />
          <InputSelect
            register={register}
            name="registrationData.roadTaxPaid"
            label="Road Tax Paid"
            error={errors.registrationData?.roadTaxPaid}
            options={["Yes", "No"]}
          />
        </div>

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
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationDataForm;
