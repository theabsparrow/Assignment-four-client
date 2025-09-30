import { TCarInfo } from "@/interface/carInterface/car.interface";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";

const CarCard = (car: Partial<TCarInfo>) => {
  const { brand, model, year, price, image, _id, category, condition } = car;
  return (
    <section className="bg-[#f0f3f8] dark:bg-gray-900 font-inter rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl duration-500 p-3 flex flex-col justify-between">
      <div className=" overflow-hidden rounded-lg">
        <img
          src={image}
          alt={`${brand} ${model}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="mt-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {brand} {model} ({category})
          </h2>
          <p className="text-gray-500 dark:text-gray-400 flex items-center justify-between">
            {year} ({condition})
          </p>
          <p className="text-xl flex items-center font-semibold text-deepRed dark:text-indigo-400 mt-2">
            <TbCurrencyTaka /> {price!.toLocaleString()}
          </p>
        </div>
        <div className="mt-4">
          <Link
            to={`/details/${_id}`}
            className="w-full bg-secondary dark:bg-gray-500 dark:text-gray-200 dark:hover:bg-secondary duration-500 text-white font-bold p-2 rounded-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CarCard;
