import { useGetCarQuery } from "@/redux/features/car/carApi";
import HorizontalCardSceleton from "../loader/HorizontalCardSceleton";
import { TCarInfo } from "@/interface/carsInfo";
import Marquee from "react-fast-marquee";
import SameCategoryCard from "./SameCategoryCard";

const SameCategoryCar = ({
  category,
  carId,
}: {
  category: string;
  carId: string;
}) => {
  const queryParams = {
    category: category,
    inStock: true,
  };
  const { data, isLoading } = useGetCarQuery(queryParams);
  const cars = data?.data?.result;

  return (
    <section className="my-10 px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b pb-2 border-gray-300 dark:border-gray-700">
        More Cars From {category} category
      </h2>
      {isLoading ? (
        <HorizontalCardSceleton />
      ) : (
        <>
          {cars.length > 1 ? (
            <div className="flex justify-center items-center gap-4 md:gap-6">
              {" "}
              <Marquee>
                {cars
                  .filter((car: TCarInfo) => car._id !== carId)
                  .map((car: Partial<TCarInfo>) => (
                    <div key={car._id} className="mx-2 md:w-64">
                      {" "}
                      <SameCategoryCard {...car} />
                    </div>
                  ))}
              </Marquee>
            </div>
          ) : (
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 flex justify-center">
              no car is available for this category
            </h1>
          )}
        </>
      )}
    </section>
  );
};

export default SameCategoryCar;
