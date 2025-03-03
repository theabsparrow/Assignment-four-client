import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";
import { userInitalState } from "./userManagement.const";
import { TUserTable } from "./usermanagement.interface";
import { Link } from "react-router-dom";
import { USER_ROLE } from "@/config/role.const";
import {
  genders,
  iSDelete,
  roles,
  statuses,
} from "@/myComponent/formInput/formInput.const";

const UserManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState(userInitalState);
  const [sort, setSelectedSortingOrder] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const queryParams = {
    fields: [
      "name",
      "email",
      "phoneNumber",
      "gender",
      "role",
      "status",
      "isDeleted",
    ],
    filter: filter || {},
    searchTerm: searchText || "",
    sort: sort || "",
    page: page || 1,
    limit: limit || 10,
  };

  const { data, isLoading } = useGetAllUsersQuery(queryParams);
  const users = data?.data || [];
  const meta = data?.meta;
  const pageNumbers = Array.from({ length: meta?.totalPage }, (_, i) => i + 1);

  const handleFilterChange = (name: string, value: string) => {
    console.log(name, value);
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handelReset = () => {
    setFilter(userInitalState);
    setSearchText("");
    setSelectedSortingOrder("");
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setLimit(meta?.limit);
  };

  const columns: ColumnDef<TUserTable>[] = [
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
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded-xl font-inter ${
            info.row.original.role === USER_ROLE.user &&
            "bg-blue-200 text-blue-600"
          } ${
            info.row.original.role === USER_ROLE.admin &&
            "bg-yellow-200 text-yellow-700"
          } ${
            info.row.original.role === USER_ROLE.superAdmin &&
            "bg-green-200 text-green-700"
          }`}
        >
          {info.row.original.role}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded font-inter ${
            info.getValue() === "active"
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }`}
        >
          {info.row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "isDelete",
      header: "IsDeleted",
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded font-inter ${
            info.row.original.isDeleted
              ? "bg-red-500 text-white"
              : "bg-green-800 text-white"
          }`}
        >
          {info.row.original.isDeleted ? "true" : "false"}
        </span>
      ),
    },
    {
      header: "Remove",
      cell: ({ row }) => (
        <div>
          <button
            // onClick={() => handleDelete(row.original.email)}
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
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  if (isLoading) return <p>Loading cars...</p>;

  return (
    <div className="container mx-auto p-4 font-inter">
      {/* {isModalOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex items-center justify-center "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this car?
            </h3>
            {errorMessage && (
              <h1 className="text-red-600 text-sm text-center mb-4">
                {errorMessage}
              </h1>
            )}
            <div className="flex justify-end gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )} */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        <h1 className="text-xl">Total users: {users.length}</h1>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, email or phone"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded outline-none"
        />
        <select
          value={filter.gender}
          onChange={(e) => {
            const value = e.target.value;
            handleFilterChange("gender", value);
          }}
          className="border p-2 rounded outline-none"
        >
          <option value="">Filter by gender</option>
          {genders.map((gender) => (
            <option key={gender.label} value={gender.value as string}>
              {gender.label as string}
            </option>
          ))}
        </select>

        <select
          value={filter.role}
          onChange={(e) => {
            const value = e.target.value;
            handleFilterChange("role", value);
          }}
          className="border p-2 rounded outline-none"
        >
          <option value="">Filter by role</option>
          {roles.map((role) => (
            <option key={role.label} value={role.value as string}>
              {role.label as string}
            </option>
          ))}
        </select>

        <select
          value={filter.status}
          onChange={(e) => {
            const value = e.target.value;
            handleFilterChange("status", value);
          }}
          className="border p-2 rounded outline-none"
        >
          <option value="">Filter by status</option>
          {statuses.map((status) => (
            <option key={status.label} value={status.value as string}>
              {status.label}
            </option>
          ))}
        </select>

        <select
          value={filter.isDeleted}
          onChange={(e) => {
            const value = e.target.value;
            handleFilterChange("isDeleted", value);
          }}
          className="border p-2 rounded outline-none"
        >
          <option value="">Filter by delete</option>
          {iSDelete.map((deleteInfo) => (
            <option key={deleteInfo.label} value={deleteInfo.value as string}>
              {deleteInfo.label as string}
            </option>
          ))}
        </select>

        {/* <select
          value={sort}
          onChange={(e) => setSelectedSortingOrder(e.target.value)}
          className="border p-2 rounded outline-none"
        >
          <option value="select category">Sort by</option>
          {sortingOrders.map((sortingOrder: TValue) => (
            <option
              key={sortingOrder.value}
              value={sortingOrder.value}
              className="dark:bg-gray-700"
            >
              {sortingOrder.label}
            </option>
          ))}
        </select> */}
        <div>
          <button
            onClick={handelReset}
            className="bg-secondary dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition "
          >
            Reset
          </button>
        </div>
      </div>

      {/* ✅ Table */}
      <div className="overflow-x-auto  md:w-[70vw]">
        <table className=" border-collapse border border-gray-300 w-full">
          {/* ✅ Table Head */}
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-2 border text-left cursor-pointer"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {/* Sort Indicator */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* ✅ Table Body */}
          <tbody className="text-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(meta.page - 1)}
          disabled={meta?.page === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <div>
          {pageNumbers.map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-lg font-semibold border
                ${
                  meta?.page === pageNumber
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }
              `}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(meta.page + 1)}
          disabled={meta?.page === meta.totalPage}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
