import {
  carBrands,
  carCategories,
  carSortingOrder,
  conditions,
  years,
} from "@/const/carInfo.const";
import { countries } from "@/const/country.const";
import {
  TCarBrand,
  TCategory,
  TCondition,
} from "@/interface/carInterface/car.interface";
import { TValue } from "@/myComponent/formInput/formInput.const";
import CarListingSelect from "@/myComponent/selectComponent/CarListingSelect";
import { TFilterProps } from "@/pages/allCars/allCars.types";
import {
  currentFilter,
  resetFilter,
  setFilter,
  setSearchTerm,
  setSort,
} from "@/redux/features/car/carSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import { RiEqualizerFill } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import ReactRangeSliderInput from "react-range-slider-input";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";

const CarListFiltering = ({
  models,
  total,
  maxPrice,
  minPrice,
}: TFilterProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [sorted, setSorted] = useState(true);
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

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    const data = {
      ...query,
      minPrice: newRange[0],
      maxPrice: newRange[1],
    };
    dispatch(setFilter(data));
  };

  const handelReset = () => {
    dispatch(resetFilter());
    setPriceRange([minPrice, maxPrice]);
  };
  return (
    <>
      <section className="space-y-2 lg:px-2 sticky top-10 md:top-0 z-20 bg-[#f0f3f8] dark:bg-gray-700 pt-1 ">
        <div className="flex items-center justify-between">
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <RiEqualizerFill />
          </button>
          <h1 className="text-xl font-semibold ">
            Total {total} cars for sale
          </h1>
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => {
                setSorted(!sorted);
                const value = sorted ? "createdAt" : "-createdAt";
                dispatch(setSort(value));
              }}
              className={`flex flex-col items-center justify-center transition-all duration-200 
        ${query.sort === "createdAt" && "text-blue-700"}`}
              title={
                query.sort === "createdAt" ? "Oldest First" : "Newest First"
              }
            >
              {query.sort === "createdAt" ? (
                <span className="flex items-center">
                  <ArrowUp size={16} />
                  <ArrowDown size={16} />
                </span>
              ) : (
                <span className="flex items-center">
                  <ArrowDown size={16} />
                  <ArrowUp size={16} />
                </span>
              )}
            </button>
            <button
              onClick={handelReset}
              className="bg-red-500 text-white px-2 py-1 rounded shadow hover:bg-red-600 duration-500 "
            >
              Reset
            </button>
          </div>
        </div>

        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search items"
              className="p-2 border border-gray-300 rounded-lg bg-[#f0f3f8] dark:bg-gray-700 outline-none"
              value={query.searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                dispatch(setSearchTerm(value));
              }}
            />

            <div>
              <select
                value={query?.sort}
                onChange={(e) => {
                  const value = e.target.value as string;
                  dispatch(setSort(value));
                }}
                className="rounded-lg outline-none font-medium bg-transparent border-2 p-2"
              >
                <option value="">Sort by</option>
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
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => {
                setSorted(!sorted);
                const value = sorted ? "createdAt" : "-createdAt";
                dispatch(setSort(value));
              }}
              className={`flex flex-col items-center justify-center transition-all duration-200 
        ${query.sort === "createdAt" && "text-blue-700"}`}
              title={
                query.sort === "createdAt" ? "Oldest First" : "Newest First"
              }
            >
              {query.sort === "createdAt" ? (
                <span className="flex items-center">
                  <ArrowUp size={16} />
                  <ArrowDown size={16} />
                </span>
              ) : (
                <span className="flex items-center">
                  <ArrowDown size={16} />
                  <ArrowUp size={16} />
                </span>
              )}
            </button>
            <button
              onClick={handelReset}
              className="bg-red-500 text-white px-2 py-1 rounded shadow hover:bg-red-600 duration-500 "
            >
              Reset
            </button>
          </div>
        </div>

        {/* filter for large and medium device */}
        <div className="hidden md:flex flex-col">
          <div className="flex items-center gap-2 md:flex-wrap lg:flex-nowrap">
            <CarListingSelect
              valueOptions={carBrands as TCarBrand[]}
              name="brand"
              label="Brand"
            />
            <CarListingSelect
              valueOptions={models as string[]}
              name="model"
              label="Model"
            />
            <CarListingSelect
              valueOptions={carCategories as TCategory[]}
              name="category"
              label="Category"
            />
            <CarListingSelect
              valueOptions={years as string[]}
              name="year"
              label="Year"
            />
            <CarListingSelect
              valueOptions={conditions as TCondition[]}
              name="condition"
              label="Condition"
            />
            <CarListingSelect
              valueOptions={["Available", "Unavailable"] as string[]}
              name="inStock"
              label="In Stock"
            />
            <CarListingSelect
              valueOptions={["Yes", "No"] as string[]}
              name="negotiable"
              label="Negotiate"
            />
          </div>
          <div className="flex items-center gap-2">
            <CarListingSelect
              valueOptions={countries as string[]}
              name="madeIn"
              label="Made In"
            />
            <div className=" text-gray-500 dark:text-gray-300 font-semibold p-2">
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
        </div>
      </section>
      {open && (
        <section className="md:hidden font-inter">
          <Sheet open={open} onOpenChange={setOpen}>
            <DialogContent>mobile sidebar</DialogContent>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <GiHamburgerMenu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="py-6 px-1 w-80 ">
              <div className="space-y-3 h-full border w-full">
                <input
                  type="text"
                  placeholder="Search items"
                  className="p-2 border border-gray-300 rounded-lg bg-[#f0f3f8] dark:bg-gray-700 outline-none"
                  value={query.searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    dispatch(setSearchTerm(value));
                  }}
                />
                <CarListingSelect
                  valueOptions={carBrands as TCarBrand[]}
                  name="brand"
                  label="Brand"
                />
                <CarListingSelect
                  valueOptions={models as string[]}
                  name="model"
                  label="Model"
                />
                <CarListingSelect
                  valueOptions={carCategories as TCategory[]}
                  name="category"
                  label="Category"
                />
                <CarListingSelect
                  valueOptions={years as string[]}
                  name="year"
                  label="Year"
                />
                <CarListingSelect
                  valueOptions={conditions as TCondition[]}
                  name="condition"
                  label="Condition"
                />
                <CarListingSelect
                  valueOptions={["Available", "Unavailable"] as string[]}
                  name="inStock"
                  label="In Stock"
                />
                <CarListingSelect
                  valueOptions={["Yes", "No"] as string[]}
                  name="negotiable"
                  label="Negotiate"
                />
                <div className=" md:hidden">
                  <select
                    value={query?.sort}
                    onChange={(e) => {
                      const value = e.target.value as string;
                      dispatch(setSort(value));
                    }}
                    className="rounded-lg outline-none font-medium bg-transparent border-2 p-2"
                  >
                    <option value="">Sort by</option>
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
                <CarListingSelect
                  valueOptions={countries as string[]}
                  name="madeIn"
                  label="Made In"
                />
                <div className=" text-gray-500 dark:text-gray-300 font-semibold p-2">
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
            </SheetContent>
          </Sheet>
        </section>
      )}
    </>
  );
};

export default CarListFiltering;
