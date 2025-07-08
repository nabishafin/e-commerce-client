// src/layouts/MainLayout.jsx
import Footer from "../components/customcomponent/Footer";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/customcomponent/Navbar";
import CartSidebar from "../components/customcomponent/CartSidebar";


const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
      <Footer />

      {/* Global Cart Sidebar */}
      <CartSidebar />
    </div>
  );
};

export default MainLayout