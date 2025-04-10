import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MenuLayout from "./router/MenuLayout.jsx";
import Home, { loader as initDataLoad } from "./router/Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Festival, { loader as festivalListLoad } from "./router/Festival";
import TourSpot, { loader as touristSpotListLoad } from "./router/TourSpot";
import Review, { loader as loadReviews } from "./router/Review";
import Login, { action as loginAction } from "./router/Login";
import SignIn, { action as signInAction } from "./router/SignIn.Jsx";
import MyPage from "./router/MyPage.Jsx";
import ModalContents from "./components/ModalContents.jsx";
import TourSpotDetail from "./router/TourSpotDetail.jsx";
import FestivalDetail from "./router/FestivalDetail.jsx";
import AuthProvider from "./AuthProvider.jsx";
import MyReviewPage, {
  loader as loadMyReview,
} from "./router/MyReviewPage.jsx";
import MyBookmark, { loader as loadBookmark } from "./router/MyBookmark.jsx";
import WriteReview, {
  loader as loadPlaces,
  action as reviewAction,
} from "./router/WriteReview.jsx";
import ReviewDetail, {
  loader as loadReview,
  action as replyAction,
} from "./router/ReviewDetail.jsx";

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
        path: "/member/updateMember",
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
        loader: loadMyReview,
      },
      {
        path: "/member/myPage/mybookmark",
        element: <MyBookmark />,
        loader: loadBookmark,
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
        loader: loadReviews,
      },
      {
        path: "/review/:id",
        element: <ReviewDetail />,
        loader: loadReview,
        action: replyAction,
      },
      {
        path: "/review/write",
        element: <WriteReview />,
        loader: loadPlaces,
        action: reviewAction,
      },
      {
        path: "/review/edit",
        element: <WriteReview />,
        loader: loadPlaces,
        action: reviewAction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
