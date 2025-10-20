import { TFeature } from "@/interface/carInterface/safetyFeature.interface";
import { formatedDate } from "@/pages/myProfile/myProfile.utills";
import {
  currentBasicInfo,
  resetBasicInfo,
} from "@/redux/features/car/basicInfoSlice";
import {
  useGetMySingleCarQuery,
  useUpdateCarMutation,
} from "@/redux/features/car/carApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { imageUpload } from "@/utills/uploadImage";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MyCarDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMySingleCarQuery(id);
  const car = data?.data;
  const { carEngine, registrationData, serviceHistory, safetyFeature } =
    car || {};
  const basicInfo = useAppSelector(currentBasicInfo);
  const dispatch = useAppDispatch();
  const [updateCar] = useUpdateCarMutation();
  const [open, setOpen] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>(car?.image);

  useEffect(() => {
    if (car?.image) {
      setSelectedImage(car.image);
    }
  }, [car]);

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    gallery?: string
  ) => {
    const toastId = toast.loading(` photo uploading....`);
    const file = e.target.files?.[0];
    try {
      const image = await imageUpload(file!);
      if (!image) {
        toast.error("faild to upload the image");
        return;
      }
      const data: Partial<{ image: string; addGalleryImage: string[] }> = {};
      if (gallery) {
        data.addGalleryImage?.push(image);
      } else {
        data.image = image;
      }
      const payload = { id: car?._id, data };
      const res = await updateCar(payload).unwrap();

      if (res.data) {
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

  const handleRemoveImage = async (photo: string) => {
    const toastId = toast.loading(` photo removing....`);
    try {
      const data: { removeGalleryImage: string[] } = {
        removeGalleryImage: [photo],
      };
      const payload = { id: car?._id, data };
      const res = await updateCar(payload).unwrap();

      if (res.data) {
        toast.success(` photo removed successfully`, {
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

  const handleSubmit = async () => {
    if (!basicInfo || Object.keys(basicInfo).length === 0) {
      return toast.error("nothing to update", { duration: 3000 });
    }
    const toastId = toast.loading("updating basic info....");
    const payload = { id: car?._id, basicInfo };
    try {
      const res = await updateCar(payload).unwrap();
      if (res?.data) {
        toast.success("successfully updated basic info", {
          id: toastId,
          duration: 3000,
        });
        setOpen("");
        dispatch(resetBasicInfo());
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
      dispatch(resetBasicInfo());
    }
  };

  if (isLoading) {
    return <h1>loading....</h1>;
  }

  return (
    <section className=" bg-gray-100 dark:bg-gray-800 font-inter space-y-20 p-4">
      {/* image section */}
      <div className="space-y-2">
        <div className="relative  w-[60vw] mx-auto">
          <img
            src={selectedImage}
            alt={car?.model}
            className="w-full rounded-xl"
          />
          <img
            src={car?.carBrandLogo}
            alt={car?.brand}
            className="h-5 w-5 md:h-12 md:w-12 absolute top-2 right-2"
          />
          <label className="absolute bottom-1 right-1 bg-gray-300 dark:bg-gray-700 p-1 md:p-2 rounded-full shadow-md cursor-pointer">
            📷
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleImageChange(e)}
            />
          </label>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <img
            src={car?.image}
            alt={car?.brand}
            onClick={() => setSelectedImage(car?.image)}
            className={`w-[60px] md:w-[16vw] lg:w-[9.5vw] h-10 md:h-28 lg:h-24 hover:scale-110 duration-500 cursor-pointer rounded-lg ${
              selectedImage === car?.image
                ? " border-2 border-green-500 shadow-lg scale-105 z-10"
                : "border border-gray-500"
            }`}
          />
          {car?.galleryImage.length > 0 &&
            car.galleryImage.map((image: string, i: number) => (
              <div
                key={i}
                className="relative w-[60px] md:w-[16vw] lg:w-[9.5vw] group shadow-xl"
              >
                <img
                  src={image}
                  alt={car?.brand}
                  onClick={() => setSelectedImage(image)}
                  className={`w-full h-10 md:h-28 lg:h-24 hover:cursor-pointer hover:scale-110 hover:relative hover:z-10 duration-500 rounded-lg ${
                    selectedImage === image
                      ? " border-2 border-green-500 shadow-lg scale-110 relative z-10"
                      : "border border-gray-500 z-0"
                  }`}
                />
                <button
                  onClick={() => handleRemoveImage(image)}
                  className="absolute top-0 right-0  text-secondary text-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          {car?.galleryImage.length < 5 && (
            <div className="w-16 h-16 md:w-60 bg-gray-300 dark:bg-gray-700 shadow-md border-2 border-secondary border-dashed ">
              <label className="cursor-pointer w-full flex justify-center items-center py-[14px]">
                <IoAdd className="text-4xl text-red-500" />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, "galleryImage")}
                />
              </label>
            </div>
          )}
        </div>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 ">
        {/* basic info */}
        <div className="w-full p-4 space-y-4 ">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
              Car Information
            </h2>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <span>{car?.brand}</span> <span>{car?.model}</span>{" "}
                <span className="text-xl">({car?.condition})</span>
              </h2>
              {car?.description && (
                <p className="text-gray-600 dark:text-gray-300">
                  {car?.description}
                </p>
              )}
            </div>
          </div>
          <div className="text-gray-700 dark:text-gray-300 space-y-4">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <li>
                <strong>Brand:</strong> {car?.brand}
                {!open && <button onClick={handleSubmit}>edit</button>}
              </li>
              <li>
                <strong>Model:</strong> {car?.model}
              </li>
              <li>
                <strong>Category:</strong> {car?.category}
              </li>
              <li>
                <strong>Year:</strong> {car?.year}
              </li>
              <li>
                <strong>Condition:</strong> {car?.condition}
              </li>
              <li>
                <strong>Color:</strong> {car?.color}
              </li>
              <li>
                <strong>Seating Capacity:</strong> {car?.seatingCapacity}
              </li>
              <li>
                <strong>Made In:</strong> {car?.madeIn}
              </li>
              <li>
                <strong>Negotiable:</strong> {car?.negotiable ? "Yes" : "No"}
              </li>
              <li>
                <strong>In Stock:</strong> {car?.inStock ? "Yes" : "No"}
              </li>
              <li>
                <strong>Price:</strong> {car?.price}
              </li>
            </ul>
          </div>
        </div>

        {/* engine information */}
        <div className="w-full p-4 space-y-2">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
              Engine Information
            </h2>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              {carEngine?.engine} Engine
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>
              <strong>Transmission:</strong> {carEngine?.transmission}
            </li>
            <li>
              <strong>Fuel:</strong> {carEngine?.fuelType}
            </li>

            <li>
              <strong>Mileage:</strong> {carEngine?.mileage} km
            </li>
            <li>
              <strong>Drive Train:</strong> {carEngine?.driveTrain}
            </li>
            <li>
              <strong>Top Speed:</strong> {carEngine?.topSpeed} km/h
            </li>
            <li>
              <strong>Horse Power:</strong> {carEngine?.horsePower} hp
            </li>
            <li>
              <strong>Torque:</strong> {carEngine?.torque} N-m
            </li>
            <li>
              <strong>Acceleration:</strong> {carEngine?.acceleration} sec
            </li>
          </ul>
        </div>

        {/* registration information */}
        <div className="w-full p-4 space-y-4 ">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
              Registration Information
            </h2>
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              Vehicle Identification Number:{" "}
              <span>{registrationData?.vin}</span>
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300 text-sm">
            {registrationData?.licensePlate && (
              <li>
                <strong>License:</strong> {registrationData?.licensePlate}
              </li>
            )}
            {registrationData?.registrationAuthority && (
              <li>
                <strong> Authority:</strong>{" "}
                {registrationData?.registrationAuthority}
              </li>
            )}
            {registrationData?.registrationCountry && (
              <li>
                <strong> Country:</strong>{" "}
                {registrationData?.registrationCountry}
              </li>
            )}
            {registrationData?.previousOwner && (
              <li>
                <strong> Pre Owner:</strong> {registrationData?.previousOwner}
              </li>
            )}
            {registrationData?.previousOwnerAddress && (
              <li>
                <strong> Pre Address:</strong>{" "}
                {registrationData?.previousOwnerAddress}
              </li>
            )}
            {registrationData?.registrationYear && (
              <li>
                <strong> Year:</strong> {registrationData?.registrationYear}
              </li>
            )}
            <li>
              <strong> Tax Paid:</strong>{" "}
              {registrationData?.roadTaxPaid ? "Yes" : "No"}
            </li>
          </ul>
        </div>

        {/* service history */}
        {serviceHistory && (
          <div className="w-full p-4 space-y-4 ">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
                Service History
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {serviceHistory?.serviceDetails}
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>
                <strong>Service Center:</strong> {serviceHistory?.serviceCenter}
              </li>
              <li>
                <strong>Service Date:</strong>{" "}
                {
                  formatedDate(new Date(serviceHistory?.serviceDate))
                    .creationDate as string
                }
              </li>
              <li className="flex items-center gap-1">
                <strong>Service Cost:</strong> {serviceHistory?.cost}{" "}
                <TbCurrencyTaka className="text-xl" />
              </li>
              <li className="flex items-center gap-1">
                <strong>Mileage at Service:</strong>{" "}
                {serviceHistory?.mileageAtService} km
              </li>
            </ul>
          </div>
        )}

        {/* safety feature */}
        {safetyFeature && (
          <div className="w-full p-4 space-y-4 ">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
                Safety Feature
              </h2>
              {(safetyFeature?.features as TFeature[]).length > 0 && (
                <p className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-300 gap-1">
                  {(safetyFeature?.features as TFeature[]).map((feature, i) => (
                    <span key={i}>{feature},</span>
                  ))}
                </p>
              )}
            </div>
            <ul className="grid grid-cols-1 gap-2 text-gray-700 dark:text-gray-300 text-sm">
              <li className="flex items-center gap-1">
                {
                  <div className="flex items-center gap-3">
                    <strong>Safety Rating:</strong>
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const starValue = idx + 1;
                      return (
                        <Star
                          key={idx}
                          className={`w-5 h-5 ${
                            safetyFeature?.safetyRating >= starValue
                              ? "fill-yellow-500 "
                              : "fill-gray-600"
                          }`}
                        />
                      );
                    })}
                  </div>
                }
              </li>
              {safetyFeature?.airbags && (
                <li className="flex items-center gap-1">
                  <strong>Air bags:</strong> {safetyFeature?.airbags} air bags
                </li>
              )}
              {safetyFeature?.warranty && (
                <li className="flex items-center gap-1">
                  <strong>Warrenty:</strong> {safetyFeature?.warranty}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyCarDetails;
