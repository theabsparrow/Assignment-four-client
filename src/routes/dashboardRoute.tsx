import DashboardLayout from "@/layout/DashboardLayout";
import AddCar from "@/pages/dashboard/admin/AddCar";
import ManageListing from "@/pages/dashboard/admin/ManageListing";
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
        path: "/dashboard/order-history",
        element: <OrderHistory></OrderHistory>,
      },
      {
        path: "/dashboard/sales-report",
        element: <SalesReport></SalesReport>,
      },
      // user dashboard
      {
        path: "/dashboard/my-orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/my-wishlist",
        element: <Wishlist></Wishlist>,
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
    ],
  },
];
