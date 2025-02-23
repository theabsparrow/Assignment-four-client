import DashboardMenuItems from "../menuItem/DashboardMenuItems";
import { FaThList, FaUserEdit } from "react-icons/fa";
import { RiChatHistoryFill } from "react-icons/ri";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { TbReportMoney } from "react-icons/tb";

const AdminItems = () => {
  return (
    <>
      <DashboardMenuItems
        path={"/dashboard/manage-users"}
        label={"User Management"}
        icon={FaUserEdit}
      ></DashboardMenuItems>
      <DashboardMenuItems
        path={"/dashboard/car-listing"}
        label={"Car Listing"}
        icon={FaThList}
      ></DashboardMenuItems>
      <DashboardMenuItems
        path={"/dashboard/add-car"}
        label={"Add Car"}
        icon={BsDatabaseFillAdd}
      ></DashboardMenuItems>
      <DashboardMenuItems
        path={"/dashboard/order-history"}
        label={"Order History"}
        icon={RiChatHistoryFill}
      ></DashboardMenuItems>
      <DashboardMenuItems
        path={"/dashboard/sales-report"}
        label={"Sales Report"}
        icon={TbReportMoney}
      ></DashboardMenuItems>
    </>
  );
};

export default AdminItems;
