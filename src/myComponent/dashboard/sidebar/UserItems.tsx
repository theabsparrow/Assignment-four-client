import {
  MdOutlineFavoriteBorder,
  MdProductionQuantityLimits,
} from "react-icons/md";
import DashboardMenuItems from "../menuItem/DashboardMenuItems";
import { RiMoneyDollarBoxFill } from "react-icons/ri";

const UserItems = () => {
  return (
    <>
      <DashboardMenuItems
        path={"/dashboard/my-orders"}
        label={"My Orders"}
        icon={MdProductionQuantityLimits}
      ></DashboardMenuItems>
      <DashboardMenuItems
        path={"/dashboard/my-wishlist"}
        label={"My Wishlist"}
        icon={MdOutlineFavoriteBorder}
      ></DashboardMenuItems>
      <DashboardMenuItems
        path={"/dashboard/payment-history"}
        label={"Payment History"}
        icon={RiMoneyDollarBoxFill}
      ></DashboardMenuItems>
    </>
  );
};

export default UserItems;
