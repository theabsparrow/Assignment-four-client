import { TbCurrencyTaka } from "react-icons/tb";

const CardSceleton = () => {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 shadow-lg rounded-xl px-2 py-3 border border-blue-200 dark:border-gray-600 md:w-[40vw] animate-pulse">
      {/* Header */}
      <div className="h-6 w-48 bg-indigo-300 dark:bg-indigo-500 rounded mb-4 border-b-2 border-indigo-300 dark:border-indigo-600"></div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="h-4 w-36 bg-indigo-200 dark:bg-indigo-400 rounded mb-1"></div>
            <div className="h-5 w-44 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        ))}

        {/* Delivery Cost */}
        <div className="flex items-center gap-2">
          <span className="h-4 w-28 bg-indigo-200 dark:bg-indigo-400 rounded"></span>
          <span className="flex items-center gap-1">
            <TbCurrencyTaka className="text-gray-400 dark:text-gray-500" />
            <span className="h-5 w-12 bg-gray-300 dark:bg-gray-600 rounded"></span>
          </span>
        </div>

        {/* Total Cost */}
        <div className="flex items-center gap-2">
          <span className="h-4 w-20 bg-indigo-200 dark:bg-indigo-400 rounded"></span>
          <span className="flex items-center gap-1">
            <TbCurrencyTaka className="text-gray-400 dark:text-gray-500" />
            <span className="h-5 w-14 bg-gray-300 dark:bg-gray-600 rounded"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardSceleton;
