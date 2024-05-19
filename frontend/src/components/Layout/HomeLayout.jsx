import React from "react";
import MainNavigation from "../../components/UI/MainNavigation";
import { Outlet, useRouteLoaderData } from "react-router-dom";

const HomeLayout = () => {
  const user = useRouteLoaderData("home");
  return (
    <>
      <MainNavigation user={user} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
