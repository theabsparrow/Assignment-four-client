import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isLocation = location.pathname;

  return (
    <section>
      <Navbar></Navbar>
      <Outlet></Outlet>
      {isLocation === "/sign-in" || isLocation === "/sign-up" || <Footer />}
    </section>
  );
};

export default Layout;
