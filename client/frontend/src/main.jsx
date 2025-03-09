import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MenuLayout from "./router/MenuLayout.jsx";
import Home from "./router/Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
