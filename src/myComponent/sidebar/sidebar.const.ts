import { AiFillHome } from "react-icons/ai";
import {
  FaBorderAll,
  FaCarSide,
  FaSellsy,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import { IoIosStats, IoMdSettings } from "react-icons/io";
import { IoNewspaperSharp } from "react-icons/io5";
import { MdBrandingWatermark, MdLibraryAdd, MdSell } from "react-icons/md";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import {
  TbArticleFilled,
  TbCategoryFilled,
  TbJewishStarFilled,
  TbLogs,
} from "react-icons/tb";

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
    name: "Add Car",
    path: "/dashboard/add-car",
    icon: MdLibraryAdd,
  },
  {
    name: "My Cars",
    path: "/dashboard/my-cars",
    icon: FaCarSide,
  },
  {
    name: "My Purchase",
    path: "/dashboard/my-purchase",
    icon: MdSell,
  },
  {
    name: "My Selling",
    path: "/dashboard/my-selling",
    icon: FaSellsy,
  },
  {
    name: "My Wishlist",
    path: "/dashboard/my-wishlist",
    icon: TbJewishStarFilled,
  },
  {
    name: "My Blogs",
    path: "/dashboard/my-blogs",
    icon: IoNewspaperSharp,
  },
  {
    name: "All Cars",
    path: "/all-cars",
    icon: FaCarSide,
  },
  {
    name: "All Blogs",
    path: "/blogs",
    icon: TbArticleFilled,
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
