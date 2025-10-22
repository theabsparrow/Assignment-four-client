const MyCarDetailSkeleton = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 font-inter space-y-20 p-4 animate-pulse">
      <div className="space-y-2">
        <div className="relative md:w-[60vw] mx-auto">
          <div className="w-full rounded-xl md:w-[60vw] lg:h-[80vh] bg-gray-300 dark:bg-gray-700" />

          <div className="h-5 w-5 md:h-12 md:w-12 absolute top-2 right-2 rounded-full bg-gray-400 dark:bg-gray-600" />

          <div className="absolute bottom-1 right-1 bg-gray-300 dark:bg-gray-700 p-1 md:p-2 rounded-full shadow-md">
            <div className="h-5 w-5 bg-gray-400 dark:bg-gray-600 rounded" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5">
          <div className="w-[60px] md:w-[16vw] lg:w-[9.5vw] h-10 md:h-28 lg:h-24 rounded-lg bg-gray-300 dark:bg-gray-700 border border-gray-500" />

          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="relative w-[60px] md:w-[16vw] lg:w-[9.5vw] h-10 md:h-28 lg:h-24 rounded-lg bg-gray-300 dark:bg-gray-700 border border-gray-500"
            >
              <div className="absolute top-1 right-1 h-4 w-4 bg-gray-400 dark:bg-gray-600 rounded-full" />
            </div>
          ))}

          <div className="w-[60px] md:w-[16vw] lg:w-[9.5vw] h-10 md:h-28 lg:h-24 bg-gray-200 dark:bg-gray-700 border-2 border-secondary border-dashed rounded-lg flex justify-center items-center">
            <div className="h-8 w-8 bg-gray-400 dark:bg-gray-600 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyCarDetailSkeleton;
