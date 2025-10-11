import { useGetAllcarListQuery } from "@/redux/features/car/carApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentFilter, setPage } from "@/redux/features/car/carSlice";
import Pagination from "@/myComponent/pagination/Pagination";
import { carTableColumns } from "./carTableColumn";
import Table from "@/myComponent/table/Table";
import { TCarInfo } from "@/interface/carInterface/car.interface";
import CarListFiltering from "./CarListFiltering";
import FilterSkeleton from "@/myComponent/loader/FilterSkeleton";
import TableSceleton from "@/myComponent/loader/TableSceleton";

const CarListing = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(currentFilter);
  const { data, isLoading } = useGetAllcarListQuery(query);
  const { meta, result, models, totalCar, maxPrice, minPrice } =
    data?.data || {};
  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };
  const column = carTableColumns();
  if (isLoading)
    return (
      <section>
        <FilterSkeleton />
        <TableSceleton rows={11} columns={9} />
      </section>
    );

  return (
    <>
      {!(result as TCarInfo[])?.length && (
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-r from-pink-100 to-blue-100 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            No cars Available Right Now
          </h1>
        </div>
      )}
      <section className=" px-2 font-inter space-y-6 ">
        <CarListFiltering
          models={models}
          total={totalCar}
          maxPrice={maxPrice}
          minPrice={minPrice}
        />
        <div className=" w-full ">
          <Table data={result} columns={column} />
          {result?.length > 0 && (
            <div className="mt-8 md:mt-10">
              <Pagination meta={meta} handlePageChange={handlePageChange} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CarListing;
