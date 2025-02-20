import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "../darkmode/Dropdown";
type TNavlink = {
  name: string;
  path: string;
};
type TMobileNavbarProps = {
  navLinks: TNavlink[];
};

const MobileNavbar = ({ navLinks }: TMobileNavbarProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6 text-primary" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-4">
          <div className="space-y-4">
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
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
