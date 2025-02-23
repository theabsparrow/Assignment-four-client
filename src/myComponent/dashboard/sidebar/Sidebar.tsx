import logo from "../../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import useMyProfile from "@/hook/useMyProfile";
import MobileNavbar from "@/myComponent/mobileNavbar/MobileNavbar";
import AdminItems from "./AdminItems";
import { USER_ROLE } from "@/config/role.const";
import { MdOutlineLogout } from "react-icons/md";
import { LogoutFunc } from "@/utills/logout";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import UserItems from "./UserItems";
import SharedItems from "./SharedItems";
import { getDashboardNavlinks } from "@/utills/getDashboardNavLinks";

const Sidebar = () => {
  const myprofile =
    useMyProfile(["name", "profileImage", "role", "email"]) || undefined;
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    const email = myprofile?.myProfile?.email;
    return LogoutFunc({
      e,
      dispatch,
      navigate,
      email,
      logout,
    });
  };

  const role = myprofile?.myProfile?.role;
  const navLinks = getDashboardNavlinks(role);

  return (
    <>
      <nav className="w-full dark:bg-gray-800 bg-white shadow-md sticky top-0 z-50 md:hidden py-4 px-4 flex justify-between items-center font-inter">
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
        <nav className="mt-6">
          {/* admin */}
          {(myprofile.myProfile?.role === USER_ROLE.admin ||
            myprofile.myProfile?.role === USER_ROLE.superAdmin) && (
            <AdminItems></AdminItems>
          )}
          {/* user */}
          {myprofile.myProfile?.role === USER_ROLE.user && (
            <UserItems></UserItems>
          )}
          {/* shared */}
          <SharedItems></SharedItems>
          <div className="flex items-center justify-between px-8 gap-1 font-inter font-semibold hover:bg-[#f0f3f8] duration-500 p-3 dark:hover:bg-gray-800 border-y cursor-pointer">
            <button onClick={handleLogout}>Logout</button> <MdOutlineLogout />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
