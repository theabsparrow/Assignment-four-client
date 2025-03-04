import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import { userInitalState } from "./userManagement.const";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { userTableColumns } from "./userTableColoumn";
import UserModalComponent from "./userModalComponent";
import UserFilterComponent from "./UserFilterComponent";
import Pagination from "@/myComponent/pagination/Pagination";

const UserManagement = () => {
  const user = useAppSelector(currentUser);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState(userInitalState);
  const [sort, setSelectedSortingOrder] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [modalState, setModalState] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

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

  const handleMOdal = (id: string, name: string) => {
    setModalState("");
    setUserId(id);
    setIsModalOpen(true);
    setModalState(name);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserId(null);
    setModalState("");
  };

  const columns = userTableColumns(user, handleMOdal);
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  if (isLoading) return <p>Loading cars...</p>;

  return (
    <div className="container mx-auto p-4 font-inter">
      {isModalOpen && (
        <>
          <UserModalComponent
            isModalOpen={isModalOpen}
            modalState={modalState}
            closeModal={closeModal}
            errorMessage={errorMessage}
            setIsModalOpen={setIsModalOpen}
          ></UserModalComponent>
        </>
      )}

      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        <h1 className="text-xl">Total users: {users.length}</h1>
      </div>

      <UserFilterComponent
        searchText={searchText}
        setSearchText={setSearchText}
        filter={filter}
        handleFilterChange={handleFilterChange}
        sort={sort}
        setSelectedSortingOrder={setSelectedSortingOrder}
        handelReset={handelReset}
      ></UserFilterComponent>

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
      <Pagination meta={meta} handlePageChange={handlePageChange}></Pagination>
    </div>
  );
};

export default UserManagement;
