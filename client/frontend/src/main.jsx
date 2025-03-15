import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MenuLayout from "./router/MenuLayout.jsx";
import Home, { loader as initDataLoad } from "./router/Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Festival from "./router/Festival";
import TourSpot from "./router/TourSpot";
import Course from "./router/Course";
import Review from "./router/Review";
import Login from "./router/Login";
import SignIn from "./router/SignIn.Jsx";
import MyPage from "./router/MyPage.Jsx";
import ModalContents from "./components/ModalContents.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: initDataLoad,
      },
      {
        path: "/member/login",
        element: <Login />,
        children: [{ path: "/member/login/check", element: <ModalContents /> }],
      },
      {
        path: "/member/join",
        element: <SignIn />,
      },
      {
        path: "/member/myPage",
        element: <MyPage />,
      },
      {
        path: "/tourspot",
        element: <TourSpot />,
      },
      {
        path: "/festival",
        element: <Festival />,
      },
      {
        path: "/course",
        element: <Course />,
      },
      {
        path: "/review",
        element: <Review />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
