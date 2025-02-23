import { CgProfile } from "react-icons/cg";
import DashboardMenuItems from "../menuItem/DashboardMenuItems";
import { IoSettingsSharp } from "react-icons/io5";

const SharedItems = () => {
  return (
    <>
      <DashboardMenuItems
        path={"/my-profile"}
        label={"My Profile"}
        icon={CgProfile}
      ></DashboardMenuItems>
      <DashboardMenuItems
        path={"/settings"}
        label={"Settings"}
        icon={IoSettingsSharp}
      ></DashboardMenuItems>
    </>
  );
};

export default SharedItems;
