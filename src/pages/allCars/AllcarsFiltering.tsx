import { useEffect, useRef, useState } from "react";
import { TValue } from "@/myComponent/formInput/formInput.const";
import { TbCurrencyTaka } from "react-icons/tb";
import ReactRangeSliderInput from "react-range-slider-input";
import { TFilterProps } from "./allCars.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { RxCross1 } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import SelectComponent from "@/myComponent/selectComponent/SelectComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentFilter,
  resetFilter,
  setFilter,
  setSearchTerm,
  setSort,
} from "@/redux/features/car/carSlice";
import {
  TCarBrand,
  TCategory,
  TCondition,
} from "@/interface/carInterface/car.interface";
import {
  carBrands,
  carCategories,
  carSortingOrder,
  conditions,
  years,
} from "@/const/carInfo.const";

const AllcarsFiltering = ({
  models,
  total,
  maxPrice,
  minPrice,
}: TFilterProps) => {
  // local state
  const [open, setOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const filterRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  // data from other state
  const dispatch = useAppDispatch();
  const query = useAppSelector(currentFilter);
  const priceSLiderRange: [number, number] | null =
    query?.minPrice > 0 || query?.maxPrice > 0
      ? [query.minPrice, query.maxPrice]
      : null;
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    const brand = searchParams.get("brand") || "";
    const model = searchParams.get("model") || "";
    const category = searchParams.get("category") || "";
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 0;
    const filter = {
      ...query,
      brand,
      model,
      category,
      minPrice,
      maxPrice,
    };
    dispatch(setFilter(filter));
  }, [searchParams]);

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    const data = {
      ...query,
      minPrice: newRange[0],
      maxPrice: newRange[1],
    };
    dispatch(setFilter(data));
  };

  const handleSoldCars = () => {
    const filter = {
      ...query,
      inStock: "yes",
    };
    dispatch(setFilter(filter));
  };

  const handelReset = () => {
    dispatch(resetFilter());
    setPriceRange([minPrice, maxPrice]);
    setSearchParams({});
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

  return (
    <section ref={filterRef} className="sticky top-20 z-30">
      <div className="lg:hidden bg-white dark:bg-gray-900 shadow-lg px-4 pb-8 space-y-4 max-h-[80vh] overflow-y-auto relative">
        <h1 className="text-xl font-semibold ">Total {total} cars for sale</h1>
        <div className=" space-y-4 ">
          <div className="flex items-center justify-between ">
            <button
              onClick={handleSoldCars}
              className="bg-secondary dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold px-2 py-1 rounded-md duration-500 transition "
            >
              see sold cars
            </button>
            <button
              onClick={handelReset}
              className="bg-red-500 text-white px-2 py-1 rounded shadow hover:bg-red-600 duration-500 "
            >
              Reset
            </button>
          </div>
          <div className=" flex justify-center items-center">
            <input
              type="text"
              placeholder="Search items"
              className="p-2 border rounded-lg shadow-sm bg-[#f0f3f8] dark:bg-gray-700 outline-cyan-400"
              value={query.searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                dispatch(setSearchTerm(value));
              }}
            />
          </div>
        </div>
        {open && (
          <div className="space-y-2">
            <SelectComponent
              valueOptions={carBrands as TCarBrand[]}
              label="brand"
            />
            <SelectComponent valueOptions={models as string[]} label="model" />
            <SelectComponent
              valueOptions={carCategories as TCategory[]}
              label="category"
            />
            <SelectComponent valueOptions={years as string[]} label="year" />
            <SelectComponent
              valueOptions={conditions as TCondition[]}
              label="condition"
            />
            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-2">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Sort by :
              </h1>
              <select
                value={query?.sort}
                onChange={(e) => {
                  const value = e.target.value as string;
                  dispatch(setSort(value));

                  if (value) {
                    params.set("sort", value);
                  } else {
                    params.delete("sort");
                  }
                  navigate(`/all-cars?${params.toString()}`);
                }}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="select category">Select an option</option>
                {carSortingOrder.map((sortingOrder: TValue) => (
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
            <div className=" text-gray-500 dark:text-gray-300 font-semibold bg-[#f0f3f8] dark:bg-gray-700 p-2">
              <div className="flex items-center mb-3 md:gap-3">
                <h2 className="text-sm md:font-semibold">Price range : </h2>
                <p className="font-bold text-black dark:text-white flex items-center">
                  <TbCurrencyTaka className="text-lg" />{" "}
                  {priceRange[0].toLocaleString()}
                </p>{" "}
                <p className="text-sm">to</p>{" "}
                <p className="font-bold text-black dark:text-white flex items-center">
                  <TbCurrencyTaka className="text-lg" />{" "}
                  {priceRange[1].toLocaleString()}
                </p>
              </div>
              <ReactRangeSliderInput
                min={minPrice}
                max={maxPrice}
                step={100000}
                value={priceSLiderRange ?? priceRange}
                onInput={handlePriceRangeChange}
                className=""
              />
            </div>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="absolute -bottom-3 left-[45%]"
        >
          <RiArrowDropDownLine className="text-4xl text-secondary" />
        </button>
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
                  onClick={handleSoldCars}
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
                value={query.searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(setSearchTerm(value));
                }}
              />
            </div>
            <SelectComponent
              valueOptions={carBrands as TCarBrand[]}
              label="brand"
            />
            <SelectComponent valueOptions={models as string[]} label="model" />
            <SelectComponent
              valueOptions={carCategories as TCategory[]}
              label="category"
            />
            <SelectComponent valueOptions={years as string[]} label="year" />
            <SelectComponent
              valueOptions={conditions as TCondition[]}
              label="condition"
            />

            <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-3">
              <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
                {" "}
                Sort by :
              </h1>
              <select
                value={query.sort}
                onChange={(e) => {
                  const value = e.target.value;
                  dispatch(setSort(value));
                  if (value) {
                    params.set("sort", value);
                  } else {
                    params.delete("sort");
                  }
                  navigate(`/all-cars?${params.toString()}`);
                }}
                className="px-5 rounded outline-none bg-transparent font-bold"
              >
                <option value="">Select an option</option>
                {carSortingOrder.map((sortingOrder: TValue) => (
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
                <h2 className="text-sm md:font-semibold">Price range : </h2>
                <p className="font-bold text-black dark:text-white flex items-center">
                  <TbCurrencyTaka className="text-lg" />{" "}
                  {priceRange[0].toLocaleString()}
                </p>{" "}
                <p className="text-sm">to</p>{" "}
                <p className="font-bold text-black dark:text-white flex items-center">
                  <TbCurrencyTaka className="text-lg" />{" "}
                  {priceRange[1].toLocaleString()}
                </p>
              </div>
              <ReactRangeSliderInput
                min={minPrice}
                max={maxPrice}
                step={100000}
                value={priceSLiderRange ?? priceRange}
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
