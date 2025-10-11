import { USER_ROLE } from "@/config/role.const";
import DashboardLayout from "@/layout/DashboardLayout";
import ProtectedRoute from "@/layout/ProtectedRoute";
import AddCar from "@/pages/dashboard/admin/addCar/AddCar";
import CarDetails from "@/pages/dashboard/admin/carDetails/CarDetails";
import CarListing from "@/pages/dashboard/admin/carListing/CarListing";
import OrderHistory from "@/pages/dashboard/admin/orderHistory/OrderHistory";
import SalesReport from "@/pages/dashboard/admin/salesReport/SalesReport";
import Statictics from "@/pages/dashboard/admin/statistic/Statictics";
import UserManagement from "@/pages/dashboard/admin/userManagement/UserManagement";
import UserProfile from "@/pages/dashboard/admin/userProfile/UserProfile";
import Dashboard from "@/pages/dashboard/Dashboard";
import MyOrders from "@/pages/dashboard/user/myOrders/MyOrders";
import PaymentHistory from "@/pages/dashboard/user/PaymentHistory";
import Wishlist from "@/pages/dashboard/user/Wishlist";
import MyProfile from "@/pages/myProfile/MyProfile";
import Settings from "@/pages/settings/Settings";

export const dashboardRoutes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute
        roles={[USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]}
      >
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute
            roles={[USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]}
          >
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/my-profile",
        element: (
          <ProtectedRoute
            roles={[USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]}
          >
            <MyProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/settings",
        element: (
          <ProtectedRoute
            roles={[USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]}
          >
            <Settings />
          </ProtectedRoute>
        ),
      },

      {
        path: "/dashboard/admin/manage-cars",
        element: (
          <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
            <CarListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-cars/:id",
        element: (
          <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
            <CarDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin/statistic",
        element: (
          <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
            <Statictics />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-users",
        element: (
          <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
            <UserManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-users/:id",
        element: (
          <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/add-car",
        element: (
          <ProtectedRoute
            roles={[USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]}
          >
            <AddCar />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "/dashboard/admin/order-history",
      //   element: (
      //     <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
      //       <OrderHistory />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/dashboard/admin/sales-report",
      //   element: (
      //     <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
      //       <SalesReport />
      //     </ProtectedRoute>
      //   ),
      // },
      // // user dashboard
      // {
      //   path: "/dashboard/user/my-orders",
      //   element: (
      //     <ProtectedRoute roles={[USER_ROLE.user]}>
      //       <MyOrders />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/dashboard/user/my-wishlist",
      //   element: (
      //     <ProtectedRoute roles={[USER_ROLE.user]}>
      //       <Wishlist />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/dashboard/user/payment-history",
      //   element: (
      //     <ProtectedRoute roles={[USER_ROLE.user]}>
      //       <PaymentHistory />
      //     </ProtectedRoute>
      //   ),
      // },
    ],
  },
];
