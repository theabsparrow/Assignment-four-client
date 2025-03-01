import Sidebar from "@/myComponent/dashboard/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { USER_ROLE } from "@/config/role.const";

const DashboardLayout = () => {
  return (
    <>
      <div className="md:flex md:px-16 bg-[#f0f3f8] dark:bg-gray-800">
        <ProtectedRoute
          roles={[USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]}
        >
          <Sidebar />
        </ProtectedRoute>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
