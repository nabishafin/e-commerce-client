import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import path from "path";
import Home from "../pages/home/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default routes;
