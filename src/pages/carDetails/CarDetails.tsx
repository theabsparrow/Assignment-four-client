import { USER_ROLE } from "@/config/role.const";
import CarDetailsSceleton from "@/myComponent/loader/CarDetailsSceleton";
import { currentUser } from "@/redux/features/auth/authSlice";
import {
  useGetSingleCarQuery,
  useRemoveGalleryImageMutation,
  useUpdateCarMutation,
  useUpdateGalleryImageMutation,
} from "@/redux/features/car/carApi";
import { useAppSelector } from "@/redux/hooks";
import { imageUpload } from "@/utills/uploadImage";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import AddCarSelectInput from "../dashboard/admin/addCar/AddCarSelectInput";
import carColors, {
  carBrands,
  carCategories,
  seatingCapacities,
  years,
} from "../dashboard/admin/addCar/addcar.const";
import { countries } from "@/config/country.const";
import FormSelect from "@/myComponent/formInput/FormSelect";
import { conditions } from "@/myComponent/formInput/formInput.const";
import FormInput from "@/myComponent/formInput/FormInput";
import TextArea from "../dashboard/admin/addCar/addCarTextArea";

const CarDetails = () => {
  const user = useAppSelector(currentUser);
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCarQuery(id);
  const car = data?.data;
  const [selectedImage, setSelectedImage] = useState(car?.image);
  const [editing, setEditing] = useState(false);
  const [updateCarInfo] = useUpdateCarMutation();
  const [updateGalleryImageInfo] = useUpdateGalleryImageMutation();
  const [removeGalleryImageInfo] = useRemoveGalleryImageMutation();
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (car?.image) {
      setSelectedImage(car.image);
    }
  }, [car]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const toastId = toast.loading(` photo uploading....`);
    const file = e.target.files?.[0];
    try {
      const carInfo: { image?: string } = {};
      if (file) {
        carInfo.image = await imageUpload(file!);
      }
      let res;
      if (carInfo) {
        res = await updateCarInfo({ carInfo, id }).unwrap();
      }
      if (res.data.result?.image) {
        setSelectedImage(res.data.result?.image);
      }
      toast.success(` photo uploaded successfully`, {
        id: toastId,
        duration: 3000,
      });
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const handleUpdateGalleryImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    const toastId = toast.loading(` photo uploading....`);
    try {
      let res;
      if (file) {
        const url = await imageUpload(file!);
        const imageInfo = { galleryImage: [{ url }] };
        res = await updateGalleryImageInfo({ imageInfo, id }).unwrap();
      }
      if (res.data?.galleryImage.length > 0) {
        toast.success(` photo uploaded successfully`, {
          id: toastId,
          duration: 3000,
        });
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const handleDeleteImage = async (imageUrl: string) => {
    const imageInfo = { galleryImage: [{ url: imageUrl }] };
    try {
      const res = await removeGalleryImageInfo({ imageInfo, id });
      if (res.data) {
        toast.success("photo deleted successfullt", { duration: 3000 });
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  const onSubmit = async (data: any) => {
    setErrorMessage("");
    const updatedFields = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== "")
    );
    if (Object.entries(updatedFields).length === 0) {
      return setErrorMessage("Nothing to update");
    }
    const toastId = toast.loading("car info updating....");
    try {
      const res = await updateCarInfo({ carInfo: updatedFields, id }).unwrap();
      if (res.data) {
        toast.success("car info updated successfully", {
          id: toastId,
          duration: 3000,
        });
        reset();
        setEditing(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  if (isLoading) {
    return <CarDetailsSceleton></CarDetailsSceleton>;
  }

  return (
    <div className="md:px-32 min-h-screen bg-gray-100 dark:bg-gray-800 flex justify-between items-start py-2 font-inter">
      <div className="max-w-4xl w-full shadow-lg dark:bg-gray-900 rounded-lg">
        {/* large image section starts */}
        <div className="relative">
          <img
            src={selectedImage}
            alt={car?.model}
            className="w-full h-[200px] md:h-[550px]"
          />
          <div className="absolute top-1 right-1 md:top-4 md:right-4 bg-white p-2 rounded-full shadow-md">
            <img
              src={car?.carBrandLogo}
              alt={car?.brand}
              className="h-5 w-5 md:h-12 md:w-12 "
            />
          </div>

          {(user?.userRole === USER_ROLE.admin ||
            user?.userRole === USER_ROLE.superAdmin) && (
            <label className="absolute bottom-1 right-1 bg-gray-300 dark:bg-gray-700 p-1 md:p-2 rounded-full shadow-md cursor-pointer">
              📷
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleImageChange(e)}
              />
            </label>
          )}
        </div>
        {/* large image section ends */}

        {/* sideber image section for mobile starts */}
        <div className="flex flex-col md:hidden ">
          <div className="h-16 flex items-center md:hidden">
            <img
              src={car?.image}
              alt={car?.brand}
              onClick={() => setSelectedImage(car?.image)}
              className={`w-[70px] h-16 md:w-60 hover:scale-110 duration-500 cursor-pointer${
                selectedImage === car?.image
                  ? " border-2 border-secondary shadow-lg scale-110 z-10"
                  : "border-none"
              }`}
            />
            {car?.galleryImage.length < 5 &&
              (user?.userRole === USER_ROLE.admin ||
                user?.userRole === USER_ROLE.superAdmin) && (
                <div className="w-16 h-16 md:w-60 bg-gray-300 dark:bg-gray-700 shadow-md border-2 border-secondary border-dashed ">
                  <label className="cursor-pointer w-full flex justify-center items-center py-[14px]">
                    <IoAdd className="text-4xl text-red-500" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleUpdateGalleryImage(e)}
                    />
                  </label>
                </div>
              )}
          </div>
          <div className="flex items-center h-16 md:hidden">
            {car?.galleryImage.length > 0 &&
              car.galleryImage.map(
                (
                  photo: { url: string; isDeleted: boolean; _id: string },
                  index: number
                ) => (
                  <div
                    key={index}
                    className="relative w-[76px] md:w-60 group overflow-hidden"
                  >
                    {(user?.userRole === USER_ROLE.superAdmin ||
                      user?.userRole === USER_ROLE.admin) && (
                      <button
                        onClick={() => handleDeleteImage(photo.url)}
                        className={`${
                          user?.userRole === USER_ROLE.user && "hidden"
                        } absolute top-1 right-1 text-secondary md:text-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20`}
                      >
                        <MdDelete />
                      </button>
                    )}
                    <img
                      src={photo.url}
                      alt={car?.brand}
                      onClick={() => setSelectedImage(photo.url)}
                      className={`w-[70px] h-16 hover:cursor-pointer hover:scale-110 hover:relative hover:z-10 duration-500 ${
                        selectedImage === photo.url
                          ? "  shadow-lg scale-110 relative z-10"
                          : "border-none z-0"
                      }`}
                    />
                  </div>
                )
              )}
          </div>
        </div>
        {/* sideber image section for mobile ends */}

        {/* car information section starts */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {car?.brand} {car?.model}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {car?.description}
          </p>
          {(user?.userRole === USER_ROLE.admin ||
            user?.userRole === USER_ROLE.superAdmin) && (
            <div className="flex justify-end mt-4 ">
              <button
                className="text-blue-500 font-semibold hover:underline "
                onClick={() => {
                  setEditing(!editing);
                }}
              >
                {editing ? "Cancel" : "Edit"}
              </button>
            </div>
          )}

          {/* editable section starts */}
          {!editing && (
            <div className="text-gray-700 dark:text-gray-300">
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <p>
                  <strong>Brand:</strong> {car?.brand}
                </p>
                <p>
                  <strong>Model:</strong> {car?.model}
                </p>
                <p>
                  <strong>Year:</strong> {car?.year}
                </p>
                <p>
                  <strong>Category:</strong> {car?.category}
                </p>
                <p>
                  <strong>Color:</strong> {car?.color}
                </p>
                <p>
                  <strong>Condition:</strong> {car?.condition}
                </p>
                <p>
                  <strong>Seating Capacity:</strong> {car?.seatingCapacity}
                </p>
                <p>
                  <strong>Made In:</strong> {car?.madeIn}
                </p>
                <p>
                  <strong>Country:</strong> {car?.country}
                </p>
                <p className="text-lg font-semibold text-green-600 flex items-center">
                  <strong>Price:</strong> <TbCurrencyTaka className="text-xl" />{" "}
                  {car?.price.toLocaleString()}
                </p>
              </div>

              {car?.inStock && user?.userRole === USER_ROLE.user && (
                <div className="grid grid-cols-1 md:grid-cols-2 mt-4 items-center space-y-4 md:space-y-0">
                  <p
                    className={car?.inStock ? "text-green-500" : "text-red-500"}
                  >
                    <strong>Status:</strong>{" "}
                    {car?.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  <Link
                    to={`/checkout/${car?._id}`}
                    className="bg-secondary dark:bg-gray-500 dark:text-gray-200 dark:hover:bg-secondary flex justify-center md:w-36 text-white font-bold p-2 rounded-md duration-500 transition"
                  >
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          )}
          {/* editable section ends */}
          {errorMessage && editing && (
            <h1 className="text-red-600 text-sm text-center mb-4">
              {errorMessage}
            </h1>
          )}
          {/* edit option input starts */}
          {editing &&
            (user?.userRole === USER_ROLE.admin ||
              user?.userRole === USER_ROLE.superAdmin) && (
              <div className="text-gray-700 dark:text-gray-300">
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5 ">
                      <AddCarSelectInput
                        name="brand"
                        label="Brand"
                        options={carBrands}
                      ></AddCarSelectInput>
                      <AddCarSelectInput
                        name="category"
                        label="Category"
                        options={carCategories}
                      ></AddCarSelectInput>
                      <FormSelect
                        label="Condition"
                        name="condition"
                        options={conditions}
                        register={methods.register}
                      />
                      <AddCarSelectInput
                        name="country"
                        label="Country"
                        options={countries}
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
                      />
                      <FormInput
                        label="Model"
                        name="model"
                        placeholder="Your car model"
                        type="text"
                        maxLength={40}
                        register={methods.register}
                      />
                      <FormInput
                        label="Price"
                        name="price"
                        placeholder="Enter price"
                        type="number"
                        maxLength={10}
                        register={methods.register}
                      />
                      <TextArea
                        name="description"
                        label="Description"
                        placeholder="Enter your text..."
                        register={methods.register}
                        errors={methods.formState.errors}
                      />
                      <div className=" flex items-center justify-end">
                        <button
                          type="submit"
                          className="bg-secondary dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition "
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </FormProvider>
              </div>
            )}
          {/* editng option input ends */}
        </div>
        {/* car information section ends */}
      </div>

      {/* sideber image section or large device starts */}
      <div className="hidden md:flex flex-col">
        <img
          src={car?.image}
          alt={car?.brand}
          onClick={() => setSelectedImage(car?.image)}
          className={`w-60 hover:scale-110 duration-500 cursor-pointer${
            selectedImage === car?.image
              ? " border-2 border-secondary shadow-lg scale-110 z-10"
              : "border-none"
          }`}
        />
        {car?.galleryImage.length > 0 &&
          car.galleryImage.map(
            (
              photo: { url: string; isDeleted: boolean; _id: string },
              index: number
            ) => (
              <div key={index} className="relative w-60 group">
                <button
                  onClick={() => handleDeleteImage(photo.url)}
                  className={`${
                    user?.userRole === USER_ROLE.user && "hidden"
                  } absolute top-1 right-1  text-secondary text-2xl p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20`}
                >
                  <MdDelete />
                </button>
                <img
                  src={photo.url}
                  alt={car?.brand}
                  onClick={() => setSelectedImage(photo.url)}
                  className={`w-full hover:cursor-pointer hover:scale-110 hover:relative hover:z-10 duration-500 ${
                    selectedImage === photo.url
                      ? " border-2 border-secondary shadow-lg scale-110 relative z-10"
                      : "border-none z-0"
                  }`}
                />
              </div>
            )
          )}
        {car?.galleryImage.length < 5 &&
          (user?.userRole === USER_ROLE.admin ||
            user?.userRole === USER_ROLE.superAdmin) && (
            <div className="w-60 bg-gray-300 dark:bg-gray-700 shadow-md border-2 border-secondary border-dashed ">
              <label className="cursor-pointer w-full flex justify-center items-center py-12">
                <IoAdd className="text-4xl text-red-500" />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleUpdateGalleryImage(e)}
                />
              </label>
            </div>
          )}
      </div>
      {/* sideber image section for large device ends */}
    </div>
  );
};

export default CarDetails;
