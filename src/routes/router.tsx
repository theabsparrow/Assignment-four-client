import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import SignIn from "@/pages/SignIn.js";
import SignUp from "@/pages/SignUp";
import MyProfile from "@/pages/myProfile/MyProfile";
import Settings from "@/pages/settings/Settings";

import DashboardLayout from "@/layout/DashboardLayout";
import ForgotPassword from "@/pages/forgotPassword/ForgotPassword";
import VerifyOTP from "@/pages/forgotPassword/VerifyOTP";
import SetNewPassword from "@/pages/forgotPassword/SetNewPassword";
import ProtectedRoute from "@/layout/ProtectedRoute";
import { USER_ROLE } from "@/config/role.const";
import Dashboard from "@/pages/dashboard/Dashboard";
import ManageListing from "@/pages/dashboard/admin/ManageListing";
import UserManagement from "@/pages/dashboard/admin/UserManagement";
import AddCar from "@/pages/dashboard/admin/AddCar";
import OrderHistory from "@/pages/dashboard/admin/OrderHistory";
import SalesReport from "@/pages/dashboard/admin/SalesReport";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "my-profile",
        element: (
          <ProtectedRoute
            roles={[USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]}
          >
            <MyProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute
            roles={[USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]}
          >
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "sign-in",
        element: <SignIn></SignIn>,
      },
      {
        path: "sign-up",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      // admin route
      {
        path: "/dashboard/car-listing",
        element: <ManageListing></ManageListing>,
      },
      {
        path: "/dashboard/manage-users",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "/dashboard/add-car",
        element: <AddCar></AddCar>,
      },
      {
        path: "/dashboard/admin/order-history",
        element: <OrderHistory></OrderHistory>,
      },
      {
        path: "/dashboard/sales-report",
        element: <SalesReport></SalesReport>,
      },
      // user dashboard
    ],
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>,
  },
  {
    path: "/verify-otp",
    element: (
      <ProtectedRoute
        roles={[USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]}
      >
        <VerifyOTP />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/set-newPassword",
    element: (
      <ProtectedRoute
        roles={[USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user]}
      >
        <SetNewPassword />
      </ProtectedRoute>
    ),
  },
]);
