import { TOrderStatus } from "@/pages/orderDetails/orderDetails.interface";
import { ColumnDef } from "@tanstack/react-table";
import {
  TDeliveryMethod,
  TOrderInfo,
  TPaymentMethod,
  TPaymentOption,
  TTrackingStatus,
  TTransactionStatus,
} from "../../user/myOrders/myOrder.interface";
import {
  deliveryMethodStyles,
  paymentMethodStyles,
  paymentOptionStyles,
  transactionStatusStyles,
} from "../../user/myOrders/myOrder.const";
import { Link } from "react-router-dom";

import ChangeOrderStatus from "./ChangeOrderStatus";
import ChangeTrackingStatus from "./ChangeTrackingStatus";

type TColumnProps = {
  handleDelete: (id: string) => void;
  changeOrderStatus: (id: string, newStatus: TOrderStatus) => void;
  changeTrackingStatus: (id: string, newStatus: TTrackingStatus) => void;
};

export const allOrderTableComumn = ({
  handleDelete,
  changeOrderStatus,
  changeTrackingStatus,
}: TColumnProps): ColumnDef<TOrderInfo>[] => [
  { accessorKey: "orderID", header: "Order ID" },
  { accessorKey: "userEmail", header: "Email" },
  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row }) => {
      const value = row?.original?.status as TOrderStatus;
      const id = row?.original?._id as string;
      return (
        <>
          <ChangeOrderStatus
            value={value}
            id={id}
            changeOrderStatus={changeOrderStatus}
          ></ChangeOrderStatus>
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
      const id = row?.original?._id as string;

      return value ? (
        <ChangeTrackingStatus
          value={value}
          id={id}
          changeTrackingStatus={changeTrackingStatus}
        />
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
