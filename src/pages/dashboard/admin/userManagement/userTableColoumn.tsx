import { ColumnDef } from "@tanstack/react-table";
import { TUserTable } from "./usermanagement.interface";
import { USER_ROLE } from "@/config/role.const";
import { Link } from "react-router-dom";

export const userTableColumns = (
  user: any,
  handleModal: (userData: { id: string; role: string }, action: string) => void
): ColumnDef<TUserTable>[] => [
  {
    accessorKey: "name",
    header: "Full Name",
    cell: (info) => (
      <span>
        {info.row.original.name.firstName} {info.row.original.name.lastName}
      </span>
    ),
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phoneNumber", header: "Phone Number" },
  { accessorKey: "gender", header: "Gender" },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) =>
      user?.userRole === USER_ROLE.superAdmin ? (
        <button
          onClick={() =>
            handleModal(
              { id: row.original._id, role: row.original.role },
              "role"
            )
          }
          className={`px-2 py-1 rounded-xl font-inter ${
            row.original.role === USER_ROLE.user && "bg-blue-200 text-blue-600"
          } ${
            row.original.role === USER_ROLE.admin &&
            "bg-yellow-200 text-yellow-700"
          }
            ${
              row.original.role === USER_ROLE.superAdmin &&
              "bg-green-200 text-green-700"
            }`}
        >
          {row.original.role}
        </button>
      ) : (
        <span
          className={`px-2 py-1 rounded-xl font-inter ${
            row.original.role === USER_ROLE.user && "bg-blue-200 text-blue-600"
          } ${
            row.original.role === USER_ROLE.admin &&
            "bg-yellow-200 text-yellow-700"
          }
            ${
              row.original.role === USER_ROLE.superAdmin &&
              "bg-green-200 text-green-700"
            }`}
        >
          {row.original.role}
        </span>
      ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <button
        onClick={() =>
          handleModal(
            { id: row.original._id, role: row.original.role },
            "status"
          )
        }
        className={`px-2 py-1 rounded-xl font-inter ${
          row.original.status === "active"
            ? "bg-green-300 text-green-700"
            : "bg-red-200 text-red-700"
        }`}
      >
        {row.original.status}
      </button>
    ),
  },
  {
    accessorKey: "isDelete",
    header: "IsDeleted",
    cell: ({ row }) =>
      user?.userRole === USER_ROLE.superAdmin && (
        <span
          className={`px-2 py-1 rounded-xl font-inter ${
            row.original.isDeleted
              ? "bg-red-500 text-white"
              : "bg-green-800 text-white"
          }`}
        >
          {row.original.isDeleted ? "true" : "false"}
        </span>
      ),
  },
  {
    header: "Remove",
    cell: ({ row }) =>
      user?.userRole === USER_ROLE.superAdmin && (
        <div>
          <button
            onClick={() =>
              handleModal(
                { id: row.original._id, role: row.original.role },
                "deleted"
              )
            }
            className="px-2 py-1 bg-red-500 text-white rounded font-inter"
          >
            delete
          </button>
        </div>
      ),
  },
  {
    header: "View",
    cell: ({ row }) => (
      <div>
        <Link
          to={`/user-details/${row.original?.email}`}
          className="px-2 py-1 bg-blue-500 text-white rounded font-inter"
        >
          details
        </Link>
      </div>
    ),
  },
];
