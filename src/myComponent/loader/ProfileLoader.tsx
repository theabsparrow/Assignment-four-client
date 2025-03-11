const ProfileLoader = () => {
  return (
    <div className="max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden font-inter pb-10 dark:bg-gray-800 animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="relative h-40 md:h-60 bg-gray-200 dark:bg-gray-700">
        <div className="w-full h-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="absolute bottom-1 right-1 bg-gray-400 dark:bg-gray-500 p-2 rounded-full shadow-md">
          📷
        </div>
      </div>

      {/* Profile Image Skeleton */}
      <div className="relative w-24 h-24 md:w-44 md:h-44 rounded-full border border-primary cursor-pointer -mt-12 ml-4">
        <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="absolute bottom-1 left-4 bg-white dark:bg-gray-500 p-1 rounded-full shadow-md">
          📷
        </div>
      </div>

      {/* User Info Skeleton */}
      <div className="flex items-center dark:text-gray-400 mt-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 w-40 rounded-md mx-4"></div>
        <div className="h-5 bg-gray-300 dark:bg-gray-600 w-20 rounded-md"></div>
      </div>

      {/* Personal Info Skeleton */}
      <div className="mt-4 p-4 bg-white dark:bg-gray-950 mx-4 rounded-lg shadow-md">
        <div className="h-5 w-48 bg-gray-300 dark:bg-gray-600 rounded-md mb-4"></div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
              <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded-md mt-1"></div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <div className="h-5 w-56 bg-gray-300 dark:bg-gray-600 rounded-md mx-auto"></div>
        </div>
      </div>

      {/* Address Info Skeleton */}
      <div className="p-4 bg-white dark:bg-gray-950 mt-4 mx-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="h-5 w-48 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
        <div className="mt-4 space-y-3">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
              <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded-md mt-1"></div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoader;
