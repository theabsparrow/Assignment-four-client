import BodyTypeLoader from "@/myComponent/loader/BodyTypeLoader";
import AllBrandsBanner from "./AllBrandsBanner";
import { useGetCarQuery } from "@/redux/features/car/carApi";
import PopularBrandCards, {
  TBrandCardProps,
} from "@/myComponent/popularBrands/PopularBrandCards";

const AllBrands = () => {
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
        )
      : [];
  if (isLoading) {
    return <BodyTypeLoader></BodyTypeLoader>;
  }
  return (
    <>
      <AllBrandsBanner />
      <div className="md:px-32 mt-16 space-y-5 bg-[#f0f3f8] py-10 font-inter">
        <h1 className="text-4xl  font-semibold text-center">
          All Car Brands in Bnagladesh
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-8 gap-5">
          {brands.map((car: TBrandCardProps) => (
            <PopularBrandCards key={car._id} {...car}></PopularBrandCards>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllBrands;
