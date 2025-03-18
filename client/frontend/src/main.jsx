import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MenuLayout from "./router/MenuLayout.jsx";
import Home, { loader as initDataLoad } from "./router/Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Festival, { loader as festivalListLoad } from "./router/Festival";
import TourSpot, { loader as touristSpotListLoad } from "./router/TourSpot";
import Review from "./router/Review";
import Login from "./router/Login";
import SignIn from "./router/SignIn.Jsx";
import MyPage from "./router/MyPage.Jsx";
import ModalContents from "./components/ModalContents.jsx";
import TourSpotDetail from "./router/TourSpotDetail.jsx";
import FestivalDetail from "./router/FestivalDetail.jsx";

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
        path: "/tourist",
        element: <TourSpot />,
        loader: touristSpotListLoad,
      },
      {
        path: "/tourist/:id",
        element: <TourSpotDetail />,
      },
      {
        path: "/festival",
        element: <Festival />,
        loader: festivalListLoad,
      },
      {
        path: "/festival/:id",
        element: <FestivalDetail />,
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
