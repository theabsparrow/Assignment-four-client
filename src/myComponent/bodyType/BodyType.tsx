import { useGetcarCategoryQuery } from "@/redux/features/car/carApi";
import BodyTypeCard, { TBodyTypeProps } from "./BodyTypeCard";
import BodyTypeLoader from "../loader/BodyTypeLoader";
import { Link } from "react-router-dom";

const BodyType = () => {
  const query = { limit: "8" };
  const { data, isLoading } = useGetcarCategoryQuery(query);
  const categories = data?.data || {};

  if (isLoading) {
    return <BodyTypeLoader />;
  }

  return (
    <div className="px-2 lg:px-16 space-y-5">
      <h1 className="text-4xl font-inter font-semibold text-center">
        Body Type
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-8 gap-5">
        {categories.map((car: TBodyTypeProps, i: number) => (
          <BodyTypeCard key={i} {...car} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          className=" mx-auto px-4 py-2 rounded-md bg-white hover:bg-secondary text-secondary hover:text-white duration-700 font-bold dark:bg-gray-700"
          to="/all-category"
        >
          See All Body Type
        </Link>
      </div>
    </div>
  );
};

export default BodyType;
