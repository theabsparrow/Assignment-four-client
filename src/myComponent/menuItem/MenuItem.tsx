import { NavLink } from "react-router-dom";
import { TMenuItems } from "./menuItems.interface";

const MenuItem = ({
  setDisplay,
  display,
  path,
  label,
  icon: Icon,
}: TMenuItems) => {
  return (
    <div>
      <NavLink
        onClick={(e) => {
          e.stopPropagation();
          if (setDisplay && typeof display !== "undefined") {
            setDisplay(!display);
          }
        }}
        to={path}
        className="bg-secondary hover:bg-deepRed dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary duration-500 flex items-center gap-1  text-white px-3 py-2 font-inter font-semibold rounded-lg"
      >
        {label} {Icon && <Icon />}
      </NavLink>
    </div>
  );
};

export default MenuItem;
