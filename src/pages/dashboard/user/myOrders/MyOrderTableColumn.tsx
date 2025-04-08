import { ColumnDef } from "@tanstack/react-table";
import {
  TDeliveryMethod,
  TOrderInfo,
  TOrderStatus,
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

export const myOrderTableColumn = (
  handleDelete: (id: string) => void
): ColumnDef<TOrderInfo>[] => [
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
