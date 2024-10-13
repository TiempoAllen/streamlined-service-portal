import React from "react";
import Login, { action as loginAction } from "./pages/Login/Login";
import Register from "./pages/Register/Register";
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
import Approval, { loader as approvalLoader } from "./pages/Approval/Approval";
import Profile, { loader as profileLoader } from "./pages/Profile/Profile";
import Chat, { loader as chatLoader } from "./pages/Chat/Chat";
import ChatNotification, {loader as chatNotificationLoader } from "./components/UI/ChatNotification.jsx"
import Record from "./pages/Record/Record";
import Technician, {
  loader as technicianLoader,
} from "./pages/Technician/Technician";

// const technicianApprovalLoader = async () => {
//   const [requests, technicians] = await Promise.all([
//     approvalLoader(),
//     technicianLoader(),
//   ]);
//   return {
//     requests,
//     technicians,
//   };
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      { index: true, element: <Login />, action: loginAction },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/home/:user_id",
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
        id: "approval",
        element: <Approval />,
        loader: approvalLoader,
      },
      {
        path: "record",
        element: <Record />,
        loader: checkAuthLoader,
      },
      {
        path: "profile",
        id: "profile",
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: "chat",
        id: "chat",
        element: <Chat />,
        loader: chatLoader,
      },
      { 
        path: "technician",
        id: "technician",
        element: <Technician />,
        loader: technicianLoader,
      },
      { 
        path: "chatNotification",
        id: "chatNotification",
        element: <ChatNotification />,
        loader: chatNotificationLoader,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

const App = () => {
  return (
    <div id="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
