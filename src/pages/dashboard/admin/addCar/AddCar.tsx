import { Controller, FormProvider, useForm } from "react-hook-form";
import AddCarSelectInput from "./AddCarSelectInput";
import FormInput from "@/myComponent/formInput/FormInput";
import TextArea from "./addCarTextArea";
import FormSelect from "@/myComponent/formInput/FormSelect";
import { countries } from "@/const/country.const";
import MultipleImageUpload from "../../../../myComponent/formInput/MultipleImageUpload";
import { imageUpload } from "@/utills/uploadImage";
import { toast } from "sonner";
import { useAddCarMutation } from "@/redux/features/car/carApi";
import MultiSelector from "@/myComponent/formInput/MultiSelector";
import { useState } from "react";
import GroupMultiSelector, {
  DeliveryMethod,
} from "@/myComponent/formInput/GroupMultiSelector";
import InputSelect from "@/myComponent/formInput/InputSelect";
import {
  carColors,
  TcarInfoPayload,
} from "@/interface/carInterface/car.interface";
import {
  carBrands,
  carCategories,
  conditions,
  seatingCapacies,
  years,
} from "@/const/carInfo.const";
import InputType from "@/myComponent/formInput/InputType";
import InputTextArea from "@/myComponent/formInput/InputTextArea";
import ImagePreviewer from "@/myComponent/formInput/ImagePreviewer";
import ImageUploader from "@/myComponent/formInput/ImageUploader";
import InputImage from "@/myComponent/formInput/InputImage";

