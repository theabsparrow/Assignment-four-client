import { USER_ROLE } from "@/config/role.const";

export const getDashboardNavlinks = (role: string) => {
  return [
    {
      name:
        role === USER_ROLE.admin || role === USER_ROLE.superAdmin
          ? "User Management"
          : "My Orders",
      path:
        role === USER_ROLE.admin || role === USER_ROLE.superAdmin
          ? "/dashboard/manage-users"
          : "/dashboard/my-orders",
    },
    {
      name:
        role === USER_ROLE.admin || role === USER_ROLE.superAdmin
          ? "Car Listing"
          : "My Wishlist",
      path:
        role === USER_ROLE.admin || role === USER_ROLE.superAdmin
          ? "/dashboard/car-listing"
          : "/dashboard/my-wishlist",
    },
    {
      name:
        role === USER_ROLE.admin || role === USER_ROLE.superAdmin
          ? "Add Car"
          : "Payment History",
      path:
        role === USER_ROLE.admin || role === USER_ROLE.superAdmin
          ? "/dashboard/add-car"
          : "/dashboard/payment-history",
    },
    ...(role === USER_ROLE.admin || role === USER_ROLE.superAdmin
      ? [{ name: "Order History", path: "/dashboard/order-history" }]
      : []),
    ...(role === USER_ROLE.admin || role === USER_ROLE.superAdmin
      ? [{ name: "Sales Report", path: "/dashboard/sales-report" }]
      : []),
    {
      name: "My Profile",
      path: "/my-profile",
    },
    {
      name: "Settings",
      path: "/settings",
    },
  ];
};
