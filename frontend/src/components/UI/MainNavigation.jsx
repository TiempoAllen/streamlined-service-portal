import React from "react";
import classes from "./LoginHeader.module.css";
import profileImage from "../../assets/profile-image.svg";
import cituLogo from "../../assets/citu-logo.png";
import inboxImage from "../../assets/inbox-image.svg";
import { Form, Link } from "react-router-dom";

const MainNavigation = ({ user }) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={cituLogo} alt="citu-logo" />
        <p>Streamlined Service Portal</p>
      </div>
      <div className={classes.buttons}>
        {user.isadmin === true ? (
          <Link to={`/home/${user.user_id}/approval`}>
            <button className={classes.btnSignUp}>Approval</button>
          </Link>
        ) : (
          <Link to={`/home/${user.user_id}/request`}>
            <button className={classes.btnSignUp}>Request</button>
          </Link>
        )}
        <Form action="logout" method="post">
          <button className={classes.btnSignUp}>Logout</button>
        </Form>
        <img src={inboxImage} alt="inbox" />
        <img src={profileImage} alt="profile" />
      </div>
    </header>
  );
};

export default MainNavigation;
