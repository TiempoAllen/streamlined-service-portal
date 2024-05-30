import React from "react";
import Login, { action as loginAction } from "./pages/Login/Login";
import Register, { action as registerAction } from "./pages/Register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage, { loader as homeLoader } from "./pages/HomePage/HomePage";
import LoginLayout from "./components/Layout/LoginLayout";
import HomeLayout from "./components/Layout/HomeLayout";
import RequestPage, {
  action as requestAction,
} from "./pages/RequestPage/RequestPage";
import Error from "./pages/Error/Error";
import { action as logoutAction } from "./pages/Login/Logout";
import { checkAuthLoader } from "./util/auth";
import Approval from "./pages/Approval/Approval";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      { index: true, element: <Login />, action: loginAction },
      { path: "register", element: <Register />, action: registerAction },
    ],
  },
  {
    path: "/home/:userId",
    element: <HomeLayout />,
    id: "home",
    loader: homeLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: checkAuthLoader,
      },
      {
        path: "request",
        element: <RequestPage />,
        loader: checkAuthLoader,
        action: requestAction,
      },
      {
        path: "approval",
        element: <Approval />,
        loader: checkAuthLoader,
        action: requestAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
