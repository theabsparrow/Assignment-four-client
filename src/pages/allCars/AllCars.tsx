import { useGetCarQuery } from "@/redux/features/car/carApi";
import { LuArrowUpDown } from "react-icons/lu";
import Pagination from "@/myComponent/pagination/Pagination";
import CarCard from "@/myComponent/carCard/CarCard";
import AllcarsFiltering from "./AllcarsFiltering";
import AllCarsSkeleton from "@/myComponent/loader/AllCarsSkeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentFilter, setPage } from "@/redux/features/car/carSlice";
import { TCarInfo } from "@/interface/carInterface/car.interface";

const AllCars = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(currentFilter);
  const { data, isLoading } = useGetCarQuery(query);
  const { meta, result, models, totalCar, maxPrice, minPrice } =
    data?.data || {};

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  if (isLoading) {
    return <AllCarsSkeleton />;
  }

  return (
    <section className="bg-[#f0f3f8] dark:bg-gray-700 px-2 lg:px-16 font-inter relative pb-4 flex flex-col lg:flex-row justify-center lg:justify-between lg:items-start lg:gap-5">
      <AllcarsFiltering
        models={models}
        total={totalCar}
        maxPrice={maxPrice}
        minPrice={minPrice}
      />
      <div>
        <div className=" py-2 sticky top-[70px] lg:top-[76px] z-20 bg-[#f0f3f8] dark:bg-gray-700 space-y-1 ">
          <h1 className="text-xl font-medium flex justify-between lg:justify-center lg:items-center gap-16 ">
            {result?.length} cars in this page
            <span className="lg:hidden flex items-center gap-1 text-sm">
              Newest first <LuArrowUpDown />
            </span>
          </h1>
        </div>
        <div className=" space-y-4 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {result?.map((car: TCarInfo) => (
              <CarCard key={car._id} {...car} />
            ))}
          </div>
        </div>
        {result?.length > 0 && (
          <div className="mt-5">
            <Pagination meta={meta} handlePageChange={handlePageChange} />
          </div>
        )}
      </div>
    </section>
  );
};

export default AllCars;
