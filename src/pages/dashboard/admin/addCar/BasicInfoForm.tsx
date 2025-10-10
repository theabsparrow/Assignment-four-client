import {
  carBrands,
  carCategories,
  conditions,
  seatingCapacies,
  years,
} from "@/const/carInfo.const";
import { countries } from "@/const/country.const";
import {
  carColors,
  TcarInfoPayload,
} from "@/interface/carInterface/car.interface";
import InputImage from "@/myComponent/formInput/InputImage";
import InputSelect from "@/myComponent/formInput/InputSelect";
import InputTextArea from "@/myComponent/formInput/InputTextArea";
import InputType from "@/myComponent/formInput/InputType";
import MultipleImageUpload from "@/myComponent/formInput/MultipleImageUpload";
import { UseFormReturn } from "react-hook-form";

const BasicInfoForm = ({
  methods,
  onNext,
}: {
  methods: UseFormReturn<TcarInfoPayload>;
  onNext: () => void;
}) => {
  const {
    register,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = methods;
  const basicFields = [
    "basicInfo.brand",
    "basicInfo.model",
    "basicInfo.category",
    "basicInfo.madeIn",
    "basicInfo.condition",
    "basicInfo.color",
    "basicInfo.price",
    "basicInfo.year",
    "basicInfo.seatingCapacity",
    "basicInfo.description",
    "basicInfo.image",
    "basicInfo.galleryImage",
  ] as const;

  const handleNext = async () => {
    const valid = await trigger(basicFields);
    if (valid) {
      onNext();
    }
  };
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold flex items-center justify-center">
        Basic Information
      </h1>
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 ">
          <InputSelect
            register={register}
            name="basicInfo.brand"
            label="Brand"
            error={errors.basicInfo?.brand}
            options={carBrands}
            required={true}
          />
          <InputType
            label="Model"
            name="basicInfo.model"
            register={register}
            error={errors.basicInfo?.model}
            required={true}
          />
          <InputSelect
            register={register}
            name="basicInfo.category"
            label="Category"
            error={errors.basicInfo?.category}
            options={carCategories}
            required={true}
          />
          <InputSelect
            register={register}
            name="basicInfo.madeIn"
            label="Made In"
            error={errors.basicInfo?.madeIn}
            options={countries}
            required={true}
          />
          <InputSelect
            register={register}
            name="basicInfo.condition"
            label="Condition"
            error={errors.basicInfo?.condition}
            options={conditions}
            required={true}
          />
          <InputSelect
            register={register}
            name="basicInfo.color"
            label="Color"
            error={errors.basicInfo?.color}
            options={carColors}
            required={true}
          />
          <InputType
            label="Price"
            name="basicInfo.price"
            register={register}
            error={errors.basicInfo?.price}
            type="number"
            required={true}
          />
          <InputSelect
            register={register}
            name="basicInfo.year"
            label="Made In Year"
            error={errors.basicInfo?.year}
            options={years}
            required={true}
          />
          <InputSelect
            register={register}
            name="basicInfo.seatingCapacity"
            label="Seating Capacity"
            error={errors.basicInfo?.seatingCapacity}
            options={seatingCapacies}
            required={true}
          />
          <InputTextArea
            label="Description"
            name="basicInfo.description"
            placeholder="write about this car"
            register={register}
            error={errors.basicInfo?.description}
            watch={watch}
          />
          <InputImage
            name={"basicInfo.image"}
            label={"Car Image"}
            register={register}
            error={errors.basicInfo?.image}
            required={true}
            setValue={setValue}
          />
        </div>
        <div>
          <MultipleImageUpload
            name={"basicInfo.galleryImage"}
            label={"Gallery Image (Maximum 5 photo)"}
            register={register}
            error={errors.basicInfo?.galleryImage}
            setValue={setValue}
          />
        </div>
        <div className="flex justify-between ">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Reset
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
    </section>
  );
};

export default BasicInfoForm;
