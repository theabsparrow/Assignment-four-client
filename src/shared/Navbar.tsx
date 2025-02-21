/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import useMyProfile from "@/hook/useMyProfile";
import { MdDashboard, MdOutlineLogout } from "react-icons/md";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "sonner";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { logOut } from "@/redux/features/auth/authSlice";
import { baseApi } from "@/redux/api/baseApi";
import MenuItem from "@/myComponent/menuItem/MenuItem";
import { IoSettingsSharp } from "react-icons/io5";
import Dropdown from "@/myComponent/darkmode/Dropdown";
import MobileNavbar from "@/myComponent/mobileNavbar/MobileNavbar";

const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const myprofile =
    useMyProfile(["name", "profileImage", "email"]) || undefined;
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

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    const toastId = toast.loading("signing out....");
    e.stopPropagation();
    setDisplay(!display);
    try {
      const res = await logout(myprofile?.myProfile?.email);
      if (res.data.success) {
        dispatch(logOut());
        toast.success("successfully signed out", {
          id: toastId,
          duration: 3000,
        });
        dispatch(baseApi.util.resetApiState());
        navigate("/sign-in");
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: myprofile.myProfile ? "My Profile" : "Sign In",
      path: myprofile.myProfile ? "/my-profile" : "/ sign-in",
    },
    {
      name: myprofile.myProfile ? "Dashboard" : "Sign Up",
      path: myprofile.myProfile ? "/sadhboard" : "/sign-up",
    },
    ...(myprofile.myProfile ? [{ name: "Settings", path: "/settings" }] : []),
  ];

  return (
    <nav className="w-full dark:bg-gray-800 bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-16">
        <div className="cursor-pointer">
          <Link to="/">
            <img className="w-36 lg:w-56" src={logo} alt=" Lambo car logo" />
          </Link>
        </div>

        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors font-inter ${
                isActive ? "font-semibold text-deepRed" : "hover:text-secondary"
              }`
            }
          >
            Home
          </NavLink>
        </div>

        <div className="hidden md:flex">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDisplay(!display);
            }}
            className="text-5xl"
          >
            {myprofile.myProfile?.profileImage ? (
              <img
                className="w-11 h-11 rounded-full border border-secondary"
                src={myprofile.myProfile?.profileImage}
              />
            ) : (
              <CgProfile className="hover:text-primary" />
            )}
          </button>
        </div>

        {display && <div className="fixed inset-0 bg-transparent z-40"></div>}

        {display && (
          <div
            id="profile-container"
            className="absolute top-[82px] right-16 w-96 py-6 border-x border-gray-400 dark:bg-gray-800 bg-white shadow-md z-50 px-6 rounded-lg"
          >
            <h1 className="text-2xl font-inter font-bold text-center">
              {myprofile.myProfile ? (
                <span className="text-secondary">
                  {myprofile.myProfile?.name?.firstName}{" "}
                  {myprofile.myProfile?.name?.lastName}
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
                {myprofile.myProfile ? (
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
                {myprofile.myProfile ? (
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
              <Dropdown></Dropdown>
            </div>

            {myprofile.myProfile && (
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
        <MobileNavbar navLinks={navLinks}></MobileNavbar>
      </div>
    </nav>
  );
};

export default Navbar;
