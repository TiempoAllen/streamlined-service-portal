import React from "react";
import LoginHeader from "../UI/LoginHeader";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <LoginHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
