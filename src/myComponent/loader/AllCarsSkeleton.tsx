const AllCarsSkeleton = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-3 px-2 lg:px-16 mt-16">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-4 animate-pulse"
        >
          <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          <div className="mt-4 space-y-3">
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          </div>
          <div className="mt-4 w-full h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        </div>
      ))}
    </section>
  );
};

export default AllCarsSkeleton;
