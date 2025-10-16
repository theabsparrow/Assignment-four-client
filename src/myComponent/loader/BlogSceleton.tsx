const BlogSceleton = () => {
  return (
    <section className="max-w-3xl mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg transition-colors duration-300 space-y-2 animate-pulse p-4">
      <div className="w-full h-56 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="flex items-center gap-3 mt-2">
        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
      </div>
      <div className="mt-4">
        <div className="h-8 w-20 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
      </div>
    </section>
  );
};

export default BlogSceleton;
