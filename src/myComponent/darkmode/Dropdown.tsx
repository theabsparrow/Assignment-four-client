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
    <div>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-full flex justify-between items-center px-4 py-3 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <span className="font-semibold">Display & Theme</span>
        <IoIosArrowForward
          className={`transform transition-transform ${
            dropdownOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      {/* Dropdown Content */}
      {dropdownOpen && (
        <div className=" p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-x border-gray-300 shadow-md">
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
                  darkMode ? "border-blue-500 bg-blue-500" : "border-gray-400"
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
