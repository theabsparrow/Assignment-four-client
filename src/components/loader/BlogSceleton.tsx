const BlogSceleton = () => {
  return (
    <div className="max-w-3xl mx-auto my-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-pulse">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
      <div className="flex justify-between mb-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
      </div>
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
    </div>
  );
};

export default BlogSceleton;
