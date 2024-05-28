import React from "react";
import classes from "./LoginHeader.module.css";
import profileImage from "../../assets/profile-image.svg";
import cituLogo from "../../assets/citu-logo.png";
import inboxImage from "../../assets/inbox-image.svg";
import { Form, NavLink } from "react-router-dom";

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
        <ul className={classes.list}>
          <li>
            <NavLink
              to={`/home/${userId}`}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          {!isAdmin ? (
            <li>
              <NavLink
                to={`/home/${userId}/request`}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Request
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to={`/home/${userId}/approval`}
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Approval
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/home/${userId}/record`}
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Record
                </NavLink>
              </li>
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
