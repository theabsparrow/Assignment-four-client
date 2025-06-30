const BlogDetailsSceleton = () => {
  return (
    <section className="md:px-32 mt-2 animate-pulse">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-start md:gap-8 p-4 md:p-8">
          <div className="md:w-2/3 w-full mb-4 md:mb-0">
            <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-2xl" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded-full w-16 h-6"
                />
              ))}
            </div>
            <div className="flex gap-4 mt-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-5 w-12 bg-gray-300 dark:bg-gray-700 rounded"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 md:p-8 space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-300 dark:bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsSceleton;
