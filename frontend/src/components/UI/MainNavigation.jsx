import React, { useState } from "react";

import classes from "./LoginHeader.module.css";
import cituLogo from "../../assets/citu-logo.png";
import inboxImage from "../../assets/chat.svg";
import homeIcon from "../../assets/home.svg";
import requestIcon from "../../assets/request.svg";
import bellIcon from "../../assets/bell.svg";
import { NavLink } from "react-router-dom";
import DropdownPortal from "./DropdownPortal";
import Notification from "./Notification";
import ChatNotification from "./ChatNotification";
import SideNav from "./SideNav";

const MainNavigation = ({ user = {} }) => {
  const isAdmin = user && user.isadmin;
  const user_id = user && user.user_id;

  console.log(isAdmin, user_id);

  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>
          <img src={cituLogo} alt="citu-logo" />
          <p>Streamlined Service Portal</p>
        </div>
        <ul className={classes.list}>
          {!isAdmin ? (
            <>
              <li>
                <NavLink
                  to={`/home/${user_id}`}
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  <img
                    src={homeIcon}
                    alt="home-icon"
                    className={classes.icon}
                  />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/home/${user_id}/request`}
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  <img
                    src={requestIcon}
                    alt="request-icon"
                    className={classes.icon}
                  />
                  Request
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
        <div className={classes.buttons}>
            <Notification />
            <ChatNotification />
            <DropdownPortal />  
        </div>
      </header>
    </>
  );
};

export default MainNavigation;
