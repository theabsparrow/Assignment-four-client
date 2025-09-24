import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "../darkmode/Dropdown";
import { DialogContent } from "@radix-ui/react-dialog";
import { LogoutFunc } from "@/utills/logout";
import { useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
type TNavlink = {
  name: string;
  path: string;
};
type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
type TMobileNavbarProps = {
  navLinks: TNavlink[];
  userInfo?: Record<string, unknown>;
  name?: TUserName;
  profile?: string;
};

const MobileNavbar = ({
  navLinks,
  userInfo,
  name,
  profile,
}: TMobileNavbarProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = userInfo?.email as string;

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    return LogoutFunc({
      e,
      open,
      setOpen,
      dispatch,
      navigate,
      email,
      logout,
    });
  };

  return (
    <div className="md:hidden font-inter">
      <Sheet open={open} onOpenChange={setOpen}>
        <DialogContent>mobile navbar</DialogContent>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6 text-primary" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-4">
          <div className="space-y-4 border border-red-600">
            {profile && (
              <div className="px-4">
                <img
                  className="w-12 h-12 rounded-full border border-secondary"
                  src={profile}
                  alt=""
                />
              </div>
            )}
            {name && (
              <div className="px-4">
                <h1 className="font-bold text-lg text">
                  {name?.firstName} {name?.lastName}
                </h1>
              </div>
            )}
            {navLinks.map((link: TNavlink) => (
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
            <Dropdown></Dropdown>
            {userInfo! && (
              <button
                onClick={handleLogout}
                className="block text-lg transition-colors px-4 hover:text-secondary"
              >
                {" "}
                Logout
              </button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
