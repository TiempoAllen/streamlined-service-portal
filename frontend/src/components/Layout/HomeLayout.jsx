import React from "react";
import MainNavigation from "../../components/UI/MainNavigation";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import classes from "./HomeLayout.module.css";

const HomeLayout = () => {
  const user = useRouteLoaderData("home");
  return (
    <>
      <MainNavigation user={user} />
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
