import InputSelect from "@/myComponent/formInput/InputSelect";
import { TEngineFormProps } from "./EngineInfoForm";
import {
  airBags,
  features,
  safetyRating,
  warranty,
} from "@/const/safetyFeature.const";
import InputCheckboxArray from "@/myComponent/formInput/InputCheckboxArray";
import AllButtonSet from "./AllButtonSet";

const SafetyFeature = ({
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

  const safetyFeatureFields = [
    "safetyFeature.safetyRating",
    "safetyFeature.airbags",
    "safetyFeature.features",
    "safetyFeature.warranty",
  ] as const;

  const handleNext = async () => {
    const valid = await trigger(safetyFeatureFields);
    if (!valid) return;
    onNext();
  };

  const handleSkip = () => {
    resetField("safetyFeature");
    onNext();
  };

  return (
    <section className=" w-2xl space-y-4">
      <h1 className="text-2xl font-bold flex items-center justify-center  ">
        Safety Feature Data
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-5">
        <InputSelect
          register={register}
          name="safetyFeature.safetyRating"
          label="Safety Rating"
          error={errors.safetyFeature?.safetyRating}
          options={safetyRating}
          required={true}
        />
        <InputSelect
          register={register}
          name="safetyFeature.airbags"
          label="Air Bags"
          error={errors.safetyFeature?.airbags}
          options={airBags}
          required={true}
        />
        <InputSelect
          register={register}
          name="safetyFeature.warranty"
          label="Warranty"
          error={errors.safetyFeature?.warranty}
          options={warranty}
          required={true}
        />
      </div>
      <InputCheckboxArray
        label="Features"
        register={register}
        options={features}
        name="safetyFeature.features"
        error={errors.safetyFeature?.features}
        required={true}
      />
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

export default SafetyFeature;
