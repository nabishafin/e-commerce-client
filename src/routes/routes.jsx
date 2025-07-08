import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import ProductsDetailsPage from "../pages/products/ProductsDetailsPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/singleproducts/:id",
        element: <ProductsDetailsPage />,
      },
    ],
  },
]);

export default routes;
