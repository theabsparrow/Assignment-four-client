import { TCarInfo } from "@/interface/carsInfo";
import AllCarsCard from "@/pages/allCars/allCarsCard";
import { useGetCarQuery } from "@/redux/features/car/carApi";
import HorizontalCardSceleton from "../loader/HorizontalCardSceleton";

const SameBrandCar = ({ brand }: { brand: string }) => {
  const queryParams = {
    brand: brand,
  };
  const { data, isLoading } = useGetCarQuery(queryParams);
  const cars = data?.data?.result;

  return (
    <section className="my-10 px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b pb-2 border-gray-300 dark:border-gray-700">
        More Cars From {brand} brand
      </h2>
      {isLoading ? (
        <HorizontalCardSceleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {cars?.map((car: Partial<TCarInfo>) => (
            <AllCarsCard key={car._id} {...car} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SameBrandCar;
