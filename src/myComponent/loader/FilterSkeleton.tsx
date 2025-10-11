import { ArrowDown, ArrowUp } from "lucide-react";
import { RiEqualizerFill } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";

const FilterSkeleton = () => {
  return (
    <section className="space-y-2 lg:px-2 bg-[#f0f3f8] dark:bg-gray-700 animate-pulse py-4">
      <div className="flex items-center justify-between">
        <button className="md:hidden">
          <RiEqualizerFill className="text-gray-400" />
        </button>

        <div className="h-8 w-40 bg-gray-300 dark:bg-gray-600 rounded-md" />

        <div className="md:hidden flex items-center gap-2">
          <button className="flex flex-col items-center justify-center text-gray-400">
            <ArrowUp size={16} />
            <ArrowDown size={16} />
          </button>
          <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded-md" />
        </div>
      </div>
      <div className="hidden md:flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-9 w-56 bg-gray-300 dark:bg-gray-600 rounded-md" />
          <div className="h-9 w-36 bg-gray-300 dark:bg-gray-600 rounded-md" />
        </div>

        <div className="flex items-center gap-4">
          <button className="flex flex-col items-center justify-center text-gray-400">
            <ArrowUp size={16} />
            <ArrowDown size={16} />
          </button>
          <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded-md" />
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-3">
        {/* Dropdown skeletons */}
        <div className="flex flex-wrap lg:flex-nowrap gap-2">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div
              key={idx}
              className="h-9 w-40 bg-gray-300 dark:bg-gray-600 rounded-md"
            />
          ))}
        </div>

        {/* Price range skeleton */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="h-10 w-28 bg-gray-300 dark:bg-gray-600 rounded-md" />
          <div className="text-gray-500 dark:text-gray-300 font-semibold p-2 flex-1">
            <div className="flex items-center mb-3 md:gap-3">
              <h2 className="text-sm md:font-semibold">Price range :</h2>
              <p className="flex items-center">
                <TbCurrencyTaka className="text-lg" />
                <span className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded-md mx-1"></span>
              </p>
              <p className="text-sm">to</p>
              <p className="flex items-center">
                <TbCurrencyTaka className="text-lg" />
                <span className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded-md mx-1"></span>
              </p>
            </div>
            <div className="h-3 w-72 bg-gray-300 dark:bg-gray-600 rounded-md" />
          </div>
        </div>
      </div>

      {/* ===== MOBILE FILTERS ===== */}
      <div className="md:hidden border rounded-md p-3 mt-2 space-y-2">
        <div className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded-md" />
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded-md"
          />
        ))}

        <div className="flex items-center justify-between mt-4">
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded-md" />
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded-md" />
        </div>

        <div className="h-2 w-full bg-gray-300 dark:bg-gray-600 rounded-md" />
      </div>
    </section>
  );
};

export default FilterSkeleton;
