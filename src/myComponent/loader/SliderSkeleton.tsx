const SliderSkeleton = () => {
  return (
    <div className="md:w-full text-gray-500 font-semibold animate-pulse">
      <div className="flex items-center mb-3 md:gap-3">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="flex items-center gap-2 ml-2">
          <div className="h-5 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-4 w-6 bg-gray-200 dark:bg-gray-700 rounded mx-2"></div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );
};

export default SliderSkeleton;
