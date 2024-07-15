import React from "react";
import MainNavigation from "../../components/UI/MainNavigation";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import classes from "./HomeLayout.module.css";
import Footer from "../UI/Footer";

const HomeLayout = () => {
  const user = useRouteLoaderData("home");
  return (
    <>
      <MainNavigation user={user} />
      <main className={classes.home_main}>
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default HomeLayout;
