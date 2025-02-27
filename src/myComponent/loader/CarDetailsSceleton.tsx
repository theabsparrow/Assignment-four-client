const CarDetailsSceleton = () => {
  return (
    <div className=" w-full bg-white shadow-lg rounded-lg overflow-hidden animate-pulse md:px-32 mx-auto h-screen mt-5">
      {/* Image Skeleton */}
      <div className="relative ">
        <div className="w-full h-72 bg-gray-300"></div>
        <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
          <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-2">
        <div className="h-6 w-48 bg-gray-300 rounded"></div>
        <div className="mt-2 h-4 w-64 bg-gray-300 rounded"></div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-4 w-32 bg-gray-300 rounded"></div>
            ))}
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsSceleton;
