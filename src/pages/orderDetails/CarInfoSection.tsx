import { Link } from "react-router-dom";
import { TCarInfoSection } from "./orderDetails.interface";
import { TbCurrencyTaka } from "react-icons/tb";

const CarInfoSection = ({ car }: { car: TCarInfoSection }) => {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 shadow-lg rounded-xl px-2 py-3 border border-blue-200 dark:border-gray-600 md:w-[40vw]">
      <div className="border-b-2 border-indigo-300 dark:border-indigo-600 pb-2 flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
          🚗 Car Information
        </h2>
        <div>
          <img
            src={car?.carBrandLogo}
            alt={`${car?.brand} logo`}
            className="w-12 h-12 rounded-full border border-gray-300 bg-white shadow-md"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <div className="relative w-full md:w-48">
          <img
            src={car?.image}
            alt={`${car?.brand} ${car?.model}`}
            className="md:w-[15vw] md:h-[9vw] rounded-lg shadow-md border border-gray-300 dark:border-gray-600"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
          {/* Brand */}
          <div>
            <span className="text-gray-700 dark:text-gray-400">Brand:</span>
            <span className="text-indigo-800 dark:text-indigo-300">
              {car?.brand}
            </span>
          </div>

          {/* Category */}
          <div>
            <span className="text-gray-700 dark:text-gray-400">Category:</span>
            <span className="text-indigo-800 dark:text-indigo-300">
              {car?.category}
            </span>
          </div>

          {/* Model */}
          <div>
            <span className="text-gray-700 dark:text-gray-400">Model:</span>
            <span className="text-indigo-800 dark:text-indigo-300">
              {car?.model}
            </span>
          </div>

          {/* Year */}
          <div>
            <span className="text-gray-700 dark:text-gray-400">Year:</span>
            <span className="text-indigo-800 dark:text-indigo-300">
              {car?.year}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1">
            <span className="text-gray-700 dark:text-gray-400">Price:</span>
            <span className="text-indigo-800 dark:text-indigo-300 flex items-center gap-1">
              <TbCurrencyTaka /> {car?.price}
            </span>
          </div>

          {/* Condition */}
          <div>
            <span className="text-gray-700 dark:text-gray-400">Condition:</span>
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                car?.condition === "New"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {car?.condition}
            </span>
          </div>

          {/* Seating Capacity */}
          <div>
            <span className="text-gray-700 dark:text-gray-400">
              Seating Capacity:
            </span>
            <span className="text-indigo-800 dark:text-indigo-300">
              {car?.seatingCapacity}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link
          className="bg-primary p-2 rounded-lg text-white hover:bg-secondary duration-500"
          to={`/details/${car?._id}`}
        >
          View car details
        </Link>
      </div>
    </div>
  );
};

export default CarInfoSection;
