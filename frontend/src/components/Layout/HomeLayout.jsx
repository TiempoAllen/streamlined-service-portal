import React from "react";
import MainNavigation from "../../components/UI/MainNavigation";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
