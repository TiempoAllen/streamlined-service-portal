import React from "react";
import classes from "./LoginHeader.module.css";
import profileImage from "../../assets/profile-image.svg";
import cituLogo from "../../assets/citu-logo.png";
import inboxImage from "../../assets/inbox-image.svg";
import homeIcon from "../../assets/home.svg";
import requestIcon from "../../assets/request.svg";
import bellIcon from "../../assets/bell.svg";
import { Form, NavLink } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropdownPortal from "./DropdownPortal";
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
          <p>Streamlined Service <br />Portal</p>
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
                  <img src={homeIcon} alt="home-icon" className={classes.icon} />
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
                  <img src={requestIcon} alt="request-icon" className={classes.icon} />
                  Request
                </NavLink>
              </li>
            </>
          ) : (
            <>
            </>
          )}
        </ul>
        <div className={classes.buttons}>
          <Form action="logout" method="post">
            <button className={classes.btnSignUp}>Logout</button>
          </Form>
          <img src={bellIcon} alt="bell" />
          <img src={inboxImage} alt="inbox" />

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <p>
                <img src={profileImage} alt="profile" />
                <ArrowDropDownIcon style={{ color: "white" }} />
              </p>
            </DropdownMenu.Trigger>
            <DropdownPortal /> 
          </DropdownMenu.Root>
        </div>
      </header>
    </>
  );
};

export default MainNavigation;
