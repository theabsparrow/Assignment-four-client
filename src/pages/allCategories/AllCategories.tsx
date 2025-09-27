import { useGetcarCategoryQuery } from "@/redux/features/car/carApi";
import AllCategoryBanner from "./AllCategoryBanner";
import BodyTypeCard, {
  TBodyTypeProps,
} from "@/myComponent/bodyType/BodyTypeCard";
import AllBrandSkeleton from "@/myComponent/loader/AllBrandSkeleton";

const AllCategories = () => {
  const query = { limit: "" };
  const { data, isLoading } = useGetcarCategoryQuery(query);
  const categories = data?.data || {};

  return (
    <>
      <AllCategoryBanner />
      {isLoading ? (
        <AllBrandSkeleton />
      ) : (
        <section className="px-2 lg:px-16 space-y-5 bg-[#f0f3f8] py-10 font-inter">
          <h1 className="text-4xl font-inter font-semibold text-center">
            All Body Types of Cars
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-8 gap-5">
            {categories.map((car: TBodyTypeProps, i: number) => (
              <BodyTypeCard key={i} {...car} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default AllCategories;
