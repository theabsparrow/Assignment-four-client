import logo from "../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { USER_ROLE } from "@/config/role.const";
import { LogoutFunc } from "@/utills/logout";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import {
  adminSidebarLinks,
  commonSidebarLinks,
  userSidebarlinks,
} from "./sidebar.const";
import { RiLogoutBoxRFill } from "react-icons/ri";
import ResponsiveSidebar from "./ResponsiveSidebar";

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

  return (
    <>
      <section className="hidden lg:flex flex-col justify-between after:dark:bg-gray-900 bg-white dark:text-gray-200 transition-all duration-500 w-64 shadow-lg h-screen py-6 space-y-6 sticky top-0 z-20">
        <div className="cursor-pointer flex justify-center">
          <Link to="/">
            <img className="w-44" src={logo} alt=" Lambo car logo" />
          </Link>
        </div>
        <nav>
          <h1 className="px-4 text-sm">MENU</h1>
          <div className="flex flex-col gap-1">
            {(user?.userRole === USER_ROLE.admin ||
              user?.userRole === USER_ROLE.superAdmin) &&
              adminSidebarLinks.map((link, i) => (
                <NavLink
                  key={i}
                  to={link.path}
                  className={({ isActive }) =>
                    ` flex items-center gap-3 font-inter font-medium px-4 py-1 rounded-md ${
                      isActive
                        ? "bg-secondary hover:bg-deepRed dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-[#f0f3f8] duration-500 "
                        : "hover:bg-secondary dark:hover:bg-[#f0f3f8] duration-500"
                    }  `
                  }
                >
                  <span>{<link.icon />}</span>
                  <span>{link.name}</span>
                </NavLink>
              ))}
            {user?.userRole === USER_ROLE.user &&
              userSidebarlinks.map((link, i) => (
                <NavLink
                  key={i}
                  to={link.path}
                  className={({ isActive }) =>
                    ` flex items-center gap-3 font-inter font-medium px-4 py-1 rounded-md ${
                      isActive
                        ? "bg-secondary hover:bg-deepRed dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-[#f0f3f8] duration-500 "
                        : "hover:bg-secondary dark:hover:bg-[#f0f3f8] duration-500"
                    }  `
                  }
                >
                  <span>{<link.icon />}</span>
                  <span>{link.name}</span>
                </NavLink>
              ))}
          </div>
        </nav>
        <nav>
          <h1 className="px-4 text-sm">GENERAL</h1>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              {commonSidebarLinks.map((link, i) => (
                <NavLink
                  key={i}
                  to={link.path}
                  className={({ isActive }) =>
                    ` flex items-center gap-3 font-inter font-medium px-4 py-1 rounded-md ${
                      isActive
                        ? "bg-secondary hover:bg-deepRed dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-[#f0f3f8] duration-500 "
                        : "hover:bg-secondary dark:hover:bg-[#f0f3f8] duration-500"
                    }  `
                  }
                >
                  <span>{<link.icon />}</span>
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 font-inter font-medium px-4 py-1 rounded-md hover:bg-secondary dark:hover:bg-[#f0f3f8] duration-500"
            >
              {" "}
              <RiLogoutBoxRFill /> Logout
            </button>
          </div>
        </nav>
      </section>
      <section className="lg:hidden w-full dark:bg-gray-800 bg-white shadow-md sticky top-0 z-50 flex items-center justify-between">
        <div>
          <Link to="/">
            <img className="w-36 lg:w-56 " src={logo} alt=" Lambo car logo" />
          </Link>
        </div>
        <ResponsiveSidebar />
      </section>
    </>
  );
};

export default Sidebar;
