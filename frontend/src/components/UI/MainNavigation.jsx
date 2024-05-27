import React from "react";
import classes from "./LoginHeader.module.css";
import profileImage from "../../assets/profile-image.svg";
import cituLogo from "../../assets/citu-logo.png";
import inboxImage from "../../assets/inbox-image.svg";
import { Form, Link } from "react-router-dom";

const MainNavigation = ({ user = {} }) => {
  const isAdmin = user && user.isadmin;
  const userId = user && user.user_id;

  console.log(isAdmin, userId);

  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>
          <img src={cituLogo} alt="citu-logo" />
          <p>Streamlined Service Portal</p>
        </div>
        <ul>
          <li>Home</li>
          {!isAdmin ? (
            <Link to={`/home/${userId}/request`}>
              <li>Request</li>
            </Link>
          ) : (
            <>
              <Link to={`/home/${userId}/approval`}>
                <li>Approval</li>
              </Link>
              <li>Record</li>
            </>
          )}
        </ul>
        <div className={classes.buttons}>
          <Form action="logout" method="post">
            <button className={classes.btnSignUp}>Logout</button>
          </Form>
          <img src={inboxImage} alt="inbox" />
          <img src={profileImage} alt="profile" />
        </div>
      </header>
    </>
  );
};

export default MainNavigation;
