import CarDetailsSceleton from "@/myComponent/loader/CarDetailsSceleton";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetSingleCarQuery } from "@/redux/features/car/carApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { formatedDate } from "../myProfile/myProfile.utills";
import { TFeature } from "@/interface/carInterface/safetyFeature.interface";
import { Star } from "lucide-react";

const CarDetails = () => {
  const user = useAppSelector(currentUser);
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCarQuery(id);
  const { result: car, carBrand, carCategory } = data?.data || {};
  const { carEngine, registrationData, serviceHistory, safetyFeature } =
    car || {};
  const [selectedImage, setSelectedImage] = useState<string>(car?.image);

  useEffect(() => {
    if (car?.image) {
      setSelectedImage(car.image);
    }
  }, [car]);

  if (isLoading) {
    return <CarDetailsSceleton />;
  }

  return (
    <section className=" bg-gray-100 dark:bg-gray-800 font-inter px-1 lg:px-16 pb-4 space-y-4">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-3 lg:gap-0 lg:justify-between">
        {/* left section photo */}
        <div className="space-y-2 lg:w-[60vw] ">
          <div className="relative">
            <img
              src={selectedImage}
              alt={car?.model}
              className="w-full h-[270px] md:h-[520px] rounded-xl"
            />
            <img
              src={car?.carBrandLogo}
              alt={car?.brand}
              className="h-5 w-5 md:h-12 md:w-12 absolute top-2 right-2"
            />
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
                </div>
              ))}
          </div>
        </div>

        {/* right side section details*/}
        <div className="lg:w-[30vw] shadow-lg dark:bg-gray-900 rounded-lg py-6 flex flex-col justify-between">
          {/* basic info */}
          <div className="w-full pt-2 px-4 py-4 lg:py-0 space-y-4 ">
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
              </ul>
              <div>
                <p className="flex items-center gap-1">
                  <strong>In Stock:</strong>{" "}
                  <span
                    className={`flex items-center gap-1 ${
                      car?.inStock ? "text-green-700" : "text-red-500"
                    }`}
                  >
                    {" "}
                    {car?.inStock ? "Available" : "Unavailable"}{" "}
                    {car?.inStock ? <FaCheckCircle /> : <RxCross2 />}
                  </span>
                </p>
                <p className=" font-semibold flex items-center gap-1 text-xl">
                  <strong>Price:</strong>{" "}
                  <span className="text-green-700 flex items-center ">
                    <TbCurrencyTaka /> {car?.price.toLocaleString()}
                  </span>
                  {car?.negotiable && <span>(Negotiable)</span>}
                </p>
              </div>
            </div>
          </div>
          {/* engine information */}
          <div className="w-full pt-4 px-4 py-4 lg:py-0 space-y-2">
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
        </div>
      </div>

      <div className=" shadow-lg dark:bg-gray-900 rounded-lg py-4 flex flex-col lg:flex-row justify-between">
        {/* registration information */}
        <div className=" px-4 py-4 lg:py-0 space-y-2 w-full">
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
          <div className=" px-4 py-4 lg:py-0 space-y-2 w-full">
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
          <div className=" px-4 py-4 lg:py-0 space-y-2 w-full">
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
      <div className="flex items-center justify-end ">
        {user && user.userId !== car?._id && car?.inStock && (
          <Link
            to={`/all-cars/checkout/${car?._id}`}
            className="bg-secondary dark:bg-gray-500 dark:text-gray-200 hover:bg-red-700 dark:hover:bg-secondary flex justify-center md:w-36 text-white font-bold p-2 rounded-md duration-500 transition"
          >
            Checkout
          </Link>
        )}
      </div>
      <div>same brands car will show here</div>
      <div>same category car will show here</div>
    </section>
  );
};

export default CarDetails;
