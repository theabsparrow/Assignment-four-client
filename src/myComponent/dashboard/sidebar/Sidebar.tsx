import logo from "../../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import MobileNavbar from "@/myComponent/mobileNavbar/MobileNavbar";
import AdminItems from "./AdminItems";
import { USER_ROLE } from "@/config/role.const";
import { MdOutlineLogout } from "react-icons/md";
import { LogoutFunc } from "@/utills/logout";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import UserItems from "./UserItems";
import SharedItems from "./SharedItems";
import { getDashboardNavlinks } from "@/utills/getDashboardNavLinks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { TUSerRole } from "@/interface/userInfo";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    return LogoutFunc({
      e,
      dispatch,
      navigate,
      logout,
    });
  };

  const role = user?.userRole;
  const navLinks = getDashboardNavlinks(role as TUSerRole);

  return (
    <>
      <nav className="w-full dark:bg-gray-800 bg-white shadow-md sticky top-0 z-50 md:hidden py-4 px-4 flex justify-between items-center font-inter">
        <div className="cursor-pointer">
          <Link to="/">
            <img className="w-36" src={logo} alt=" Lambo car logo" />
          </Link>
        </div>
      </nav>
      <div className="dark:bg-gray-900 bg-white dark:text-gray-200 hidden md:block  transition-all duration-500 w-64 shadow-lg min-h-screen sticky top-0 z-50">
        <div className="cursor-pointer flex justify-center mt-6">
          <Link to="/">
            <img className="w-36 lg:w-48" src={logo} alt=" Lambo car logo" />
          </Link>
        </div>

        <nav className="mt-6">
          {(user?.userRole === USER_ROLE.admin ||
            user?.userRole === USER_ROLE.superAdmin) && (
            <AdminItems></AdminItems>
          )}
          {user?.userRole === USER_ROLE.user && <UserItems></UserItems>}
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
