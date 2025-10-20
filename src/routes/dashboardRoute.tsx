import { USER_ROLE } from "@/config/role.const";
import DashboardLayout from "@/layout/DashboardLayout";
import ProtectedRoute from "@/layout/ProtectedRoute";
import AddCar from "@/pages/dashboard/admin/addCar/AddCar";
import CarDetails from "@/pages/dashboard/admin/carDetails/CarDetails";
import CarListing from "@/pages/dashboard/admin/carListing/CarListing";
import ManageBlogs from "@/pages/dashboard/admin/manageBlogs/ManageBlogs";
import OrderDetails from "@/pages/dashboard/admin/orderDetails/OrderDetails";
import OrderHistory from "@/pages/dashboard/admin/orderHistory/OrderHistory";
import SalesReport from "@/pages/dashboard/admin/salesReport/SalesReport";
import Statictics from "@/pages/dashboard/admin/statistic/Statictics";
import UserManagement from "@/pages/dashboard/admin/userManagement/UserManagement";
import UserProfile from "@/pages/dashboard/admin/userProfile/UserProfile";
import Dashboard from "@/pages/dashboard/Dashboard";
import MyBlogs from "@/pages/dashboard/user/myBlogs/MyBlogs";
import MyCarDetails from "@/pages/dashboard/user/myCarDetails/MyCarDetails";
import MyCars from "@/pages/dashboard/user/myCars/MyCars";
import MyPurchase from "@/pages/dashboard/user/myPurchase/MyPurchase";
import MySelling from "@/pages/dashboard/user/mySellings/MySelling";
import Wishlist from "@/pages/dashboard/user/wishList/Wishlist";
import MyProfile from "@/pages/myProfile/MyProfile";
import Settings from "@/pages/settings/Settings";

export const dashboardRoutes = [
  // common routes starts
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
        path: "/dashboard/add-car",
        element: (
          <ProtectedRoute
            roles={[USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]}
          >
            <AddCar />
          </ProtectedRoute>
        ),
      },
      // common routes ends

      // admin routes starts
      {
        path: "/dashboard/admin/statistic",
        element: (
          <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
            <Statictics />
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
        path: "/dashboard/admin/manage-blogs",
        element: (
          <ProtectedRoute
            roles={[USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]}
          >
            <ManageBlogs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-blogs/:id",
        element: (
          <ProtectedRoute
            roles={[USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]}
          >
            <ManageBlogs />
          </ProtectedRoute>
        ),
      },

      {
        path: "/dashboard/admin/order-history",
        element: (
          <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
            <OrderHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin/order-history/:id",
        element: (
          <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin/sales-report",
        element: (
          <ProtectedRoute roles={[USER_ROLE.admin, USER_ROLE.superAdmin]}>
            <SalesReport />
          </ProtectedRoute>
        ),
      },
      // admin routes ends

      // // user routes starts
      {
        path: "/dashboard/my-cars",
        element: (
          <ProtectedRoute roles={[USER_ROLE.user]}>
            <MyCars />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/my-cars/:id",
        element: (
          <ProtectedRoute roles={[USER_ROLE.user]}>
            <MyCarDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/my-purchase",
        element: (
          <ProtectedRoute roles={[USER_ROLE.user]}>
            <MyPurchase />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/my-selling",
        element: (
          <ProtectedRoute roles={[USER_ROLE.user]}>
            <MySelling />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/my-blogs",
        element: (
          <ProtectedRoute roles={[USER_ROLE.user]}>
            <MyBlogs />
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
    ],
  },
];
