import { TbCurrencyTaka } from "react-icons/tb";
import { TOrderInfoProps } from "./orderDetails.interface";

const DelioveryInfoSection = ({ order }: { order: TOrderInfoProps }) => {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 shadow-lg rounded-xl px-2 py-3 border border-blue-200 dark:border-gray-600 md:w-[40vw]">
      <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 border-b-2 border-indigo-300 dark:border-indigo-600 pb-2">
        📦 Delivery Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
        <div>
          <span className="font-semibold text-indigo-800 dark:text-indigo-300">
            Delivery Method:
          </span>{" "}
          <span className="text-gray-700 dark:text-gray-400">
            {order?.deliveryMethod}
          </span>
        </div>

        {order?.location && (
          <div>
            <span className="font-semibold text-indigo-800 dark:text-indigo-300">
              Delivery Location:
            </span>{" "}
            <span className="text-gray-700 dark:text-gray-400">
              {order?.location}
            </span>
          </div>
        )}

        {order?.nearestDealer && (
          <div>
            <span className="font-semibold text-indigo-800 dark:text-indigo-300">
              Nearest Dealer:
            </span>{" "}
            <span className="text-gray-700 dark:text-gray-400">
              {order?.nearestDealer}
            </span>
          </div>
        )}

        <div>
          <span className="font-semibold text-indigo-800 dark:text-indigo-300">
            Estimated Delivery:
          </span>{" "}
          <span className="text-gray-700 dark:text-gray-400">
            {order?.estimatedDeliveryTime}
          </span>
        </div>

        <div>
          <span className="font-semibold text-indigo-800 dark:text-indigo-300">
            Contact Number:
          </span>{" "}
          <span className="text-gray-700 dark:text-gray-400">
            {order?.phoneNumber}
          </span>
        </div>

        <div>
          <span className="font-semibold text-indigo-800 dark:text-indigo-300">
            Payment Method:
          </span>{" "}
          <span className="text-gray-700 dark:text-gray-400">
            {order?.paymentMethod}
          </span>
        </div>

        {order?.paymentOption && (
          <div>
            <span className="font-semibold text-indigo-800 dark:text-indigo-300">
              Payment Option:
            </span>{" "}
            <span className="text-gray-700 dark:text-gray-400">
              {order?.paymentOption}
            </span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <span className="font-semibold text-indigo-800 dark:text-indigo-300">
            Delivery Cost:
          </span>{" "}
          <span className="text-gray-700 dark:text-gray-400 flex items-center">
            <TbCurrencyTaka /> {order?.deliveryCost}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="font-semibold text-indigo-800 dark:text-indigo-300">
            Total Cost:
          </span>{" "}
          <span className="text-gray-700 dark:text-gray-400 flex items-center">
            <TbCurrencyTaka /> {order?.totalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DelioveryInfoSection;
