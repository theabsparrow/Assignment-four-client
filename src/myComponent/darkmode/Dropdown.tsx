import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const Dropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );
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
  return (
    <div className="relative lg:static">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-full flex justify-between items-center px-2 py-1 lg:px-4 lg:py-3 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <span className="lg:font-semibold text-sm lg:text-base">
          Display & Theme
        </span>
        <IoIosArrowForward
          className={`transform transition-transform ${
            dropdownOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      {/* Dropdown Content */}
      {dropdownOpen && (
        <div className="p-2 lg:p-4 w-full bg-gray-50 dark:bg-gray-800 rounded-lg border-x border-gray-300 shadow-md lg:space-y-2 absolute lg:static">
          <h3 className="lg:font-semibold text-sm lg:text-base">Theme</h3>
          <div className="space-y-2 ">
            <label className="flex items-center gap-2 cursor-pointer text-sm lg:text-base">
              <input
                type="radio"
                name="darkMode"
                className="hidden"
                checked={darkMode}
                onChange={() => toggleDarkMode(true)}
              />
              <div
                className={`w-4 h-4 lg:w-5 lg:h-5 border-2 rounded-full ${
                  darkMode ? "border-blue-500 bg-blue-500" : "border-gray-400"
                }`}
              ></div>
              <span>On</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-sm lg:text-base">
              <input
                type="radio"
                name="darkMode"
                className="hidden"
                checked={!darkMode}
                onChange={() => toggleDarkMode(false)}
              />
              <div
                className={`w-4 h-4 lg:w-5 lg:h-5 border-2 rounded-full ${
                  !darkMode ? "border-blue-500 bg-blue-500" : "border-gray-400"
                }`}
              ></div>
              <span>Off</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
