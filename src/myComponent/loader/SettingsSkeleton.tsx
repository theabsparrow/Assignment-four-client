const SettingsSkeleton = () => {
  return (
    <section className=" animate-pulse mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md px-2 lg:px-16  h-[calc(100vh-76px)] flex items-start justify-between lg:gap-20">
      <div className="hidden lg:flex flex-col items-start space-y-2 w-44 animate-pulse">
        {" "}
        <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>{" "}
        <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>{" "}
        <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>{" "}
        <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>{" "}
      </div>
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex justify-center items-center">
          Personal Information
        </h3>
        <div className="px-20 py-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-4">
          <div className="space-y-1">
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>{" "}
            <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>{" "}
          </div>

          <div className="space-y-1">
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>{" "}
            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>{" "}
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>{" "}
          </div>
          <div className="space-y-1">
            <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>{" "}
            <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsSkeleton;
