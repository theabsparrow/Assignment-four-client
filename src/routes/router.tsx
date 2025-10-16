import Layout from "@/layout/Layout";
import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router-dom";
import SignIn from "@/pages/auth/SignIn.js";
import SignUp from "@/pages/auth/register/SignUp";
import MyProfile from "@/pages/myProfile/MyProfile";
import Settings from "@/pages/settings/Settings";
import ForgotPassword from "@/pages/forgotPassword/ForgotPassword";
import SetNewPassword from "@/pages/forgotPassword/SetNewPassword";
import ProtectedRoute from "@/layout/ProtectedRoute";
import { USER_ROLE } from "@/config/role.const";
import Error from "@/pages/error/Error";
import { dashboardRoutes } from "./dashboardRoute";
import CarDetails from "@/pages/carDetails/CarDetails";
import AllCars from "@/pages/allCars/AllCars";
import AboutUs from "@/pages/about us/AboutUs";
import Blogs from "@/pages/blogs/Blogs";
import Contacts from "@/pages/contact/Contacts";
import CheckOut from "@/pages/checkOut/CheckOut";
import AllBrands from "@/pages/allBrands/AllBrands";
import VerifyOrder from "@/pages/verifyOrder/VerifyOrder";
import OrderDetails from "@/pages/orderDetails/OrderDetails";
import BlogDetails from "@/pages/blogDetails/BlogDetails";
import AllCategories from "@/pages/allCategories/AllCategories";
import MyCars from "@/pages/dashboard/user/myCars/MyCars";
import MyPurchase from "@/pages/dashboard/user/myPurchase/MyPurchase";
import MySelling from "@/pages/dashboard/user/mySellings/MySelling";
import MyBlogs from "@/pages/dashboard/user/myBlogs/MyBlogs";
import MyReaction from "@/pages/dashboard/myReactions/MyReaction";
import MyComment from "@/pages/dashboard/myComment/MyComment";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
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
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },

      {
        path: "all-cars",
        element: <AllCars />,
      },
      {
        path: "all-cars/:id",
        element: <CarDetails />,
      },
      {
        path: "all-cars/checkout/:id",
        element: (
          <ProtectedRoute
            roles={[USER_ROLE.user, USER_ROLE.admin, USER_ROLE.superAdmin]}
          >
            <CheckOut />
          </ProtectedRoute>
        ),
      },

      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blogs/:id",
        element: <BlogDetails />,
      },
      {
        path: "contact",
        element: <Contacts />,
      },
      {
        path: "all-brands",
        element: <AllBrands />,
      },
      {
        path: "all-category",
        element: <AllCategories />,
      },

      {
        path: "order/verify",
        element: (
          <ProtectedRoute roles={[USER_ROLE.user]}>
            <VerifyOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "order/:id",
        element: (
          <ProtectedRoute
            roles={[USER_ROLE.user, USER_ROLE.admin, USER_ROLE.superAdmin]}
          >
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-cars",
        element: (
          <ProtectedRoute roles={[USER_ROLE.user, USER_ROLE.admin]}>
            <MyCars />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-purchase",
        element: (
          <ProtectedRoute roles={[USER_ROLE.user, USER_ROLE.admin]}>
            <MyPurchase />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-selling",
        element: (
          <ProtectedRoute roles={[USER_ROLE.user, USER_ROLE.admin]}>
            <MySelling />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-blogs",
        element: (
          <ProtectedRoute roles={[USER_ROLE.user, USER_ROLE.admin]}>
            <MyBlogs />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-reactions",
        element: (
          <ProtectedRoute
            roles={[USER_ROLE.user, USER_ROLE.admin, USER_ROLE.superAdmin]}
          >
            <MyReaction />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-comments",
        element: (
          <ProtectedRoute
            roles={[USER_ROLE.user, USER_ROLE.admin, USER_ROLE.superAdmin]}
          >
            <MyComment />
          </ProtectedRoute>
        ),
      },
    ],
  },
  ...dashboardRoutes,
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  {
    path: "/set-newPassword",
    element: <SetNewPassword />,
  },
]);
