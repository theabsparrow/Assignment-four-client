import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isCarDetailsPage = location.pathname.startsWith("/details/");
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      {!isCarDetailsPage && <Footer />}
    </div>
  );
};

export default Layout;
