const ReplyComponentSkeleton = () => {
  return (
    <div className="space-y-8 lg:space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-start gap-4 animate-pulse">
          <div className="w-12 h-12 bg-gray-400 dark:bg-gray-700 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="w-1/3 h-4 bg-gray-400 dark:bg-gray-700 rounded"></div>
            <div className="w-3/4 h-3 bg-gray-400 dark:bg-gray-700 rounded"></div>
            <div className="w-2/4 h-3 bg-gray-400 dark:bg-gray-700 rounded"></div>
            <div className="text-white font-semibold flex flex-col lg:flex-row lg:items-center lg:justify-between mt-3 space-y-2 lg:space-y-0">
              <div className="flex items-center gap-10">
                <div className="w-10 h-3 bg-gray-400 dark:bg-gray-700 rounded"></div>
                <div className="w-16 h-3 bg-gray-400 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="w-24 h-3 bg-gray-400 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplyComponentSkeleton;
