import { TCarInfo } from "@/interface/carsInfo";
import Sceleton from "@/myComponent/loader/Sceleton";
import { useGetCarQuery } from "@/redux/features/car/carApi";
import { LuArrowUpDown } from "react-icons/lu";
import { useState } from "react";

import Pagination from "@/myComponent/pagination/Pagination";
import { initalState } from "./allCars.const";
import CarCard from "@/myComponent/carCard/CarCard";
import AllcarsFiltering from "./AllcarsFiltering";

const AllCars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(initalState);
  const [sort, setSort] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const query = { ...filter, searchTerm, sort, page };
  const { data, isLoading } = useGetCarQuery(query);
  const { meta, result, models, totalCar } = data?.data || {};

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isLoading) {
    return <Sceleton></Sceleton>;
  }

  return (
    <section className="bg-[#f0f3f8] dark:bg-gray-700 px-2 lg:px-16 font-inter relative pb-4 flex flex-col lg:flex-row justify-center lg:justify-between lg:items-start lg:gap-5">
      <AllcarsFiltering
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sort={sort}
        setSort={setSort}
        setPage={setPage}
        models={models}
        total={totalCar}
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
            {result?.map((car: Partial<TCarInfo>) => (
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
