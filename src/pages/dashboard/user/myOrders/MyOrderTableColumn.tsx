import { ColumnDef } from "@tanstack/react-table";
import { TOrderInfo } from "./myOrder.interface";
import { Link } from "react-router-dom";

export const myOrderTableColumn = (
  handleDelete: (id: string) => void
): ColumnDef<TOrderInfo>[] => [
  { accessorKey: "orderID", header: "Order ID" },
  { accessorKey: "status", header: "Order status" },
  { accessorKey: "transactionStatus", header: "Transaction Status" },
  { accessorKey: "deliveryMethod", header: "Delivery Method" },
  { accessorKey: "paymentMethod", header: "Payment Method" },
  { accessorKey: "paymentOption", header: "Payment Option" },

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
