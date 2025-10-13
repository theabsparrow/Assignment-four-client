import { TCarInfo } from "@/interface/carInterface/car.interface";
import { FaCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { TbCurrencyTaka } from "react-icons/tb";

const CheckOutCar = ({ car }: { car: TCarInfo }) => {
  return (
    <section className="font-inter space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 text-center">
        Car Information
      </h2>
      <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
        <img
          src={car?.image as string}
          alt={car?.brand}
          className="md:w-72 object-cover rounded-lg border-4 border-gray-300 dark:border-gray-700 shadow-lg"
        />
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {car?.brand} - {car?.model}
          </h3>
          <div className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
            <p className="text-gray-600 dark:text-gray-400 flex gap-1">
              Category:
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {car?.category}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 flex gap-1">
              Condition:
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {car?.condition}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 flex gap-1">
              Year:
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {car?.year}
              </span>
            </p>
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

            <p className=" font-semibold flex items-center gap-1 text-base">
              <strong>Price:</strong>{" "}
              <span className="text-green-700 flex items-center ">
                <TbCurrencyTaka /> {car?.price.toLocaleString()}
              </span>
              {car?.negotiable && <span>(Negotiable)</span>}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOutCar;
