const SetPasswordSkeleton = () => {
  return (
    <section className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg animate-pulse">
      <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>
      <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded mx-auto mt-3"></div>

      <div className="mt-6 space-y-4">
        <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>

      <div className="h-12 w-full bg-gray-400 dark:bg-gray-600 rounded-md mt-6"></div>
    </section>
  );
};

export default SetPasswordSkeleton;
