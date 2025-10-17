const BlogCommentSkeleton = () => {
  return (
    <section className="fixed -top-2 inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-gray-500 dark:bg-gray-900 rounded-lg shadow-lg lg:w-[40vw] h-[70vh] lg:h-[85vh] flex flex-col p-2 lg:p-4 relative animate-pulse">
        <div className="bg-gray-400 dark:bg-gray-700 rounded-full w-6 h-6 absolute top-2 right-2"></div>

        <div className="flex-1 overflow-y-auto w-full space-y-6 lg:space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-400 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="w-1/3 h-4 bg-gray-400 dark:bg-gray-700 rounded"></div>
                <div className="w-3/4 h-3 bg-gray-400 dark:bg-gray-700 rounded"></div>
                <div className="w-1/2 h-3 bg-gray-400 dark:bg-gray-700 rounded"></div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-3 space-y-2 lg:space-y-0">
                  <div className="flex items-center gap-8">
                    <div className="w-10 h-3 bg-gray-400 dark:bg-gray-700 rounded"></div>
                    <div className="w-10 h-3 bg-gray-400 dark:bg-gray-700 rounded"></div>
                    <div className="w-14 h-3 bg-gray-400 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="w-20 h-3 bg-gray-400 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-0 bg-gray-500 dark:bg-gray-900 border-t border-gray-400 dark:border-gray-700 px-3 py-2 flex items-center gap-2">
          <div className="flex-1">
            <div className="w-full h-10 bg-gray-400 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="w-8 h-8 bg-gray-400 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default BlogCommentSkeleton;
