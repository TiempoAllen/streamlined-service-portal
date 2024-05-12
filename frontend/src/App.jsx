import React from "react";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginLayout from "./components/Layout/LoginLayout";
import HomeLayout from "./components/Layout/HomeLayout";
import RequestPage from "./pages/RequestPage/RequestPage";
import Error from "./pages/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "home",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "request",
        element: <RequestPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
