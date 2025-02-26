import { TCarInfo } from "@/interface/carsInfo";
import Sceleton from "@/myComponent/loader/Sceleton";
import { useGetCarQuery } from "@/redux/features/car/carApi";
import { LuArrowUpDown } from "react-icons/lu";
import AllCarsCard from "./allCarsCard";
import { useState } from "react";
import { exTractModel } from "@/utills/extraxt.model";
import ReactRangeSliderInput from "react-range-slider-input";
import { TbCurrencyTaka } from "react-icons/tb";
import { years } from "../dashboard/admin/addCar/addcar.const";
import {
  conditions,
  sortingOrders,
  TValue,
} from "@/myComponent/formInput/formInput.const";
import Pagination from "@/myComponent/pagination/Pagination";
import { initalState } from "./allCars.const";

const AllCars = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] =
    useState<string>("select brand first");
  const [selectedYear, setSelectedYear] = useState<string>("select year");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("select category");
  const [selectedCondition, setSelectedCondition] =
    useState<string>("select condition");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    1, 100000000,
  ]);

  const [searchTerm, setSearch] = useState("");
  const [filter, setFilter] = useState(initalState);
  const [sort, setSelectedSortingOrder] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const queryParams = {
    fields: [
      "brand",
      "model",
      "price",
      "year",
      "image",
      "category",
      "condition",
    ],
    filter: filter || {},
    searchTerm: searchTerm || "",
    sort: sort || "",
    page: page || 1,
    limit: limit || 10,
  };
  const { data, isLoading } = useGetCarQuery(queryParams);
  const cars = data?.data?.result || [];
  const brands: string[] =
    cars.length > 1
      ? Array.from(
          new Set(cars.map((car: Partial<TCarInfo>) => car.brand as string))
        )
      : [];

  const categories: string[] =
    cars.length > 1
      ? Array.from(
          new Set(cars.map((car: Partial<TCarInfo>) => car.category as string))
        )
      : [];

  const models: Record<string, string[]> =
    cars.length > 1 ? exTractModel(cars) : {};
  const meta = data?.data?.meta;

  const handelReset = () => {
    setFilter(initalState);
    setSearch("");
    setSelectedSortingOrder("");
    setPage(1);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === "brand") {
      setSelectedBrand(e.target.value);
    }
    if (e.target.name === "model") {
      setSelectedModel(e.target.value);
    }
    if (e.target.name === "year") {
      setSelectedYear(e.target.value);
    }
    if (e.target.name === "category") {
      setSelectedCategory(e.target.value);
    }
    if (e.target.name === "condition") {
      setSelectedCondition(e.target.value);
    }
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    setFilter((prevFilters) => ({
      ...prevFilters,
      minPrice: newRange[0],
      maxPrice: newRange[1],
    }));
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    setLimit(meta.limit);
  };

  if (isLoading) {
    return <Sceleton></Sceleton>;
  }
  return (
    <>
      <div className="bg-[#f0f3f8] dark:bg-gray-700 md:px-32 font-inter relative">
        <div className="flex items-center justify-between py-5 sticky top-[76px] z-20 bg-[#f0f3f8] dark:bg-gray-700">
          <h1 className="text-2xl font-semibold">
            <span className="text-secondary p-2 rounded-lg">{cars.length}</span>{" "}
            cars for sale
          </h1>
          <div>
            <Pagination meta={meta} handlePageChange={handlePageChange} />
          </div>
          <p className=" flex items-center gap-1">
            Newest first <LuArrowUpDown />
          </p>
        </div>

        <div className="flex justify-between items-start gap-5">
          {/* left side */}
          <div className="sticky top-32 z-10 bg-white dark:bg-gray-900 shadow-lg px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <input
                type="text"
                placeholder="Search items"
                className="p-2 border rounded-lg shadow-sm bg-[#f0f3f8] dark:bg-gray-700 outline-cyan-400"
                value={searchTerm}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={handelReset}
                className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
              >
                Reset
              </button>
            </div>

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-4">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Filter by Brand :
              </h1>
              <select
                value={selectedBrand}
                name="brand"
                onChange={handleFilterChange}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="All">Select brand</option>
                {brands.map((brand) => (
                  <option
                    key={brand}
                    value={brand}
                    className="dark:bg-gray-700"
                  >
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-4">
              <h1 className="text-gray-500 dark:text-gray-300 font-medium ">
                Filter by Model :
              </h1>
              <select
                value={selectedModel}
                name="model"
                onChange={handleFilterChange}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="select brand first">Select brand first</option>
                {models[selectedBrand]?.map((model) => (
                  <option
                    key={model}
                    value={model}
                    className="dark:bg-gray-700"
                  >
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-4">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Filter by Year :
              </h1>
              <select
                value={selectedYear}
                name="year"
                onChange={handleFilterChange}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="select year">Select year</option>
                {years.map((years) => (
                  <option
                    key={years}
                    value={years}
                    className="dark:bg-gray-700"
                  >
                    {years}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-4">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Filter by Category :
              </h1>
              <select
                value={selectedCategory}
                name="category"
                onChange={handleFilterChange}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="select category">Select Category</option>
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="dark:bg-gray-700"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-4">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Filter by Conditon :
              </h1>
              <select
                value={selectedCondition}
                name="condition"
                onChange={handleFilterChange}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="select condition">Select condition</option>
                {conditions.map((condition: TValue) => (
                  <option
                    key={condition.value}
                    value={condition.value}
                    className="dark:bg-gray-700"
                  >
                    {condition.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-4">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Sort by :
              </h1>
              <select
                value={sort}
                onChange={(e) => setSelectedSortingOrder(e.target.value)}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="select category">Select an option</option>
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
            </div>

            <div className="md:w-full text-gray-500 dark:text-gray-300 font-semibold bg-[#f0f3f8] dark:bg-gray-700 p-4">
              <div className="flex items-center mb-3 md:gap-3">
                <h2 className="text-sm md:font-semibold">PRICE RANGE : </h2>
                <p className="font-bold text-black dark:text-white flex items-center">
                  <TbCurrencyTaka className="text-lg" />{" "}
                  {priceRange[0].toLocaleString()}
                </p>{" "}
                <p className="text-sm">TO</p>{" "}
                <p className="font-bold text-black dark:text-white flex items-center">
                  <TbCurrencyTaka className="text-lg" />{" "}
                  {priceRange[1].toLocaleString()}
                </p>
              </div>
              <ReactRangeSliderInput
                min={1}
                max={100000000}
                step={50000}
                value={priceRange}
                onInput={handlePriceRangeChange}
                className="w-full"
              />
            </div>
          </div>
          {/* right side */}
          <div className=" space-y-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cars.map((car: Partial<TCarInfo>) => (
                <AllCarsCard key={car._id} {...car}></AllCarsCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCars;
