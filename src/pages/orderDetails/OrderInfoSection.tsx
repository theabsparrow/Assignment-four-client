import { FcOk } from "react-icons/fc";

import { FaHourglassHalf } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { TOrderInfoProps } from "./orderDetails.interface";
import { useState } from "react";
import { toast } from "sonner";
import { useCancellMyOrderMutation } from "@/redux/features/order/orderApi";

const OrderInfoSection = ({ order }: { order: TOrderInfoProps }) => {
  const value = order?.status;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancellMyOrder] = useCancellMyOrderMutation();

  const id = order?._id;
  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const confirmCancell = async () => {
    if (!id) {
      toast.error("faild to cancell the order");
      return;
    }
    const toastId = toast.loading("order cancelling.....");
    try {
      const res = await cancellMyOrder(id).unwrap();
      if (res?.data) {
        toast.success("order cancelled successfully ", {
          id: toastId,
          duration: 3000,
        });
        setIsModalOpen(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.errorSource[0].message ||
        error?.data?.message ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };
  return (
    <>
      {isModalOpen && !["Completed", "Cancelled"].includes(value) && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center font-inter z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-2xl w-[90%] max-w-md"
          >
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Confirm Order Cancellation
            </h3>

            <p className="text-sm text-gray-700 mb-1">
              Are you sure you want to{" "}
              <span className="font-medium text-red-500">
                cancel this order
              </span>
              ?
            </p>

            <p className="text-sm text-gray-600 mb-1">
              <strong>Note:</strong> Once cancelled, this action{" "}
              <span className="text-red-500 font-semibold">
                cannot be undone
              </span>
              .
            </p>

            <p className="text-sm text-gray-600 mb-4">
              If payment has been made, the refund will be processed within{" "}
              <span className="font-medium">3-5 business days</span> to your
              original payment method.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                No, Keep Order
              </button>

              <button
                onClick={confirmCancell}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              >
                Yes, Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 shadow-lg rounded-xl px-2 py-3 border border-blue-200 dark:border-gray-600 md:w-[40vw]">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 border-b-2 border-indigo-300 dark:border-indigo-600 pb-2">
            🚚 Order Information
          </h2>
          {!["Completed", "Cancelled"].includes(value) && (
            <button
              onClick={handleDelete}
              className={`px-2 py-1 bg-red-500  text-white rounded font-inter `}
            >
              Cancel
            </button>
          )}
        </div>
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
    </>
  );
};

export default OrderInfoSection;
