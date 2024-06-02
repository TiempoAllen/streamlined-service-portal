import React from "react";
import classes from "./LoginHeader.module.css";
import profileImage from "../../assets/profile-image.svg";
import cituLogo from "../../assets/citu-logo.png";
import inboxImage from "../../assets/inbox-image.svg";
import { Form, NavLink } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

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
          <li>
            <NavLink
              to={`/home/${user_id}`}
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
                to={`/home/${user_id}/request`}
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
                  to={`/home/${user_id}/approval`}
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Approval
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/home/${user_id}/record`}
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

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <p>
                <img src={profileImage} alt="profile" />
                <ArrowDropDownIcon style={{ color: "white" }} />
              </p>
            </DropdownMenu.Trigger>
            {/* <DropdownPortal /> */}
          </DropdownMenu.Root>
        </div>
      </header>
    </>
  );
};

export default MainNavigation;
