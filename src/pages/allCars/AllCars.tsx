import { TCarInfo } from "@/interface/carsInfo";
import Sceleton from "@/myComponent/loader/Sceleton";
import { useGetCarQuery } from "@/redux/features/car/carApi";
import { LuArrowUpDown } from "react-icons/lu";
import AllCarsCard from "./allCarsCard";
import { useEffect, useMemo, useState } from "react";
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
import { IoMdArrowDropdown } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const AllCars = () => {
  // const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialMinPrice = Number(searchParams.get("minPrice")) || 1;
  const initialMaxPrice = Number(searchParams.get("maxPrice")) || 100000000;
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialMinPrice,
    initialMaxPrice,
  ]);
  const [searchTerm, setSearch] = useState("");
  const [filter, setFilter] = useState(initalState);
  const [sort, setSelectedSortingOrder] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [open, setOpen] = useState<boolean>(false);
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

  const brands = useMemo<string[]>(() => {
    if (isLoading || !data?.data?.result) return [];
    return Array.from(
      new Set(
        data.data.result.map((car: Partial<TCarInfo>) => car.brand as string)
      )
    );
  }, [isLoading, data]);

  const categories = useMemo<string[]>(() => {
    if (isLoading || !data?.data?.result) return [];
    return Array.from(
      new Set(
        data.data.result.map((car: Partial<TCarInfo>) => car.category as string)
      )
    );
  }, [isLoading, data]);

  const models = useMemo<Record<string, string[]>>(() => {
    if (isLoading || !data?.data?.result) return {};
    return exTractModel(data.data.result);
  }, [isLoading, data]);

  const meta = data?.data?.meta;

  useEffect(() => {
    if (!brands.includes(filter.brand)) {
      setFilter((prev) => ({ ...prev, brand: "" }));
    }
  }, [brands]);

  const handleFilterChange = (name: string, value: string) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
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

  const handelReset = () => {
    setFilter(initalState);
    setSearch("");
    setSelectedSortingOrder("");
    setPage(1);
    setPriceRange([1, 100000000]);
  };

  useEffect(() => {
    const brand = searchParams.get("brand") || "";
    const model = searchParams.get("model") || "";
    const category = searchParams.get("category") || "";
    const minPrice = initialMinPrice;
    const maxPrice = initialMaxPrice;
    setFilter((prev) => ({
      ...prev,
      brand,
      model,
      category,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
    }));
  }, [searchParams]);

  if (isLoading) {
    return <Sceleton></Sceleton>;
  }

  return (
    <>
      <div className="bg-[#f0f3f8] dark:bg-gray-700 md:px-32 font-inter relative">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-center md:justify-between py-2 md:py-5 sticky top-[70px] md:top-[76px] z-20 bg-[#f0f3f8] dark:bg-gray-700 ">
          <h1 className="text-xl md:text-2xl font-semibold flex justify-between gap-16">
            {cars.length} cars for sale
            {/* mobile respondive only */}
            <span className="md:hidden flex items-center gap-1 text-sm">
              Newest first <LuArrowUpDown />
            </span>
          </h1>
          <div className="hidden md:block">
            <Pagination meta={meta} handlePageChange={handlePageChange} />
          </div>
          <p className="hidden md:flex items-center gap-1 ">
            Newest first <LuArrowUpDown />
          </p>
        </div>

        {/* mobile responsive starts */}
        <div className="md:hidden block sticky top-[115px] z-10 bg-white dark:bg-gray-900 shadow-lg px-4 py-2 space-y-4 max-h-[80vh] overflow-y-auto">
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
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 duration-500"
            >
              Reset
            </button>
          </div>
        </div>
        {!open && (
          <IoMdArrowDropdown
            onClick={() => setOpen(!open)}
            className="text-4xl text-secondary mx-auto -mt-3 md:hidden"
          />
        )}
        {open && (
          <div className="block md:hidden sticky top-[172px] z-20">
            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-2">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Filter Brand :
              </h1>
              <select
                value={filter.brand}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilter((prev) => ({ ...prev, brand: value }));
                  handleFilterChange("brand", value);
                }}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="select brand">Select brand</option>
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

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700  p-2">
              <h1 className="text-gray-500 dark:text-gray-300 font-medium ">
                Filter Model :
              </h1>
              <select
                value={filter.model}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilter((prev) => ({ ...prev, model: value }));
                  handleFilterChange("model", value);
                }}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="select brand first">Select brand first</option>
                {models[filter.brand]?.map((model) => (
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

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-2">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Filter Year :
              </h1>
              <select
                value={filter.year}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilter((prev) => ({ ...prev, year: value }));
                  handleFilterChange("year", value);
                }}
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

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-2">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Filter Category :
              </h1>
              <select
                value={filter.category}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilter((prev) => ({ ...prev, category: value }));
                  handleFilterChange("category", value);
                }}
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

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-2">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Filter Conditon :
              </h1>
              <select
                value={filter.condition}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilter((prev) => ({ ...prev, condition: value }));
                  handleFilterChange("condition", value);
                }}
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

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-2">
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

            <div className="md:w-full text-gray-500 dark:text-gray-300 font-semibold bg-[#f0f3f8] dark:bg-gray-700 p-2">
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
              <IoMdArrowDropdown
                onClick={() => setOpen(!open)}
                className="text-4xl text-secondary mx-auto "
              />
            </div>
          </div>
        )}
        {/* mobile responsive ends */}

        <div className="flex justify-between items-start gap-5">
          {/* left side */}
          <div className="hidden md:block sticky top-32 z-10 bg-white dark:bg-gray-900 shadow-lg px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
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
                className="bg-secondary dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition "
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
                value={filter.brand}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilter((prev) => ({ ...prev, brand: value }));
                  handleFilterChange("brand", value);
                }}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="select brand">Select brand</option>
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
                value={filter.model}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilter((prev) => ({ ...prev, model: value }));
                  handleFilterChange("model", value);
                }}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="select brand first">Select brand first</option>
                {models[filter.brand]?.map((model) => (
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
                value={filter.year}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilter((prev) => ({ ...prev, year: value }));
                  handleFilterChange("year", value);
                }}
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
                value={filter.category}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilter((prev) => ({ ...prev, category: value }));
                  handleFilterChange("category", value);
                }}
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
                value={filter.condition}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilter((prev) => ({ ...prev, condition: value }));
                  handleFilterChange("condition", value);
                }}
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
                min={initialMinPrice}
                max={initialMaxPrice}
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
        <div className="block md:hidden mt-5">
          <Pagination meta={meta} handlePageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
};

export default AllCars;
