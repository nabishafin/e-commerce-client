import Footer from "../components/customcomponent/Footer";

import { Outlet } from "react-router-dom";
import { Navbar } from "../components/customcomponent/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
