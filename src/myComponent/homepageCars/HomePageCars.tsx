import { useGetCarQuery } from "@/redux/features/car/carApi";
import CarCard, { TCarCardProps } from "../carCard/CarCard";
import Sceleton from "../loader/Sceleton";

const HomePageCars = () => {
  const queryParams = {
    fields: ["brand", "model", "price", "year", "image"],
    limit: "12",
  };
  const { data, isLoading } = useGetCarQuery(queryParams);
  const cars = data?.data?.result || [];
  if (isLoading) {
    return <Sceleton></Sceleton>;
  }
  return (
    <>
      <div className="md:px-32 mt-16 space-y-5">
        <h1 className="text-4xl font-inter font-semibold text-center">
          Most recent car for sale{" "}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {cars.map((car: TCarCardProps) => (
            <CarCard key={car._id} {...car}></CarCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePageCars;