const AddCar = () => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TcarInfoPayload>({ mode: "all" });

  const [currentStep, setCurrentStep] = useState(1);
  const [addCar] = useAddCarMutation();

  const onSubmit = async (data: TcarInfoPayload) => {
    console.log(data);
    // if (currentStep === 2) {
    //   const fields = {
    //     paymentOption: "Select at least one payment option",
    //     paymentMethod: "Select at least one payment method",
    //     deliveryMethod: "Add at least one delivery method",
    //   };

    //   Object.entries(fields).forEach(([key, message]) => {
    //     if (!data[key] || data[key].length === 0) {
    //       setError(key, { type: "manual", message });
    //     }
    //   });
    // }
    // const {
    //   seatingCapacity,
    //   brand,
    //   category,
    //   color,
    //   condition,
    //   country,
    //   description,
    //   carImage,
    //   madeIn,
    //   model: carModel,
    //   photo,
    //   price: car,
    //   year,
    //   paymentMethod,
    //   paymentOption,
    //   deliveryMethod,
    // } = data;
    // const carPrice = Number(car);
    // const model = carModel.charAt(0).toUpperCase() + carModel.slice(1);
    // const toastId = toast.loading("car data uploading.....");
    // try {
    //   const basicInfo: TCarInfo = {
    //     seatingCapacity,
    //     brand,
    //     category,
    //     color,
    //     condition,
    //     country,
    //     description,
    //     madeIn,
    //     model,
    //     price: carPrice,
    //     year,
    //     paymentMethod: paymentMethod.map((method: string) => ({ method })),
    //     deliveryMethod,
    //   };
    //   if (paymentOption.length > 0) {
    //     basicInfo.paymentOption = paymentOption.map((option: string) => ({
    //       option,
    //     }));
    //   }
    //   const galleryImage = [];
    //   if (photo && photo.length > 1) {
    //     for (const image of photo) {
    //       const result = { url: await imageUpload(image) };
    //       galleryImage.push(result);
    //     }
    //   }
    //   const image = await imageUpload(carImage);
    //   if (image) {
    //     basicInfo.image = image;
    //   }
    //   if (galleryImage.length > 1) {
    //     basicInfo.galleryImage = galleryImage;
    //   }
    //   const res = await addCar({ basicInfo }).unwrap();
    //   if (res.data) {
    //     toast.success("car info uploaded successfully ", {
    //       id: toastId,
    //       duration: 3000,
    //     });
    //     reset();
    //     setCurrentStep(1);
    //     setSelectedGroup([]);
    //     setPaymentMethod([]);
    //     setPaymentOption([]);
    //   }
    // } catch (error: any) {
    //   const errorInfo =
    //     error?.data?.errorSource[0].message ||
    //     error?.data?.message ||
    //     error?.error ||
    //     "Something went wrong!";
    //   toast.error(errorInfo, { id: toastId, duration: 3000 });
    // }
  };

  // const handleNext = async () => {
  //   if (isValid) {
  //     setCurrentStep(2);
  //   }
  // };

  // const handleBack = () => {
  //   setCurrentStep(1);
  // };

  return (
    <div className="px-5 md:px-20 py-10 -600 font-inter md:w-[70vw]">
      <h1 className="text-2xl font-bold mb-4">Add a New Car</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5 ">
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
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              // disabled={!isValid}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </section>

        {/* payment and delivery section */}
        {/* {currentStep === 2 && (
          <section>
            <h1 className="text-center text-2xl font-semibold">
              Delivery and Payment
            </h1>
            <div className="space-y-2 md:space-y-5 ">
              <Controller
                name="deliveryMethod"
                control={methods.control}
                defaultValue={[]}
                rules={{ required: "select at least one delivery method" }}
                render={({ field }) => (
                  <div>
                    <GroupMultiSelector
                      methods={deliveryMethod}
                      estimatedTimes={estimatedTime}
                      selectedGroup={selectedGroup}
                      setSelectedGroup={(value: DeliveryMethod[]) => {
                        field.onChange(value);
                        setSelectedGroup(value);
                        if (value.length > 0) {
                          clearErrors("deliveryMethod");
                        }
                      }}
                    ></GroupMultiSelector>
                    {methods.formState.errors.deliveryMethod && (
                      <p className="text-sm font-medium text-red-700">
                        {
                          methods.formState.errors.deliveryMethod
                            ?.message as string
                        }
                      </p>
                    )}
                  </div>
                )}
              />
              <div className="border-b border-green-500 pb-5">
                <h2 className="font-semibold text-center text-xl mb-3">
                  Select Payment Methods
                </h2>
                <div className="grid grid-cols-3 gap-5">
                  <Controller
                    name="paymentMethod"
                    control={methods.control}
                    defaultValue={[]}
                    rules={{ required: "select at least one payment method" }}
                    render={({ field }) => (
                      <div>
                        <MultiSelector
                          options={paymentMethods}
                          label={"Select Payment Methods"}
                          selectedOption={paymentMethod}
                          setSelectedOption={(value: string[]) => {
                            field.onChange(value);
                            setPaymentMethod(value);
                            if (value.length > 0) {
                              clearErrors("paymentMethod");
                            }
                          }}
                        ></MultiSelector>
                        {methods.formState.errors.paymentMethod && (
                          <p className="text-sm font-medium text-red-700">
                            {
                              methods.formState.errors.paymentMethod
                                ?.message as string
                            }
                          </p>
                        )}
                      </div>
                    )}
                  />
                  {paymentMethod.includes("Online Payment") && (
                    <Controller
                      name="paymentOption"
                      control={methods.control}
                      defaultValue={[]}
                      rules={{
                        required: "select at least one payment option",
                      }}
                      render={({ field }) => (
                        <div>
                          <MultiSelector
                            options={paymentOptions}
                            label={"Select Payment Options"}
                            selectedOption={paymentOption}
                            setSelectedOption={(value: string[]) => {
                              field.onChange(value);
                              setPaymentOption(value);
                              if (value.length > 0) {
                                clearErrors("paymentOption");
                              }
                            }}
                          ></MultiSelector>
                          {methods.formState.errors.paymentOption && (
                            <p className="text-sm font-medium text-red-700">
                              {
                                methods.formState.errors.paymentOption
                                  ?.message as string
                              }
                            </p>
                          )}
                        </div>
                      )}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handleBack}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add Car
              </button>
            </div>
          </section>
        )} */}
      </form>
    </div>
  );
};

export default AddCar;
