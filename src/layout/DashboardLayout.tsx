import Sidebar from "@/myComponent/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { USER_ROLE } from "@/config/role.const";

const DashboardLayout = () => {
  return (
    <>
      <section className="lg:flex bg-[#f0f3f8] dark:bg-gray-800">
        <ProtectedRoute
          roles={[USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]}
        >
          <Sidebar />
        </ProtectedRoute>
        <div className="w-full">
          <Outlet></Outlet>
        </div>
      </section>
    </>
  );
};

export default DashboardLayout;
