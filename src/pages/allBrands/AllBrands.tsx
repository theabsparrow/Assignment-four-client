import AllBrandsBanner from "./AllBrandsBanner";

import PopularBrandCards, {
  TBrandCardProps,
} from "@/myComponent/popularBrands/PopularBrandCards";
import { useGetcarBrandQuery } from "@/redux/features/car/carApi";
import AllBrandSkeleton from "@/myComponent/loader/AllBrandSkeleton";

const AllBrands = () => {
  const query = { limit: "" };
  const { data, isLoading } = useGetcarBrandQuery(query);
  const brands = data?.data || {};
  if (isLoading) {
    return <AllBrandSkeleton value={24} />;
  }
  return (
    <>
      <AllBrandsBanner />
      <section className="px-2 lg:px-16 space-y-5 bg-[#f0f3f8] py-10 font-inter">
        <h1 className="text-4xl  font-semibold text-center">
          All Car Brands in Bnagladesh
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-8 gap-5">
          {brands.map((car: TBrandCardProps, i: number) => (
            <PopularBrandCards key={i} {...car}></PopularBrandCards>
          ))}
        </div>
      </section>
    </>
  );
};

export default AllBrands;
