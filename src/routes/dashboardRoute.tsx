import { USER_ROLE } from "@/config/role.const";
import DashboardLayout from "@/layout/DashboardLayout";
import ProtectedRoute from "@/layout/ProtectedRoute";
import AddCar from "@/pages/dashboard/admin/addCar/AddCar";
import CarListing from "@/pages/dashboard/admin/carListing/CarListing";
import OrderHistory from "@/pages/dashboard/admin/OrderHistory";
import SalesReport from "@/pages/dashboard/admin/SalesReport";
import UserManagement from "@/pages/dashboard/admin/UserManagement";
import Dashboard from "@/pages/dashboard/Dashboard";
import MyOrders from "@/pages/dashboard/user/MyOrders";
import PaymentHistory from "@/pages/dashboard/user/PaymentHistory";
import Wishlist from "@/pages/dashboard/user/Wishlist";

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
      // admin route
      {
        path: "/dashboard/car-listing",
        element: (
          <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
            <CarListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
            <UserManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/add-car",
        element: (
          <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
            <AddCar />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/order-history",
        element: (
          <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
            <OrderHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/sales-report",
        element: (
          <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
            <SalesReport />
          </ProtectedRoute>
        ),
      },
      // user dashboard
      {
        path: "/dashboard/my-orders",
        element: (
          <ProtectedRoute roles={[USER_ROLE.user]}>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/my-wishlist",
        element: (
          <ProtectedRoute roles={[USER_ROLE.user]}>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <ProtectedRoute roles={[USER_ROLE.user]}>
            <PaymentHistory />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
