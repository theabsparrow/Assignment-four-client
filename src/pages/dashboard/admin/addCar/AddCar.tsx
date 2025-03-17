import { Controller, FormProvider, useForm } from "react-hook-form";
import carColors, {
  carBrands,
  carCategories,
  deliveryMethod,
  estimatedTime,
  paymentMethods,
  paymentOptions,
  requiredFields,
  seatingCapacities,
  years,
} from "./addcar.const";
import AddCarSelectInput from "./AddCarSelectInput";
import FormInput from "@/myComponent/formInput/FormInput";
import TextArea from "./addCarTextArea";
import FormSelect from "@/myComponent/formInput/FormSelect";
import { conditions } from "@/myComponent/formInput/formInput.const";
import { countries } from "@/config/country.const";
import MultipleImageUpload from "./MultipleImageUpload";
import { imageUpload } from "@/utills/uploadImage";
import { toast } from "sonner";
import { TCarInfo } from "./carInfo.types";
import { useAddCarMutation } from "@/redux/features/car/carApi";
import MultiSelector from "@/myComponent/formInput/MultiSelector";
import { useState } from "react";
import GroupMultiSelector from "@/myComponent/formInput/GroupMultiSelector";
import { DeliveryMethod } from "./addcar.interface";

const AddCar = () => {
  const methods = useForm({ mode: "all" });
  const {
    handleSubmit,
    setError,
    reset,
    setValue,
    getValues,
    clearErrors,
    formState: { isValid },
  } = methods;
  const [currentStep, setCurrentStep] = useState(1);
  const [addCar] = useAddCarMutation();
  console.log(isValid);
  const onSubmit = async (data: any) => {
    if (currentStep === 2) {
      const fields = {
        paymentOption: "Select at least one payment option",
        paymentMethod: "Select at least one payment method",
        deliveryMethod: "Add at least one delivery method",
      };

      Object.entries(fields).forEach(([key, message]) => {
        if (!data[key] || data[key].length === 0) {
          setError(key, { type: "manual", message });
        }
      });
    }

    const {
      seatingCapacity,
      brand,
      category,
      color,
      condition,
      country,
      description,
      carImage,
      madeIn,
      model,
      photo,
      price: car,
      year,
      paymentMethod,
      paymentOption,
    } = data;
    const carPrice = Number(car);
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
    //     paymentOption: paymentOption.map((option: string) => ({ option })),
    //   };
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
    //   }
    // } catch (error: any) {
    //   console.log(error);
    //   const errorInfo =
    //     error?.data?.message || error?.error || "Something went wrong!";
    //   toast.error(errorInfo, { id: toastId, duration: 3000 });
    // }
  };

  const handleNext = async () => {
    if (isValid) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <div className="px-5 md:px-20 py-10 -600 font-inter md:w-[70vw]">
      <h1 className="text-2xl font-bold mb-4">Add a New Car</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {currentStep === 1 && (
            <section>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5 ">
                <div className="space-y-2 md:space-y-5">
                  <AddCarSelectInput
                    name="brand"
                    label="Brand"
                    options={carBrands}
                  ></AddCarSelectInput>
                  <AddCarSelectInput
                    name="country"
                    label="Country"
                    options={countries}
                  ></AddCarSelectInput>
                  <FormSelect
                    label="Condition"
                    name="condition"
                    options={conditions}
                    register={methods.register}
                    required
                    clearErrors={clearErrors}
                  />
                </div>

                <div className="space-y-2 md:space-y-5">
                  <AddCarSelectInput
                    name="category"
                    label="Category"
                    options={carCategories}
                  ></AddCarSelectInput>
                  <AddCarSelectInput
                    name="madeIn"
                    label="Made in country"
                    options={countries}
                  ></AddCarSelectInput>
                  <AddCarSelectInput
                    name="color"
                    label="Color"
                    options={carColors}
                  ></AddCarSelectInput>
                </div>

                <div className="space-y-2 md:space-y-5">
                  <AddCarSelectInput
                    name="year"
                    label="Year"
                    options={years}
                  ></AddCarSelectInput>
                  <FormSelect
                    label="Seating Capacity"
                    name="seatingCapacity"
                    options={seatingCapacities}
                    register={methods.register}
                    required
                    clearErrors={clearErrors}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5 items-center">
                <div>
                  <FormInput
                    label="Model"
                    name="model"
                    placeholder="Your car model"
                    type="text"
                    maxLength={40}
                    register={methods.register}
                    required={true}
                    clearErrors={clearErrors}
                  />
                  <FormInput
                    label="Price"
                    name="price"
                    placeholder="Enter price"
                    type="number"
                    maxLength={10}
                    register={methods.register}
                    required={true}
                    clearErrors={clearErrors}
                  />
                </div>
                <FormInput
                  label="Image"
                  name="carImage"
                  type="file"
                  register={methods.register}
                  required={true}
                  setValue={methods.setValue}
                  clearErrors={clearErrors}
                />
                <TextArea
                  name="description"
                  label="Description"
                  placeholder="Enter your text..."
                  register={methods.register}
                  errors={methods.formState.errors}
                  clearErrors={clearErrors}
                />
              </div>
              <div>
                <MultipleImageUpload
                  name={"photo"}
                  label={"Gallery Image (multiple photo)"}
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  disabled={!isValid}
                  onClick={handleNext}
                  className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </section>
          )}

          {/* payment and delivery section */}
          {currentStep === 2 && (
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
                        selectedGroup={field.value}
                        setSelectedGroup={(value: DeliveryMethod[]) => {
                          field.onChange(value);
                          if (value.length > 0) {
                            clearErrors("deliveryMethods");
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
                      name="paymentOption"
                      control={methods.control}
                      defaultValue={[]}
                      rules={{ required: "select at least one payment option" }}
                      render={({ field }) => (
                        <div>
                          <MultiSelector
                            options={paymentOptions}
                            label={"Select Payment Options"}
                            option={field.value}
                            setOptions={(value) => {
                              field.onChange(value);
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
                            option={field.value}
                            setOptions={(value) => {
                              field.onChange(value);
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
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default AddCar;
