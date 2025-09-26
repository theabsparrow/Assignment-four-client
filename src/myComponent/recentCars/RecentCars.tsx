import { useGetCarQuery } from "@/redux/features/car/carApi";
import CarCard from "../carCard/CarCard";
import AllCarsSkeleton from "../loader/AllCarsSkeleton";
import { TCarInfo } from "@/interface/carsInfo";

const RecentCars = () => {
  const query = { limit: 9 };
  const { data, isLoading } = useGetCarQuery(query);
  const cars = data?.data;
  if (isLoading) {
    return <AllCarsSkeleton />;
  }
  return (
    <section className="md:px-32 mt-16 space-y-5">
      <h1 className="text-4xl font-inter font-semibold text-center">
        Most recent car for sale{" "}
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
