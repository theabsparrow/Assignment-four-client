import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import SignIn from "@/pages/SignIn.js";
import SignUp from "@/pages/SignUp";
import MyProfile from "@/pages/myProfile/MyProfile";
import Settings from "@/pages/settings/Settings";
import ForgotPassword from "@/pages/forgotPassword/ForgotPassword";
import VerifyOTP from "@/pages/forgotPassword/VerifyOTP";
import SetNewPassword from "@/pages/forgotPassword/SetNewPassword";
import ProtectedRoute from "@/layout/ProtectedRoute";
import { USER_ROLE } from "@/config/role.const";
import Error from "@/pages/error/Error";
import { dashboardRoutes } from "./dashboardRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error></Error>,
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
  ...dashboardRoutes,
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
