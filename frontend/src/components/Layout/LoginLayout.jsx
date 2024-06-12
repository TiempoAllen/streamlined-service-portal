import React from "react";
import LoginHeader from "../UI/LoginHeader";
import { Outlet } from "react-router-dom";
import Footer from "../UI/Footer";

const LoginLayout = () => {
  return (
    <>
      <LoginHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LoginLayout;
