/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdDashboard, MdOutlineLogout } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import MenuItem from "@/myComponent/menuItem/MenuItem";
import { IoSettingsSharp } from "react-icons/io5";
import Dropdown from "@/myComponent/darkmode/Dropdown";
import MobileNavbar from "@/shared/MobileNavbar";
import { LogoutFunc } from "@/utills/logout";
import { TMyProfileQUery } from "@/interface/navbar.types";
import { useMyProfileQuery } from "@/redux/features/user/userApi";
import { currentUser } from "@/redux/features/auth/authSlice";
import { NavbarLinks } from "./navbar.const";
import profileLofo from "../assets/profile-icon.png";
import profileIcon from "../assets/profile-photo.png";

const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();
  // rtk query options
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "navbar";
  const { data, isLoading } = useMyProfileQuery(query);
  const profileInfo = data?.data;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (display && !target.closest("#profile-container")) {
        setDisplay(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [display]);

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    return LogoutFunc({
      e,
      dispatch,
      navigate,
      setDisplay,
      logout,
      display,
    });
  };

  return (
    <nav className="w-full dark:bg-gray-800 bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-2 lg:px-16">
        <div>
          <Link to="/">
            <img className="w-36 lg:w-56 " src={logo} alt=" Lambo car logo" />
          </Link>
        </div>

        <div className="hidden md:flex space-x-3 lg:space-x-6">
          {NavbarLinks.map((link, i) => (
            <NavLink
              key={i}
              to={link?.path}
              className={({ isActive }) =>
                `transition-colors font-inter ${
                  isActive
                    ? "font-semibold text-deepRed"
                    : "hover:text-secondary"
                }`
              }
            >
              {link?.name}
            </NavLink>
          ))}
        </div>

        {isLoading ? (
          <div className="hidden md:flex">
            <div className="w-11 h-11 rounded-full border border-secondary bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </div>
        ) : (
          <div className="hidden md:flex">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDisplay(!display);
              }}
              className="text-5xl"
            >
              {profileInfo ? (
                <>
                  {profileInfo?.profileImage ? (
                    <img
                      className="w-11 h-11 rounded-full "
                      src={profileInfo?.profileImage}
                    />
                  ) : (
                    <img
                      className="w-12 h-12 rounded-full "
                      src={profileIcon}
                    />
                  )}
                </>
              ) : (
                <img className="w-11 h-11 rounded-full " src={profileLofo} />
              )}
            </button>
          </div>
        )}

        {display && <div className="fixed inset-0 bg-transparent z-40"></div>}

        {display && (
          <div
            id="profile-container"
            className="absolute top-[76px] hidden md:flex flex-col right-16 w-96 py-6 border-x border-gray-400 dark:bg-gray-800 bg-white shadow-md z-50 px-6 rounded-lg"
          >
            <h1 className="text-2xl font-inter font-bold text-center">
              {user ? (
                <span className="text-secondary">
                  {profileInfo?.name?.firstName} {profileInfo?.name?.lastName}
                </span>
              ) : (
                "My Lambo Car"
              )}
            </h1>
            <div className="mt-4 px-4 py-10 border border-gray-300 rounded-lg ">
              <p className="text-center font-inter">
                Welcome. Here you'll have access to all your vehicles or view
                your future saved vehicles.
              </p>
              <div className="mt-8 flex justify-between items-center">
                {user ? (
                  <MenuItem
                    display={display}
                    setDisplay={setDisplay}
                    path={"/my-profile"}
                    label={"My Profile"}
                  ></MenuItem>
                ) : (
                  <MenuItem
                    display={display}
                    setDisplay={setDisplay}
                    path={"/sign-in"}
                    label={"Sign In"}
                    icon={IoIosArrowForward}
                  ></MenuItem>
                )}
                {user ? (
                  <MenuItem
                    display={display}
                    setDisplay={setDisplay}
                    path={"/dashboard"}
                    label={"Dashboard"}
                    icon={MdDashboard}
                  ></MenuItem>
                ) : (
                  <MenuItem
                    display={display}
                    setDisplay={setDisplay}
                    path={"/sign-up"}
                    label={"Sign Up"}
                    icon={IoIosArrowForward}
                  ></MenuItem>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Dropdown />
            </div>

            {user && (
              <div className="mt-4 px-5 flex flex-col justify-center items-start space-y-2">
                <MenuItem
                  display={display}
                  setDisplay={setDisplay}
                  path={"/settings"}
                  label={"Settings"}
                  icon={IoSettingsSharp}
                ></MenuItem>
                <button
                  onClick={handleLogout}
                  className=" text-secondary px-3 hover:text-deepRed hover:scale-110 duration-500 font-inter font-bold flex items-center gap-1"
                >
                  Logout <MdOutlineLogout className="text-deepRed rotate-180" />
                </button>
              </div>
            )}
          </div>
        )}
        <MobileNavbar userInfo={profileInfo} />
      </div>
    </nav>
  );
};

export default Navbar;
