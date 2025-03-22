import { TbCurrencyTaka } from "react-icons/tb";
import { TCar } from "./checkOutInterface";

type CarInfoProps = {
  car: TCar;
};

const CheckOutCar = ({ car }: CarInfoProps) => {
  return (
    <section>
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 dark:text-gray-200">
        Car Information
      </h2>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img
          src={car?.image}
          alt={car?.brand}
          className="w-72 h-52 object-cover rounded-lg border-4 border-gray-300 dark:border-gray-700 shadow-lg"
        />
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {car?.brand} - {car?.model}
          </h3>
          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            <p className="text-gray-600 dark:text-gray-400 items-center flex gap-1">
              Price:
              <span className="font-semibold text-green-600 dark:text-gray-200 flex items-center gap-1">
                <TbCurrencyTaka className="text-xl font-bold" />
                {car?.price.toLocaleString()}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 flex gap-1">
              Category:
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {car?.category}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 flex gap-1">
              Year:
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {car?.year}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 flex gap-1">
              Made In:
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {car?.madeIn}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 flex gap-1">
              Condition:
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {car?.condition}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOutCar;
