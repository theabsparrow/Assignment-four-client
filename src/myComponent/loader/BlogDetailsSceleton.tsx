const BlogDetailsSceleton = () => {
  return (
    <section className="px-2 md:px-8 lg:px-16 min-h-screen bg-gray-200 dark:bg-gray-800 rounded-lg transition-colors duration-300 pb-4">
      <div className="w-[60vw] mx-auto space-y-4 animate-pulse">
        <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
        <div className="space-y-2">
          <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="flex flex-col space-y-2 w-1/2">
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="h-6 w-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex items-center gap-48">
          <div className="h-8 w-20 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
          <div className="h-8 w-28 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsSceleton;
