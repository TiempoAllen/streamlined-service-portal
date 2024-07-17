import React from "react";
import MainNavigation from "../../components/UI/MainNavigation";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import classes from "./HomeLayout.module.css";
<<<<<<< HEAD
import SideNav from "../../components/UI/SideNav";
import Footer from "../UI/Footer";

=======
import Footer from "../UI/Footer";
>>>>>>> master

const HomeLayout = () => {
  const user = useRouteLoaderData("home");
  const isAdmin = user && user.isadmin;
  const user_id = user && user.user_id;
  return (
    <>
      <MainNavigation user={user} />
<<<<<<< HEAD
      <div className={classes.layout}>
        {isAdmin && <SideNav user_id={user_id} className={classes.menu} />}
        <main className={isAdmin ? classes.adminMain : classes.main}>
          <Outlet />
        </main>
      </div>
      <Footer />
=======
      <main className={classes.home_main}>
        <Outlet />
        <Footer />
      </main>
>>>>>>> master
    </>
  );
};

export default HomeLayout;
