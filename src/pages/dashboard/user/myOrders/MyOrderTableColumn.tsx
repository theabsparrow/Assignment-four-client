import { ColumnDef } from "@tanstack/react-table";
import {
  TDeliveryMethod,
  TOrderInfo,
  TPaymentMethod,
  TPaymentOption,
  TTransactionStatus,
} from "./myOrder.interface";
import { Link } from "react-router-dom";
import {
  deliveryMethodStyles,
  orderStatusStyles,
  paymentMethodStyles,
  paymentOptionStyles,
  transactionStatusStyles,
} from "./myOrder.const";
import { TOrderStatus } from "@/pages/orderDetails/orderDetails.interface";
import { useState } from "react";

interface TMyOrderTableColumnProps {
  handleDelete: (id: string) => void;
  confirmCancell: (
    id: string,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
}
export const myOrderTableColumn = ({
  handleDelete,
  confirmCancell,
}: TMyOrderTableColumnProps): ColumnDef<TOrderInfo>[] => [
  { accessorKey: "orderID", header: "Order ID" },
  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row }) => {
      const value = row.original.status as TOrderStatus;
      return (
        <span
          className={`px-2 py-1 rounded font-medium text-sm ${orderStatusStyles[value]}`}
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "transactionStatus",
    header: "Transaction Status",
    cell: ({ row }) => {
      const value = row.original.transactionStatus as TTransactionStatus;
      return (
        <span
          className={`px-2 py-1 rounded font-medium text-sm ${transactionStatusStyles[value]}`}
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "deliveryMethod",
    header: "Delivery Method",
    cell: ({ row }) => {
      const value = row.original.deliveryMethod as TDeliveryMethod;
      return (
        <span
          className={`px-2 py-1 rounded font-medium text-sm ${deliveryMethodStyles[value]}`}
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => {
      const value = row.original.paymentMethod as TPaymentMethod;
      return (
        <span
          className={`px-2 py-1 rounded font-medium text-sm ${paymentMethodStyles[value]}`}
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "paymentOption",
    header: "Payment Option",
    cell: ({ row }) => {
      const value = row.original.paymentOption as TPaymentOption;
      return value ? (
        <span
          className={`px-2 py-1 rounded font-medium text-sm ${paymentOptionStyles[value]}`}
        >
          {value}
        </span>
      ) : (
        <span className="text-gray-500 italic">—</span>
      );
    },
  },
  {
    header: "Cancell Order",
    cell: ({ row }) => {
      const value = row?.original?.status;
      const [isModalOpen, setIsModalOpen] = useState(false);

      const handleDelete = () => {
        setIsModalOpen(true);
      };

      const closeModal = () => {
        setIsModalOpen(false);
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
                    onClick={() =>
                      confirmCancell(row?.original?._id, setIsModalOpen)
                    }
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                  >
                    Yes, Cancel Order
                  </button>
                </div>
              </div>
            </div>
          )}
          <div>
            <button
              onClick={() => {
                if (!["Completed", "Cancelled"].includes(value)) {
                  handleDelete();
                }
              }}
              className={`px-2 py-1 bg-amber-500  text-white rounded font-inter ${
                value === "Completed" || value === "Cancelled"
                  ? "cursor-not-allowed"
                  : "cursor-pointer hover:bg-amber-600"
              }`}
            >
              Cancel
            </button>
          </div>
        </>
      );
    },
  },

  {
    header: "View",
    cell: ({ row }) => (
      <div>
        <Link
          to={`/order/${row.original?._id}`}
          className="px-2 py-1 bg-blue-500 text-white rounded font-inter"
        >
          Details
        </Link>
      </div>
    ),
  },
  {
    header: "Remove",
    cell: ({ row }) => (
      <div>
        <button
          onClick={() => handleDelete(row.original._id)}
          className="px-2 py-1 bg-red-500 text-white rounded font-inter"
        >
          Delete
        </button>
      </div>
    ),
  },
];
