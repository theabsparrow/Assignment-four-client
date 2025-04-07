import OrderPageLoader from "@/myComponent/loader/OrderPageLoader";
import { useVerifyOrderQuery } from "@/redux/features/order/orderApi";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link, useSearchParams } from "react-router-dom";

const VerifyOrder = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useVerifyOrderQuery(searchParams.get("order_id"));
  const orderData = data?.data?.[0];
  const statusColor =
    orderData?.sp_message === "Success"
      ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-800 dark:text-green-300"
      : "bg-red-100 text-red-700 border-red-300 dark:bg-red-800 dark:text-red-300";
  if (isLoading) {
    return <OrderPageLoader></OrderPageLoader>;
  }
  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#f0f3f8] dark:bg-gray-700 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-colors font-inter">
      <div
        className={`text-center font-medium text-lg px-4 py-2 rounded-lg border ${statusColor} mt-2`}
      >
        Status: {orderData?.sp_message || "Pending"}
      </div>
      {/* User Data */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          👤 User Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Name:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-100">
              {orderData?.name || "N/A"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Email:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-100">
              {orderData?.email || "N/A"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Phone:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-100">
              {orderData?.phone_no || "N/A"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Address:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-100">
              {orderData?.address || "N/A"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">
              City:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-100">
              {orderData?.city || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Data */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          💳 Payment Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Method:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-100">
              {orderData?.method || "N/A"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Amount:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-100">
              {orderData?.amount.toLocaleString()} {orderData?.currency}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Transaction ID:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-100">
              {orderData?.bank_trx_id || "N/A"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Invoice No:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-100">
              {orderData?.invoice_no || "N/A"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">
              SP Code:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-100">
              {orderData?.sp_code || "N/A"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">
              SP Message:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-100">
              {orderData?.sp_message || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Order Data */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          📦 Order Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Order ID:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-100">
              {orderData?.order_id || "N/A"}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Total Amount:
            </span>{" "}
            <span className="flex items-center text-gray-800 dark:text-gray-100">
              <TbCurrencyTaka className="text-xl font-bold mr-1" />{" "}
              {orderData?.received_amount}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Date & Time:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-100">
              {new Date(orderData?.date_time).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">
              Discount (%):
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-100">
              {orderData?.disc_percent || "0"}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <Link
          className="bg-primary p-2 rounded-lg text-white font-semibold  hover:bg-secondary  duration-500 "
          to={`/order/${orderData?.customer_order_id}`}
        >
          View Order
        </Link>
      </div>
    </div>
  );
};

export default VerifyOrder;
