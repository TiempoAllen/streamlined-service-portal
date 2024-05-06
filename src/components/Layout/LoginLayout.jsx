import React from "react";
import LoginHeader from "../UI/LoginHeader";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <>
      <LoginHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LoginLayout;
