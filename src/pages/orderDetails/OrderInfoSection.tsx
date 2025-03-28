import { FcOk } from "react-icons/fc";

import { FaHourglassHalf } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { TOrderInfoProps } from "./orderDetails.interface";

const OrderInfoSection = ({ order }: { order: TOrderInfoProps }) => {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 shadow-lg rounded-xl px-2 py-3 border border-blue-200 dark:border-gray-600 md:w-[40vw]">
      <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 border-b-2 border-indigo-300 dark:border-indigo-600 pb-2">
        🚚 Order Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
        <div>
          <span className="font-semibold text-indigo-800 dark:text-indigo-300">
            Transaction ID:
          </span>{" "}
          <span className="text-gray-700 dark:text-gray-400">
            {order?.orderID}
          </span>
        </div>
        <div>
          <span className="font-semibold text-indigo-800 dark:text-indigo-300">
            Bank Status:
          </span>{" "}
          <span className="text-gray-700 dark:text-gray-400">
            {order?.bank_status}
          </span>
        </div>
        <div>
          <span className="font-semibold text-indigo-800 dark:text-indigo-300">
            Time:
          </span>{" "}
          <span className="text-gray-700 dark:text-gray-400">
            {new Date(order?.date_time).toLocaleString()}
          </span>
        </div>
        <div>
          <span className="font-semibold text-indigo-800 dark:text-indigo-300">
            Sp Code:
          </span>{" "}
          <span className="text-gray-700 dark:text-gray-400">
            {order?.sp_code}
          </span>
        </div>
        <div>
          <span className="font-semibold text-indigo-800 dark:text-indigo-300">
            Sp Message:
          </span>{" "}
          <span className="text-gray-700 dark:text-gray-400">
            {order?.sp_message}
          </span>
        </div>
        <div>
          <span className="font-semibold text-indigo-800 dark:text-indigo-300">
            Transaction Status:
          </span>{" "}
          <span className="text-gray-700 dark:text-gray-400">
            {order?.transactionStatus}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-indigo-800 dark:text-indigo-300">
            Order Status:
          </span>{" "}
          <span className="text-gray-700 dark:text-gray-400 flex items-center gap-1">
            {order?.status}{" "}
            {(order?.status === "Paid" || order?.status === "Completed") && (
              <FcOk className="text-green-600" />
            )}
            {order?.status === "Pending" && (
              <FaHourglassHalf className="text-yellow-400" />
            )}
            {order?.status === "Cancelled" && (
              <RxCross2 className="text-red-600" />
            )}
          </span>
        </div>
        <div>
          <span className="font-semibold text-indigo-800 dark:text-indigo-300">
            Quantity:
          </span>{" "}
          <span className="text-gray-700 dark:text-gray-400">
            {order?.quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoSection;
