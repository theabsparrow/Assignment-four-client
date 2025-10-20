import { driveTrain, fuelType, transmission } from "@/const/carEngine.const";
import { TcarInfoPayload } from "@/interface/carInterface/car.interface";
import InputSelect from "@/myComponent/formInput/InputSelect";
import InputType from "@/myComponent/formInput/InputType";
import { UseFormReturn } from "react-hook-form";

export type TEngineFormProps = {
  methods: UseFormReturn<TcarInfoPayload>;
  onNext: () => void;
  onBack: () => void;
  onRoot: () => void;
};

const EngineInfoForm = ({
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

  const engineFields = [
    "engineInfo.engine",
    "engineInfo.fuelType",
    "engineInfo.mileage",
    "engineInfo.transmission",
    "engineInfo.driveTrain",
    "engineInfo.horsePower",
    "engineInfo.torque",
    "engineInfo.topSpeed",
    "engineInfo.acceleration",
  ] as const;

  const handleNext = async () => {
    const valid = await trigger(engineFields);
    if (valid) {
      onNext();
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
        Engine Information
      </h1>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5 ">
          <InputType
            label="Engine Type"
            name="engineInfo.engine"
            register={register}
            error={errors.engineInfo?.engine}
            type="text"
            required={true}
          />
          <InputSelect
            register={register}
            name="engineInfo.fuelType"
            label="Fuel Type"
            error={errors.engineInfo?.fuelType}
            options={fuelType}
            required={true}
          />
          <InputType
            label="Milage"
            name="engineInfo.mileage"
            register={register}
            error={errors.engineInfo?.mileage}
            type="number"
            required={true}
          />
          <InputSelect
            register={register}
            name="engineInfo.transmission"
            label="Transmission"
            error={errors.engineInfo?.transmission}
            options={transmission}
            required={true}
          />
          <InputSelect
            register={register}
            name="engineInfo.driveTrain"
            label="Drive Train"
            error={errors.engineInfo?.driveTrain}
            options={driveTrain}
            required={true}
          />
          <InputType
            label="Horse Power"
            name="engineInfo.horsePower"
            register={register}
            error={errors.engineInfo?.horsePower}
            type="number"
            required={true}
          />
          <InputType
            label="Torque"
            name="engineInfo.torque"
            register={register}
            error={errors.engineInfo?.torque}
            type="number"
            required={true}
          />
          <InputType
            label="Top Speed"
            name="engineInfo.topSpeed"
            register={register}
            error={errors.engineInfo?.topSpeed}
            type="number"
            required={true}
          />
          <InputType
            label="Accelaration"
            name="engineInfo.acceleration"
            register={register}
            error={errors.engineInfo?.acceleration}
            type="number"
            required={true}
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

export default EngineInfoForm;
