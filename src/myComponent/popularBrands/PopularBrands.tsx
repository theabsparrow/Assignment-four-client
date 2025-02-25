import { useGetCarQuery } from "@/redux/features/car/carApi";
import BodyTypeLoader from "../loader/BodyTypeLoader";
import PopularBrandCards, { TBrandCardProps } from "./PopularBrandCards";

const PopularBrands = () => {
  const queryParams = {
    fields: ["brand", "carBrandLogo"],
  };
  const { data, isLoading } = useGetCarQuery(queryParams);
  const cars: TBrandCardProps[] = data?.data?.result || [];
  const brands =
    cars.length > 1
      ? Array.from(
          cars
            .reduce((map, car) => {
              if (!map.has(car.brand)) {
                map.set(car.brand, car);
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
    <div className="md:px-32 mt-16 space-y-5 bg-[#f0f3f8] py-10">
      <h1 className="text-4xl font-inter font-semibold text-center">
        Popular Brands
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-8 gap-5">
        {brands.map((car: TBrandCardProps) => (
          <PopularBrandCards key={car._id} {...car}></PopularBrandCards>
        ))}
      </div>
    </div>
  );
};

export default PopularBrands;
