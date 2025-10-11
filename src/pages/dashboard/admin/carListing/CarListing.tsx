import { useGetAllcarListQuery } from "@/redux/features/car/carApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentFilter, setPage } from "@/redux/features/car/carSlice";
import Pagination from "@/myComponent/pagination/Pagination";
import AllCarsSkeleton from "@/myComponent/loader/AllCarsSkeleton";
import { carTableColumns } from "./carTableColumn";
import Table from "@/myComponent/table/Table";

const CarListing = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(currentFilter);
  const { data, isLoading } = useGetAllcarListQuery(query);
  const { meta, result, models, totalCar, maxPrice, minPrice } =
    data?.data || {};
  console.log(result);
  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };
  const column = carTableColumns();
  if (isLoading) return <AllCarsSkeleton />;

  return (
    <section className="bg-[#f0f3f8] dark:bg-gray-700 px-4 font-inter ">
      <div className=" w-full">
        <Table data={result} columns={column} />
        {result?.length > 0 && (
          <div className="mt-5">
            <Pagination meta={meta} handlePageChange={handlePageChange} />
          </div>
        )}
      </div>
    </section>
  );
};

export default CarListing;
