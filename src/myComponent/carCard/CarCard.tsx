import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";

export type TCarCardProps = {
  _id: string;
  image: string;
  brand: string;
  model: string;
  year: string;
  price: number;
};

const CarCard = (car: TCarCardProps) => {
  const { brand, model, year, price, image, _id } = car;
  return (
    <div className="bg-[#f0f3f8] dark:bg-gray-900 font-inter rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl duration-500 p-3">
      <img
        src={image}
        alt={`${brand} ${model}`}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {brand} {model}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">{year}</p>
        <p className="text-xl flex items-center font-semibold text-deepRed dark:text-indigo-400 mt-2">
          <TbCurrencyTaka /> {price.toLocaleString()}
        </p>
      </div>
      <div className="mt-4">
        <Link
          to={`/details/${_id}`}
          className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
