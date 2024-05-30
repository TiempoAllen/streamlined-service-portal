import React from "react";
import classes from "./SideNav.module.css";
import cituLogo from "../../assets/citu-logo.png";

const SideNav = () => {
  return (
    <nav className={classes.sidenav}>
      <div className={classes.logo}>
        <img src={cituLogo} alt="citu-logo" />
        <p>Streamlined Service Portal</p>
      </div>
    </nav>
  );
};

export default SideNav;
