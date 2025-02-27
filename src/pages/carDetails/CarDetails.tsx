import { USER_ROLE } from "@/config/role.const";

import CarDetailsSceleton from "@/myComponent/loader/CarDetailsSceleton";
import { currentUser } from "@/redux/features/auth/authSlice";
import {
  useGetSingleCarQuery,
  useUpdateCarMutation,
  useUpdateGalleryImageMutation,
} from "@/redux/features/car/carApi";
import { useAppSelector } from "@/redux/hooks";
import { imageUpload } from "@/utills/uploadImage";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CarDetails = () => {
  const user = useAppSelector(currentUser);
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCarQuery(id);
  const car = data?.data;
  const [selectedImage, setSelectedImage] = useState(car?.image);
  const [updateCarInfo] = useUpdateCarMutation();
  const [updateGalleryImageInfo] = useUpdateGalleryImageMutation();

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
    const toastId = toast.loading(` photo uploading....`);
    const file = e.target.files?.[0];
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

  if (isLoading) {
    return <CarDetailsSceleton></CarDetailsSceleton>;
  }
  return (
    <div className="md:px-32 min-h-screen bg-gray-100 flex justify-between items-start py-2">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg">
        <div className="relative">
          <img
            src={selectedImage}
            alt={car?.model}
            className="w-full h-[550px]"
          />
          <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
            <img
              src={car?.carBrandLogo}
              alt={car?.brand}
              className="h-12 w-12 "
            />
          </div>

          {(user?.userRole === USER_ROLE.admin ||
            user?.userRole === USER_ROLE.superAdmin) && (
            <label className="absolute bottom-1 right-1 bg-gray-300 dark:bg-gray-700 p-2 rounded-full shadow-md cursor-pointer">
              📷
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleImageChange(e)}
              />
            </label>
          )}
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {car?.brand} {car?.model}
          </h2>
          <p className="text-gray-600 mt-2">{car?.description}</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-gray-700">
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
            <p className="text-lg font-semibold text-green-600">
              <strong>Price:</strong> ${car?.price.toLocaleString()}
            </p>
            <p className={car?.inStock ? "text-green-500" : "text-red-500"}>
              <strong>Status:</strong>{" "}
              {car?.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <img
          src={car?.image}
          alt={car?.brand}
          onClick={() => setSelectedImage(car?.image)}
          className={`w-60 hover:scale-110 duration-500 cursor-pointer ${
            selectedImage === car?.image
              ? " border-2 border-secondary shadow-lg scale-110"
              : "border-none"
          }`}
        />
        {car?.galleryImage.length > 0 &&
          car.galleryImage.map(
            (
              photo: { url: string; isDeleted: boolean; _id: string },
              index: number
            ) => (
              <img
                key={index}
                src={photo.url}
                alt={car?.brand}
                onClick={() => setSelectedImage(photo.url)}
                className={`w-60 hover:scale-110 duration-500 cursor-pointer ${
                  selectedImage === photo.url
                    ? " border-2 border-secondary shadow-lg scale-110"
                    : "border-none"
                }`}
              />
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
    </div>
  );
};

export default CarDetails;
