const DropdownSkeleton = () => {
  return (
    <div>
      <h1 className="text-gray-500 font-semibold">Model*</h1>
      <div className="p-2 rounded bg-gray-50 dark:bg-gray-800 border cursor-wait animate-pulse">
        <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default DropdownSkeleton;
