import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "../myComponent/darkmode/Dropdown";
import { DialogContent } from "@radix-ui/react-dialog";
import { LogoutFunc } from "@/utills/logout";
import { useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import profileLogo from "../assets/profile-icon.png";
import profileIcon from "../assets/profile-photo.png";

type Tuser = {
  name: {
    firstName: string;
    lastName: string;
  };
  profileImage?: string;
};

const MobileNavbar = ({ userInfo }: { userInfo?: Tuser }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All cars", path: "/all-cars" },
    { name: "Brands", path: "/all-brands" },
    { name: "Categories", path: "/all-category" },
    { name: "Blogs", path: "/blogs" },
    {
      name: userInfo ? "My Profile" : "Sign In",
      path: userInfo ? "/my-profile" : "/sign-in",
    },
    {
      name: userInfo ? "Dashboard" : "Sign up",
      path: userInfo ? "/dashboard" : "/sign-up",
    },
    ...(userInfo ? [{ name: "Settings", path: "/settings" }] : []),
    { name: "About Us", path: "/about-us" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    return LogoutFunc({
      e,
      open,
      setOpen,
      dispatch,
      navigate,
      logout,
    });
  };

  return (
    <section className="md:hidden font-inter">
      <Sheet open={open} onOpenChange={setOpen}>
        <DialogContent>mobile navbar</DialogContent>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            {userInfo ? (
              <>
                {userInfo?.profileImage ? (
                  <img
                    className="w-10 h-10 rounded-full "
                    src={userInfo?.profileImage}
                  />
                ) : (
                  <img className="w-10 h-10 rounded-full " src={profileIcon} />
                )}
              </>
            ) : (
              <img className="w-10 h-10 rounded-full " src={profileLogo} />
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="py-10">
          <div className="flex flex-col justify-between h-full">
            <div className="space-y-4">
              {userInfo && (
                <div className="px-4">
                  <h1 className="font-bold text-lg text">
                    {userInfo?.name?.firstName} {userInfo?.name?.lastName}
                  </h1>
                </div>
              )}
              <Dropdown></Dropdown>
            </div>
            <div className="space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  onClick={() => setOpen(!open)}
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `block text-lg transition-colors px-4 ${
                      isActive
                        ? "font-semibold text-deepRed"
                        : "hover:text-secondary"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              {userInfo! && (
                <button
                  onClick={handleLogout}
                  className="block text-lg transition-colors px-4 hover:text-secondary"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavbar;
