import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import SignIn from "@/pages/SignIn.js";
import SignUp from "@/pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn></SignIn>,
  },
  {
    path: "/sign-up",
    element: <SignUp></SignUp>,
  },
]);
