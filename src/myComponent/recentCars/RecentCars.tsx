import { useGetCarQuery } from "@/redux/features/car/carApi";
import CarCard from "../carCard/CarCard";
import AllCarsSkeleton from "../loader/AllCarsSkeleton";
import { TCarInfo } from "@/interface/carsInfo";
import { useAppSelector } from "@/redux/hooks";
import { currentFilter } from "@/redux/features/car/carSlice";
import { TInitialState } from "@/redux/features/car/carSlice.type";

const RecentCars = () => {
  const reduxQuery = useAppSelector(currentFilter);
  const query = { ...reduxQuery, limit: "9" };
  const { data, isLoading } = useGetCarQuery(query as TInitialState);
  const cars = data?.data;
  if (isLoading) {
    return <AllCarsSkeleton />;
  }
  return (
    <section className="px-2 lg:px-16 space-y-5">
      <h1 className="text-4xl font-inter font-semibold text-center">
        Recent cars
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {cars.map((car: Partial<TCarInfo>) => (
          <CarCard key={car._id} {...car} />
        ))}
      </div>
    </section>
  );
};

export default RecentCars;
