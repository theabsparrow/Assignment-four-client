import { ColumnDef } from "@tanstack/react-table";
import { TCarTable } from "./carListing.interface";
import { Link } from "react-router-dom";

export const carTableColumns = (
  handleDelete: (id: string) => void
): ColumnDef<TCarTable>[] => [
  { accessorKey: "brand", header: "Brand" },
  { accessorKey: "model", header: "Model" },
  { accessorKey: "category", header: "Category" },
  {
    accessorKey: "price",
    header: "Price",
    cell: (info) => `৳${(info.getValue() as number).toLocaleString()}`,
  },
  { accessorKey: "year", header: "Year" },
  {
    accessorKey: "inStock",
    header: "In Stock",
    cell: ({ row }) => (
      <span
        className={`${
          row.original.inStock
            ? "text-green-700 bg-green-300 rounded-xl p-1"
            : "text-red-700 bg-red-300 rounded-xl p-1"
        }`}
      >
        {row.original.inStock ? "Available" : "Not Available"}
      </span>
    ),
  },
  {
    header: "View",
    cell: ({ row }) => (
      <div>
        <Link
          to={`/details/${row.original?._id}`}
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
