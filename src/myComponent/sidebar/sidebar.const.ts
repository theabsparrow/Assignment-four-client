import { AiFillHome } from "react-icons/ai";
import { FaBorderAll, FaCarSide, FaUser, FaUserFriends } from "react-icons/fa";
import { IoIosStats, IoMdSettings } from "react-icons/io";
import {
  MdLibraryAdd,
  MdOutlineDescription,
  MdPermContactCalendar,
} from "react-icons/md";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { TbLogs } from "react-icons/tb";

export const adminSidebarLinks = [
  {
    name: "Dashboard",
    path: "/dashboard/admin/statistic",
    icon: IoIosStats,
  },
  {
    name: "User Management",
    path: "/dashboard/admin/manage-users",
    icon: FaUserFriends,
  },
  {
    name: "Manage cars",
    path: "/dashboard/admin/manage-cars",
    icon: FaCarSide,
  },
  {
    name: "Manage Blogs",
    path: "/dashboard/admin/manage-blogs",
    icon: TbLogs,
  },
  {
    name: "Add Car",
    path: "/dashboard/Add Car",
    icon: MdLibraryAdd,
  },
  {
    name: "Order History",
    path: "/dashboard/admin/order-history",
    icon: FaBorderAll,
  },
  {
    name: "Sales Report",
    path: "/dashboard/admin/sales-report",
    icon: RiMoneyDollarBoxFill,
  },
  {
    name: "All Cars",
    path: "/all-cars",
    icon: FaCarSide,
  },
  {
    name: "All Blogs",
    path: "/blogs",
    icon: TbLogs,
  },
];

export const commonSidebarLinks = [
  {
    name: "Home",
    path: "/",
    icon: AiFillHome,
  },
  {
    name: "Profile",
    path: "/my-profile",
    icon: FaUser,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: IoMdSettings,
  },
  {
    name: "About Us",
    path: "/about-us",
    icon: MdOutlineDescription,
  },
  {
    name: "Contact Us",
    path: "/contact",
    icon: MdPermContactCalendar,
  },
];
