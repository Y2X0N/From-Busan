import React from "react";
import ReactDOM from "react-dom/client";
import Posts, { loader as loadData } from "./router/Posts";
import NewPost, { action as newPostAction } from "./router/NewPost";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import RootLayout from "./router/RootLayout";
import PostDetails, {
  loader as loadPostDetails,
} from "./components/PostDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Posts />,
        loader: loadData,
        children: [
          { path: "create-post", element: <NewPost />, action: newPostAction },
          { path: ":id", element: <PostDetails />, loader: loadPostDetails },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
