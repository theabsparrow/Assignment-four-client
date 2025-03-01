import {
  useDeleteCarMutation,
  useGetCarQuery,
} from "@/redux/features/car/carApi";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";
import { years } from "../addCar/addcar.const";
import { initalState } from "@/pages/allCars/allCars.const";
import useGetAllCars from "@/hook/useGetAllCars";
import { TCarTable } from "./carListing.interface";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { sortingOrders, TValue } from "@/myComponent/formInput/formInput.const";

const CarListing = () => {
  const { carData } = useGetAllCars(["brand", "category"]) || [];
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState(initalState);
  const [sort, setSelectedSortingOrder] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [deleteCarId, setDeleteCarId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteCar] = useDeleteCarMutation();

  const queryParams = {
    fields: ["brand", "model", "category", "price", "year"],
    filter: filter || {},
    searchTerm: searchText || "",
    sort: sort || "",
    page: page || 1,
    limit: limit || 10,
  };

  const { data, isLoading } = useGetCarQuery(queryParams);
  const cars = data?.data?.result || [];

  const uniqueBrands = [...new Set(carData.map((car) => car.brand))];
  const uniqueCategories = [...new Set(carData.map((car) => car.category))];
  const meta = data?.data?.meta;
  const pageNumbers = Array.from({ length: meta?.totalPage }, (_, i) => i + 1);

  const handleFilterChange = (name: string, value: string) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setLimit(meta?.limit);
  };

  const handleDelete = (id: string) => {
    setDeleteCarId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteCarId(null);
  };

  const handelReset = () => {
    setFilter(initalState);
    setSearchText("");
    setSelectedSortingOrder("");
    setPage(1);
  };

  // delete functionality
  const confirmDelete = async () => {
    if (!deleteCarId) {
      return setErrorMessage("Faild to delete. Please try again letter");
    }
    const toastId = toast.loading("car data deleting.....");
    try {
      const id = deleteCarId;
      const res = await deleteCar({ id }).unwrap();
      if (res?.success) {
        toast.success("car data deleted successfully ", {
          id: toastId,
          duration: 3000,
        });
        setIsModalOpen(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const columns: ColumnDef<TCarTable>[] = [
    { accessorKey: "brand", header: "Brand" },
    { accessorKey: "model", header: "Model" },
    { accessorKey: "category", header: "Category" },
    {
      accessorKey: "price",
      header: "Price",
      cell: (info) => `৳${(info.getValue() as number).toLocaleString()}`,
    },
    { accessorKey: "year", header: "Year" },
    {
      header: "View",
      cell: ({ row }) => (
        <div>
          <Link
            to={`/details/${row.original?._id}`}
            className="px-2 py-1 bg-blue-500 text-white rounded font-inter"
          >
            Details
          </Link>
        </div>
      ),
    },
    {
      header: "Remove",
      cell: ({ row }) => (
        <div>
          <button
            onClick={() => handleDelete(row.original._id)}
            className="px-2 py-1 bg-red-500 text-white rounded font-inter"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  const table = useReactTable({
    data: cars,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading cars...</p>;

  return (
    <div className="container mx-auto p-4 font-inter">
      {isModalOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex items-center justify-center "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this car?
            </h3>
            {errorMessage && (
              <h1 className="text-red-600 text-sm text-center mb-4">
                {errorMessage}
              </h1>
            )}
            <div className="flex justify-end gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">Car Listings</h2>
        <h1 className="text-xl">Total cars: {cars.length}</h1>
      </div>

      {/* ✅ Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Brand or Model..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded outline-none"
        />

        {/* Filter: Brand */}
        <select
          value={filter.brand}
          onChange={(e) => {
            const value = e.target.value;
            handleFilterChange("brand", value);
          }}
          className="border p-2 rounded outline-none"
        >
          <option value="">All Brands</option>
          {uniqueBrands.map((brand, index) => (
            <option key={index} value={brand as string}>
              {brand as string}
            </option>
          ))}
        </select>

        {/* Filter: Category */}
        <select
          value={filter.category}
          onChange={(e) => {
            const value = e.target.value;
            handleFilterChange("category", value);
          }}
          className="border p-2 rounded outline-none"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category as string}>
              {category as string}
            </option>
          ))}
        </select>

        {/* Filter: Year */}
        <select
          value={filter.year}
          onChange={(e) => {
            const value = e.target.value;
            handleFilterChange("year", value);
          }}
          className="border p-2 rounded outline-none"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSelectedSortingOrder(e.target.value)}
          className="border p-2 rounded outline-none"
        >
          <option value="select category">Sort by</option>
          {sortingOrders.map((sortingOrder: TValue) => (
            <option
              key={sortingOrder.value}
              value={sortingOrder.value}
              className="dark:bg-gray-700"
            >
              {sortingOrder.label}
            </option>
          ))}
        </select>
        <div>
          <button
            onClick={handelReset}
            className="bg-secondary dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition "
          >
            Reset
          </button>
        </div>
      </div>

      {/* ✅ Table */}
      <div className="overflow-x-auto  md:w-[60vw]">
        <table className=" border-collapse border border-gray-300 w-full">
          {/* ✅ Table Head */}
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-2 border text-left cursor-pointer"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {/* Sort Indicator */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* ✅ Table Body */}
          <tbody className="text-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(meta.page - 1)}
          disabled={meta?.page === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <div>
          {pageNumbers.map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-lg font-semibold border
              ${
                meta?.page === pageNumber
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }
            `}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(meta.page + 1)}
          disabled={meta?.page === meta.totalPage}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CarListing;
