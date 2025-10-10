import { AiFillHome } from "react-icons/ai";
import { FaBorderAll, FaCarSide, FaUser, FaUserFriends } from "react-icons/fa";
import { IoIosStats, IoMdSettings } from "react-icons/io";
import { MdBrandingWatermark, MdLibraryAdd } from "react-icons/md";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { TbCategoryFilled, TbJewishStarFilled, TbLogs } from "react-icons/tb";

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
    path: "/dashboard/add-car",
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
  {
    name: "All Brands",
    path: "/all-brands",
    icon: MdBrandingWatermark,
  },
  {
    name: "All Categories",
    path: "/all-category",
    icon: TbCategoryFilled,
  },
];

export const userSidebarlinks = [
  {
    name: "My cars",
    path: "/dashboard/user/my-cars",
    icon: FaCarSide,
  },
  {
    name: "Add Car",
    path: "/dashboard/add-car",
    icon: MdLibraryAdd,
  },
  {
    name: "My Wishlist",
    path: "/dashboard/user/my-wishlist",
    icon: TbJewishStarFilled,
  },
  {
    name: "My Orders",
    path: "/dashboard/user/my-orders",
    icon: FaBorderAll,
  },
  {
    name: "Payment History",
    path: "/dashboard/user/payment-history",
    icon: TbJewishStarFilled,
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
  {
    name: "All Brands",
    path: "/all-brands",
    icon: MdBrandingWatermark,
  },
  {
    name: "All Categories",
    path: "/all-category",
    icon: TbCategoryFilled,
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
    path: "/dashboard/my-profile",
    icon: FaUser,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: IoMdSettings,
  },
];
