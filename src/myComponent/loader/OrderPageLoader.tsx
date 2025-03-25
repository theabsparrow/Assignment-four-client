import { TbCurrencyTaka } from "react-icons/tb";

const OrderPageLoader = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#f0f3f8] dark:bg-gray-700 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 animate-pulse">
      {/* Status */}
      <div className="text-center font-medium text-lg px-4 py-2 rounded-lg border bg-gray-300 dark:bg-gray-600 mt-2 h-10" />

      {/* User Data */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-400 mb-4">
          👤 User Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-6 bg-gray-300 dark:bg-gray-600 rounded"
            />
          ))}
        </div>
      </div>

      {/* Payment Data */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-400 mb-4">
          💳 Payment Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-6 bg-gray-300 dark:bg-gray-600 rounded"
            />
          ))}
        </div>
      </div>

      {/* Order Data */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-400 mb-4">
          📦 Order Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-6 bg-gray-300 dark:bg-gray-600 rounded flex items-center"
            >
              {index === 1 && (
                <TbCurrencyTaka className="text-xl font-bold mr-1 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* View Order Button */}
      <div className="mt-4 flex justify-center">
        <div className="bg-gray-300 dark:bg-gray-600 p-2 rounded-lg w-32 h-10" />
      </div>
    </div>
  );
};

export default OrderPageLoader;
