import {
  TOrderStatus,
  TTrackingStatus,
} from "@/pages/orderDetails/orderDetails.interface";
import { ColumnDef } from "@tanstack/react-table";
import {
  TDeliveryMethod,
  TOrderInfo,
  TPaymentMethod,
  TPaymentOption,
  TTransactionStatus,
} from "../../user/myOrders/myOrder.interface";
import {
  deliveryMethodStyles,
  orderStatus,
  orderStatusStyles,
  paymentMethodStyles,
  paymentOptionStyles,
  trackingStatusStyles,
  transactionStatusStyles,
} from "../../user/myOrders/myOrder.const";
import { Link } from "react-router-dom";
import { useState } from "react";

type TColumnProps = {
  handleDelete: (id: string) => void;
  changeOrderStatus: (id: string, newStatus: TOrderStatus) => void;
};

export const allOrderTableComumn = ({
  handleDelete,
  changeOrderStatus,
}: TColumnProps): ColumnDef<TOrderInfo>[] => [
  { accessorKey: "orderID", header: "Order ID" },
  { accessorKey: "userEmail", header: "Email" },
  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      const value = row?.original?.status as TOrderStatus;
      const [status, setStatus] = useState<TOrderStatus>(value);

      const handleChange = (newStatus: TOrderStatus) => {
        setStatus(newStatus);
        changeOrderStatus(row?.original?._id, newStatus);
        setIsOpen(false);
      };
      return (
        <>
          <div className="relative">
            <span
              onClick={() => {
                if (value !== "Cancelled") {
                  setIsOpen(!isOpen);
                }
              }}
              className={`px-2 py-1 rounded font-medium text-sm ${
                value !== "Cancelled"
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-60"
              } ${orderStatusStyles[value]}`}
            >
              {value as TOrderStatus}
            </span>

            {isOpen && value !== "Cancelled" && (
              <div className="absolute z-50 mt-1 bg-white shadow-lg border rounded w-32 ">
                {orderStatus.map((item) => (
                  <div
                    key={item}
                    onClick={() => handleChange(item)}
                    className={`px-3 py-1 text-sm cursor-pointer hover:bg-gray-100  ${
                      item === status
                        ? "font-semibold text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
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
    accessorKey: "tracking.trackingStatus",
    header: "Tracking status",
    cell: ({ row }) => {
      const value = row.original.tracking?.trackingStatus as TTrackingStatus;
      return value ? (
        <span
          className={`px-2 py-1 rounded font-medium text-sm ${trackingStatusStyles[value]}`}
        >
          {value}
        </span>
      ) : (
        <span className="text-gray-500 italic">—</span>
      );
    },
  },
  { accessorKey: "deliveryCost", header: "Delivery cost" },
  { accessorKey: "totalPrice", header: "Total price" },
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
