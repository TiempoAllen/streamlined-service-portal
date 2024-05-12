import React from "react";
import classes from "./LoginHeader.module.css";
import profileImage from "../../assets/profile-image.svg";
import cituLogo from "../../assets/citu-logo.png";
import inboxImage from "../../assets/inbox-image.svg";
import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={cituLogo} alt="citu-logo" />
        <p>Streamlined Service Portal</p>
      </div>
      <div className={classes.buttons}>
        <Link to="/home/request">
          <button className={classes.btnSignUp}>Request</button>
        </Link>
        <img src={inboxImage} alt="inbox" />
        <img src={profileImage} alt="profile" />
      </div>
    </header>
  );
};

export default MainNavigation;
