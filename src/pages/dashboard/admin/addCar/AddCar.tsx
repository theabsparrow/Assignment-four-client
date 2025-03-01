import { FormProvider, useForm } from "react-hook-form";
import carColors, {
  carBrands,
  carCategories,
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

const AddCar = () => {
  const methods = useForm();
  const { handleSubmit, setError, reset } = methods;
  const [addCar] = useAddCarMutation();

  const onSubmit = async (data: any) => {
    let hasError = false;
    requiredFields.forEach((field) => {
      if (!data[field]) {
        setError(field, { type: "manual", message: `${field} is required` });
        hasError = true;
      }
    });
    if (hasError) return;
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
    } = data;
    const carPrice = Number(car);
    const toastId = toast.loading("car data uploading.....");
    try {
      const basicInfo: TCarInfo = {
        seatingCapacity,
        brand,
        category,
        color,
        condition,
        country,
        description,
        madeIn,
        model,
        price: carPrice,
        year,
      };
      const galleryImage = [];
      if (photo && photo.length > 1) {
        for (const image of photo) {
          const result = { url: await imageUpload(image) };
          galleryImage.push(result);
        }
      }
      const image = await imageUpload(carImage);
      if (image) {
        basicInfo.image = image;
      }
      if (galleryImage.length > 1) {
        basicInfo.galleryImage = galleryImage;
      }
      const res = await addCar({ basicInfo }).unwrap();
      console.log(res);
      toast.success("car info uploaded successfully ", {
        id: toastId,
        duration: 3000,
      });
      reset();
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <div className="px-5 md:px-20 py-10 -600 font-inter md:w-[70vw]">
      <h1 className="text-2xl font-bold mb-4">Add a New Car</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5 items-center">
            <div className="space-y-2 md:space-y-5">
              <FormInput
                label="Model"
                name="model"
                placeholder="Your car model"
                type="text"
                maxLength={40}
                register={methods.register}
                required={true}
              />
              <FormInput
                label="Price"
                name="price"
                placeholder="Enter price"
                type="number"
                maxLength={10}
                register={methods.register}
                required={true}
              />
            </div>
            <div>
              <FormInput
                label="Image"
                name="carImage"
                type="file"
                register={methods.register}
                required={true}
                setValue={methods.setValue}
              />
            </div>
          </div>

          <div>
            <MultipleImageUpload
              name={"photo"}
              label={"Gallery Image (multiple photo)"}
            />
          </div>
          <TextArea
            name="description"
            label="Description"
            placeholder="Enter your text..."
            register={methods.register}
            errors={methods.formState.errors}
            validationRules={{
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Must be at least 10 characters",
              },
            }}
          />

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Car
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddCar;
