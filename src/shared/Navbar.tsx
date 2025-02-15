import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );
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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  const toggleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);
    localStorage.setItem("darkMode", enabled ? "enabled" : "disabled");
    document.documentElement.classList.toggle("dark", enabled);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "Sign In", path: "/sign-in" },
    { name: "Sign Up", path: "/sign-up" },
  ];
  return (
    <nav className="w-full dark:bg-gray-800 bg-white shadow-md fixed top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-16">
        <div>
          <Link to="/">
            <img className="w-56" src={logo} alt=" Lambo car logo" />
          </Link>
        </div>

        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `transition-colors font-inter ${
                  (link.name === "Sign In" || link.name === "Sign Up") &&
                  "hidden"
                } ${
                  isActive
                    ? "font-semibold text-deepRed"
                    : "hover:text-secondary"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDisplay(!display);
            }}
            className="text-5xl"
          >
            <CgProfile className="hover:text-primary" />
          </button>
        </div>

        {display && <div className="fixed inset-0 bg-transparent z-40"></div>}

        {display && (
          <div
            id="profile-container"
            className="absolute top-[82px] right-16 w-96 py-6 dark:bg-gray-800 bg-white shadow-md z-50 px-6 rounded-lg"
          >
            <h1 className="text-2xl font-inter font-bold text-center">
              My Lambo Car
            </h1>
            <div className="mt-4 px-8 py-10 border border-gray-300 rounded-lg ">
              <p className="text-center font-inter">
                Welcome. Here you'll have access to all your vehicles or view
                your future saved vehicles.
              </p>
              <div className="mt-8 flex justify-between items-center">
                <Link
                  to="/sign-in"
                  className="bg-secondary hover:bg-deepRed duration-500  text-white px-6 py-2 font-inter font-semibold rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className=" text-secondary hover:text-deepRed duration-500  font-inter font-bold flex items-center gap-1"
                >
                  Sign Up <IoIosArrowForward />
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex justify-between items-center px-4 py-3 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <span className="font-semibold">Display & Accessibility</span>
                <IoIosArrowForward
                  className={`transform transition-transform ${
                    dropdownOpen ? "rotate-90" : ""
                  }`}
                />
              </button>

              {/* Dropdown Content */}
              {dropdownOpen && (
                <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                  <h3 className="font-semibold mb-2">Theme</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="darkMode"
                        className="hidden"
                        checked={darkMode}
                        onChange={() => toggleDarkMode(true)}
                      />
                      <div
                        className={`w-5 h-5 border-2 rounded-full ${
                          darkMode
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-400"
                        }`}
                      ></div>
                      <span>On</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="darkMode"
                        className="hidden"
                        checked={!darkMode}
                        onChange={() => toggleDarkMode(false)}
                      />
                      <div
                        className={`w-5 h-5 border-2 rounded-full ${
                          !darkMode
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-400"
                        }`}
                      ></div>
                      <span>Off</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6 text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-4">
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `block text-lg transition-colors ${
                        isActive
                          ? "font-semibold text-deepRed"
                          : "hover:text-secondary"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                <div>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className=" w-full flex justify-between items-center px-4 py-3 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <span className="font-semibold">
                      Display & Accessibility
                    </span>
                    <IoIosArrowForward
                      className={`transform transition-transform ${
                        dropdownOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                      <h3 className="font-semibold mb-2">Theme</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="darkMode"
                            className="hidden"
                            checked={darkMode}
                            onChange={() => toggleDarkMode(true)}
                          />
                          <div
                            className={`w-5 h-5 border-2 rounded-full ${
                              darkMode
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                            }`}
                          ></div>
                          <span>On</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="darkMode"
                            className="hidden"
                            checked={!darkMode}
                            onChange={() => toggleDarkMode(false)}
                          />
                          <div
                            className={`w-5 h-5 border-2 rounded-full ${
                              !darkMode
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                            }`}
                          ></div>
                          <span>Off</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
