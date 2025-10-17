const AllBrandSkeleton = ({ value }: { value: number }) => {
  return (
    <div className="px-2 lg:px-16 mt-16 space-y-5">
      <div className="h-12 w-64 mx-auto rounded bg-gray-300 dark:bg-gray-600 animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
        {Array.from({ length: value }).map((_, i) => (
          <div
            key={i}
            className="bg-[#f0f3f8] dark:bg-gray-900 rounded-xl shadow-lg p-4 text-center animate-pulse"
          >
            <div className="w-full h-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded-md mt-4 mx-auto"></div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="h-10 w-48 rounded-md bg-gray-300 dark:bg-gray-600 animate-pulse" />
      </div>
    </div>
  );
};

export default AllBrandSkeleton;
