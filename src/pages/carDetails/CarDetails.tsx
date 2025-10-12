import { USER_ROLE } from "@/config/role.const";
import CarDetailsSceleton from "@/myComponent/loader/CarDetailsSceleton";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetSingleCarQuery } from "@/redux/features/car/carApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";

const CarDetails = () => {
  const user = useAppSelector(currentUser);
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCarQuery(id);
  const car = data?.data || {};
  console.log(car);
  const [selectedImage, setSelectedImage] = useState(car?.image);

  useEffect(() => {
    if (car?.image) {
      setSelectedImage(car.image);
    }
  }, [car]);

  if (isLoading) {
    return <CarDetailsSceleton></CarDetailsSceleton>;
  }
  console.log(user?.userId, car?._id);

  return (
    <section className=" bg-gray-100 dark:bg-gray-800 font-inter px-2 lg:px-16 py-2">
      <div className="flex justify-between items-start">
        <div className="max-w-4xl w-full shadow-lg dark:bg-gray-900 rounded-lg">
          <div className="relative">
            <img
              src={selectedImage}
              alt={car?.model}
              className="w-full h-[200px] md:h-[550px] rounded-xl"
            />
            <div className="absolute top-1 right-1 md:top-4 md:right-4 bg-white p-2 rounded-full shadow-md">
              <img
                src={car?.carBrandLogo}
                alt={car?.brand}
                className="h-5 w-5 md:h-12 md:w-12 "
              />
            </div>
          </div>

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
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {car?.brand} {car?.model}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {car?.description}
            </p>

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

              {car?.inStock &&
                (user?.userRole === USER_ROLE.user ||
                  user?.userRole === USER_ROLE.admin ||
                  user?.userRole === USER_ROLE.superAdmin) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 mt-4 items-center space-y-4 md:space-y-0">
                    <p
                      className={
                        car?.inStock ? "text-green-500" : "text-red-500"
                      }
                    >
                      <strong>Status:</strong>{" "}
                      {car?.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                    {user && user.userId !== car?._id && (
                      <Link
                        to={`/all-cars/checkout/${car?._id}`}
                        className="bg-secondary dark:bg-gray-500 dark:text-gray-200 dark:hover:bg-secondary flex justify-center md:w-36 text-white font-bold p-2 rounded-md duration-500 transition"
                      >
                        Checkout
                      </Link>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col space-y-1">
          <img
            src={car?.image}
            alt={car?.brand}
            onClick={() => setSelectedImage(car?.image)}
            className={`w-60 h-40 hover:scale-110 duration-500 cursor-pointer rounded-lg ${
              selectedImage === car?.image
                ? " border-2 border-secondary shadow-lg scale-110 z-10"
                : "border border-gray-500"
            }`}
          />
          {car?.galleryImage.length > 0 &&
            car.galleryImage.map((image: string, i: number) => (
              <div key={i} className="relative w-60 group shadow-xl">
                <img
                  src={image}
                  alt={car?.brand}
                  onClick={() => setSelectedImage(image)}
                  className={`w-full h-40 hover:cursor-pointer hover:scale-110 hover:relative hover:z-10 duration-500 rounded-lg ${
                    selectedImage === image
                      ? " border-2 border-secondary shadow-lg scale-110 relative z-10"
                      : "border border-gray-500 z-0"
                  }`}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
