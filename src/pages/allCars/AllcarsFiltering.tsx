import { useEffect, useRef, useState } from "react";
import {
  carBrands,
  carCategories,
  condition,
  years,
} from "../dashboard/admin/addCar/addcar.const";
import {
  TCarBrand,
  TCategory,
  TCondition,
} from "../dashboard/admin/addCar/addcar.interface";
import { sortingOrders, TValue } from "@/myComponent/formInput/formInput.const";
import { TbCurrencyTaka } from "react-icons/tb";
import ReactRangeSliderInput from "react-range-slider-input";
import { TInitialState } from "./allCars.types";
import { initalState } from "./allCars.const";
import { useSearchParams } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { RxCross1 } from "react-icons/rx";

type TFilterProps = {
  filter: TInitialState;
  setFilter: React.Dispatch<React.SetStateAction<TInitialState>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  models: string[];
  total: number;
};

const AllcarsFiltering = ({
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
  sort,
  setSort,
  setPage,
  models,
  total,
}: TFilterProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const initialMinPrice = Number(searchParams.get("minPrice")) || 1;
  const initialMaxPrice = Number(searchParams.get("maxPrice")) || 100000000;
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialMinPrice,
    initialMaxPrice,
  ]);

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

  const handleSoldCars = (name: string, value: string) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handelReset = () => {
    setFilter(initalState);
    setSearchTerm("");
    setSort("");
    setPage(1);
    setPriceRange([1, 100000000]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleGlobalDropdownOpen = () => {
      setIsOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("dropdown-open", handleGlobalDropdownOpen);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("dropdown-open", handleGlobalDropdownOpen);
    };
  }, []);
  console.log(isOpen);
  return (
    <section ref={filterRef} className="sticky top-20 z-30">
      <div className="lg:hidden  bg-white dark:bg-gray-900 shadow-lg px-4 py-2 space-y-4 max-h-[80vh] overflow-y-auto">
        <div className="">
          <div className="flex items-center justify-between ">
            <input
              type="text"
              placeholder="Search items"
              className="p-2 border rounded-lg shadow-sm bg-[#f0f3f8] dark:bg-gray-700 outline-cyan-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handelReset}
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 duration-500"
            >
              Reset
            </button>
          </div>
          <div className=" px-4 mt-1  md:hidden">
            <button
              onClick={() => handleSoldCars("inStock", "no")}
              className="bg-secondary dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold px-2 py-1 rounded-md duration-500 transition "
            >
              see sold cars
            </button>
          </div>
        </div>
        {open && (
          <div className=" md:hidden ">
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
                <option value="">Select brand</option>
                {carBrands.map((brand: TCarBrand) => (
                  <option
                    key={brand}
                    value={brand as string}
                    className="dark:bg-gray-700"
                  >
                    {brand as string}
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
                <option value="">Select brand first</option>
                {models?.map((model: string) => (
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
                <option value="">Select year</option>
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
                  handleFilterChange("category", value);
                }}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="">All Categories</option>
                {carCategories.map((category: TCategory) => (
                  <option
                    key={category}
                    value={category as string}
                    className="dark:bg-gray-700"
                  >
                    {category as string}
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
                  handleFilterChange("condition", value);
                }}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value=""></option>
                {condition.map((con: TCondition) => (
                  <option key={con} value={con} className="dark:bg-gray-700">
                    {con}
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
                onChange={(e) => setSort(e.target.value)}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="select category">Select an option</option>
                {sortingOrders.map((sortingOrder: TValue) => (
                  <option
                    key={sortingOrder.value as string}
                    value={sortingOrder.value as string}
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
            </div>
          </div>
        )}
        <div className="md:hidden ">
          <IoMdArrowDropdown
            onClick={() => setOpen(!open)}
            className="text-4xl text-secondary mx-auto "
          />
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="hidden lg:flex items-center gap-2 "
      >
        <SlidersHorizontal className="w-5 h-5" />
        Filters
      </Button>

      {isOpen && (
        <div className="hidden lg:flex flex-col fixed top-[77px] left-0 bg-white dark:bg-gray-900 shadow-lg px-4 py-4 space-y-3 overflow-y-auto h-[625px] rounded-b-lg">
          <h1 className="text-xl md:text-2xl font-semibold ">
            Total {total} cars for sale
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-2 cursor-pointer hover:scale-110 duration-500 "
          >
            <RxCross1 className="text-2xl" />
          </button>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <button
                  onClick={() => handleSoldCars("inStock", "no")}
                  className="bg-secondary dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-secondary text-white px-2 py-1 rounded-md duration-500 transition "
                >
                  See sold cars
                </button>
              </div>
              <button
                onClick={handelReset}
                className="bg-secondary dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-secondary text-white px-2 py-1 rounded-md duration-500 transition "
              >
                Reset
              </button>
            </div>

            <div className="flex items-center justify-between">
              <input
                type="text"
                placeholder="Search items"
                className="px-2 py-1 border rounded-lg shadow-sm bg-[#f0f3f8] dark:bg-gray-700 outline-cyan-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-3">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Brand :
              </h1>
              <select
                value={filter.brand}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilter((prev) => ({ ...prev, brand: value }));
                  setFilter((prev) => ({ ...prev, model: "" }));

                  handleFilterChange("brand", value);
                }}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="">Select brand</option>
                {carBrands.map((brand: TCarBrand) => (
                  <option
                    key={brand}
                    value={brand as string}
                    className="dark:bg-gray-700"
                  >
                    {brand as string}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-3">
              <h1 className="text-gray-500 dark:text-gray-300 font-medium ">
                Model :
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
                <option value="">Select brand first</option>
                {models?.map((model: string) => (
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

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-3">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Year :
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
                <option value="">Select year</option>
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

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-3">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Category :
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
                <option value="">Select Category</option>
                {carCategories.map((category: TCategory) => (
                  <option
                    key={category}
                    value={category as string}
                    className="dark:bg-gray-700"
                  >
                    {category as string}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-3">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Conditon :
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
                <option value="">Select condition</option>
                {condition.map((con: TCondition) => (
                  <option key={con} value={con} className="dark:bg-gray-700">
                    {con}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-3">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Sort by :
              </h1>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="">Select an option</option>
                {sortingOrders.map((sortingOrder: TValue) => (
                  <option
                    key={sortingOrder.value as string}
                    value={sortingOrder.value as string}
                    className="dark:bg-gray-700"
                  >
                    {sortingOrder.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:w-full text-gray-500 dark:text-gray-300 font-semibold bg-[#f0f3f8] dark:bg-gray-700 p-3">
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
        </div>
      )}
    </section>
  );
};

export default AllcarsFiltering;
