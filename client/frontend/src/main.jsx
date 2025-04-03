import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MenuLayout from "./router/MenuLayout.jsx";
import Home, { loader as initDataLoad } from "./router/Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Festival, { loader as festivalListLoad } from "./router/Festival";
import TourSpot, { loader as touristSpotListLoad } from "./router/TourSpot";
import Review from "./router/Review";
import Login, { action as loginAction } from "./router/Login";
import SignIn, { action as signInAction } from "./router/SignIn.Jsx";
import MyPage from "./router/MyPage.Jsx";
import ModalContents from "./components/ModalContents.jsx";
import TourSpotDetail from "./router/TourSpotDetail.jsx";
import FestivalDetail from "./router/FestivalDetail.jsx";
import AuthProvider from "./AuthProvider.jsx";
import MyReviewPage from "./router/MyReviewPage.jsx";
import MyBookmark from "./router/MyBookmark.jsx";
import WriteReview from "./router/WriteReview.jsx";
import ReviewDetail from "./router/ReviewDetail.jsx";

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
        children: [
          {
            path: "/member/login/:path",
            element: <ModalContents />,
          },
        ],
        action: loginAction,
      },
      {
        path: "/member/join",
        element: <SignIn />,
        action: signInAction,
      },
      {
        path: "/member/myPage",
        element: <MyPage />,
        children: [
          {
            path: "/member/myPage/:path",
            element: <ModalContents />,
          },
        ],
      },
      {
        path: "/member/myPage/myreview",
        element: <MyReviewPage />,
      },
      {
        path: "/member/myPage/mybookmark",
        element: <MyBookmark />,
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
      {
        path: "/review/:id",
        element: <ReviewDetail />,
      },
      {
        path: "/review/write",
        element: <WriteReview />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
