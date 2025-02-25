import { useGetCarQuery } from "@/redux/features/car/carApi";
import BodyTypeCard, { TBodyTypeProps } from "./BodyTypeCard";
import BodyTypeLoader from "../loader/BodyTypeLoader";

const BodyType = () => {
  const queryParams = {
    fields: ["category", "image"],
  };
  const { data, isLoading } = useGetCarQuery(queryParams);
  const cars: TBodyTypeProps[] = data?.data?.result || [];
  const categories =
    cars.length > 1
      ? Array.from(
          cars
            .reduce((map, car) => {
              if (!map.has(car.category)) {
                map.set(car.category, car);
              }
              return map;
            }, new Map())
            .values()
        ).slice(0, 8)
      : [];
  if (isLoading) {
    return <BodyTypeLoader></BodyTypeLoader>;
  }
  return (
    <div className="md:px-32 mt-16 space-y-5">
      <h1 className="text-4xl font-inter font-semibold text-center">
        Body Type
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-8 gap-5">
        {categories.map((car: TBodyTypeProps) => (
          <BodyTypeCard key={car._id} {...car}></BodyTypeCard>
        ))}
      </div>
    </div>
  );
};

export default BodyType;
