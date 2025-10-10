import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "../darkmode/Dropdown";
import { USER_ROLE } from "@/config/role.const";
import {
  adminSidebarLinks,
  commonSidebarLinks,
  userSidebarlinks,
} from "./sidebar.const";
import { LogoutFunc } from "@/utills/logout";

const ResponsiveSidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    return LogoutFunc({
      e,
      dispatch,
      navigate,
      logout,
    });
  };

  return (
    <section className="lg:hidden font-inter">
      <Sheet open={open} onOpenChange={setOpen}>
        <DialogContent>mobile sidebar</DialogContent>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <GiHamburgerMenu />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="py-10">
          <div className="flex flex-col justify-between h-full">
            <Dropdown></Dropdown>
            <nav>
              <h1 className="px-4 text-xs">MENU</h1>
              <div className="flex flex-col gap-1">
                {user?.userRole === USER_ROLE.admin ||
                  (user?.userRole === USER_ROLE.superAdmin &&
                    adminSidebarLinks.map((link, i) => (
                      <NavLink
                        key={i}
                        to={link.path}
                        className={({ isActive }) =>
                          `font-inter text-sm px-2 py-1 rounded-md ${
                            isActive
                              ? "bg-gray-300 hover:bg-gray-400 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-[#f0f3f8] duration-500 "
                              : "hover:bg-gray-400 dark:hover:bg-[#f0f3f8] duration-500"
                          }  `
                        }
                      >
                        {link.name}
                      </NavLink>
                    )))}
                {user?.userRole === USER_ROLE.user &&
                  userSidebarlinks.map((link, i) => (
                    <NavLink
                      key={i}
                      to={link.path}
                      className={({ isActive }) =>
                        `font-inter text-sm px-2 py-1 rounded-md ${
                          isActive
                            ? "bg-gray-300 hover:bg-gray-400 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-[#f0f3f8] duration-500 "
                            : "hover:bg-gray-400 dark:hover:bg-[#f0f3f8] duration-500"
                        }  `
                      }
                    >
                      <span>{link.name}</span>
                    </NavLink>
                  ))}
              </div>
            </nav>
            <nav>
              <h1 className="px-4 text-xs">GENERAL</h1>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                  {commonSidebarLinks.map((link, i) => (
                    <NavLink
                      key={i}
                      to={link.path}
                      className={({ isActive }) =>
                        `font-inter text-sm px-2 py-1 rounded-md ${
                          isActive
                            ? "bg-gray-300 hover:bg-gray-400 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-[#f0f3f8] duration-500 "
                            : "hover:bg-gray-400 dark:hover:bg-[#f0f3f8] duration-500"
                        }  `
                      }
                    >
                      <span>{link.name}</span>
                    </NavLink>
                  ))}
                </div>
                <button
                  onClick={handleLogout}
                  className="font-inter text-sm px-2 py-1 rounded-md hover:bg-gray-400 dark:hover:bg-[#f0f3f8] duration-500 flex items-center"
                >
                  {" "}
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default ResponsiveSidebar;
