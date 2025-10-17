import { useGetcarBrandQuery } from "@/redux/features/car/carApi";
import PopularBrandCards, { TBrandCardProps } from "./PopularBrandCards";
import { Link } from "react-router-dom";
import AllBrandSkeleton from "../loader/AllBrandSkeleton";

const PopularBrands = () => {
  const query = { limit: "8" };
  const { data, isLoading } = useGetcarBrandQuery(query);
  const brands = data?.data || {};
  if (isLoading) {
    return <AllBrandSkeleton value={8} />;
  }
  return (
    <div className="px-2 lg:px-16 space-y-5 font-inter">
      <h1 className="text-4xl  font-semibold text-center">Popular Brands</h1>
      <div className="grid grid-cols-1 md:grid-cols-8 gap-5">
        {brands.map((brand: TBrandCardProps, i: number) => (
          <PopularBrandCards key={i} {...brand} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          className=" mx-auto px-4 py-2 rounded-md bg-white hover:bg-secondary text-secondary hover:text-white duration-700 font-bold dark:bg-gray-700"
          to="/all-brands"
        >
          See All Brands
        </Link>
      </div>
    </div>
  );
};

export default PopularBrands;
