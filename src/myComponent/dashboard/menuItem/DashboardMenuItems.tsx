import { NavLink } from "react-router-dom";
import { TDashboardMenuItems } from "./menuItem.interface";

const DashboardMenuItems = ({
  path,
  label,
  icon: Icon,
}: TDashboardMenuItems) => {
  return (
    <div>
      <NavLink
        to={path}
        className={({ isActive }) =>
          ` flex items-center justify-between px-8 gap-1 font-inter font-semibold ${
            isActive
              ? "bg-secondary hover:bg-deepRed dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-[#f0f3f8] duration-500 p-3 rounded-md"
              : "hover:bg-[#f0f3f8] duration-500 p-3 dark:hover:bg-gray-800 border-y "
          }  `
        }
      >
        {label} {Icon && <Icon />}
      </NavLink>
    </div>
  );
};

export default DashboardMenuItems;
