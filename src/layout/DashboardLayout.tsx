import Sidebar from "@/myComponent/dashboard/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <div className="md:flex md:px-16 bg-[#f0f3f8] dark:bg-gray-800">
        <Sidebar></Sidebar>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
