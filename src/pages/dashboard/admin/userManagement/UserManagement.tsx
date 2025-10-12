import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import TableSceleton from "@/myComponent/loader/TableSceleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentUserFlter, setUserPage } from "@/redux/features/user/userSlice";
import { userTableColumns } from "./userTableColoumn";
import { TExtendedUser } from "@/interface/userInterface/userInfo";
import Table from "@/myComponent/table/Table";
import Pagination from "@/myComponent/pagination/Pagination";
import UserManagementFIltering from "./UserManagementFIltering";

const UserManagement = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(currentUserFlter);
  const { data, isLoading } = useGetAllUsersQuery(query);
  const { meta, result, totalUser } = data?.data || {};

  const handlePageChange = (page: number) => {
    dispatch(setUserPage(page));
  };
  const column = userTableColumns();
  if (isLoading) return <TableSceleton rows={11} columns={9}></TableSceleton>;

  return (
    <>
      {!(result as TExtendedUser[])?.length && (
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-r from-pink-100 to-blue-100 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            No User Available Right Now
          </h1>
        </div>
      )}
      <section className=" px-2 font-inter space-y-6 ">
        <UserManagementFIltering total={totalUser} />
        <div className="w-full ">
          <Table data={result} columns={column} />
          {result?.length > 0 && (
            <div className="mt-8 md:mt-10">
              <Pagination meta={meta} handlePageChange={handlePageChange} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default UserManagement;
