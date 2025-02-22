import { Home } from "lucide-react";
import DashboardMenuItems from "../menuItem/DashboardMenuItems";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import useMyProfile from "@/hook/useMyProfile";
import MobileNavbar from "@/myComponent/mobileNavbar/MobileNavbar";

const Sidebar = () => {
  const myprofile = useMyProfile(["name", "profileImage"]) || undefined;
  const navLinks = [
    { name: "User Management", path: "/" },
    {
      name: "Order History",
      path: "/order-history",
    },
    {
      name: "Add Car",
      path: "/add-car",
    },
  ];

  return (
    <>
      <nav className="w-full dark:bg-gray-800 bg-white shadow-md sticky top-0 z-50 md:hidden py-4 px-4 flex justify-between items-center">
        <div className="cursor-pointer">
          <Link to="/">
            <img className="w-36" src={logo} alt=" Lambo car logo" />
          </Link>
        </div>
        <MobileNavbar
          navLinks={navLinks}
          userInfo={myprofile.myProfile}
          name={myprofile.myProfile?.name}
          profile={myprofile.myProfile?.profileImage}
        ></MobileNavbar>
      </nav>
      <div className="dark:bg-gray-900 bg-white dark:text-gray-200 hidden md:block  transition-all duration-500 w-64 shadow-lg min-h-screen sticky top-0 z-50">
        <div className="cursor-pointer flex justify-center mt-6">
          <Link to="/">
            <img className="w-36 lg:w-48" src={logo} alt=" Lambo car logo" />
          </Link>
        </div>
        <div className="flex justify-center mt-6">
          <img
            className="w-52 h-52 rounded-full border border-secondary"
            src={myprofile?.myProfile?.profileImage}
          />
        </div>
        <nav className="mt-6 ">
          <DashboardMenuItems
            path={"/homcvbge"}
            label={"Home"}
            icon={Home}
          ></DashboardMenuItems>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
