import React from "react";
import classes from "./SideNav.module.css";
import cituLogo from "../../assets/citu-logo.png";
import homeIcon from "../../assets/Homehome.svg";
import recordIcon from "../../assets/Record.svg";
import requestIcon from "../../assets/request.svg";
import approvalIcon from "../../assets/Approval.svg";
import { NavLink } from "react-router-dom";

const SideNav = ({user_id}) => {
  
  return (
    <nav className={classes.sideNav}>
      <ul className={classes.list}>
      <li>
        <div className={classes.link}>
          <NavLink
            to={`/home/${user_id}`}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
          <img src={homeIcon} alt="home-icon" className={classes.icon} />
            Home
          </NavLink>
          </div>
        </li>
        <li>
          <div className={classes.link}>
          <NavLink
            to={`/home/${user_id}/approval`}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
          <img src={approvalIcon} alt="approval-icon" className={classes.icon} />
            Approval
          </NavLink>
          </div>
        </li>
        <li>
          <div className={classes.link}>
          <NavLink
            to={`/home/${user_id}/record`}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
          <img src={recordIcon} alt="records-icon" className={classes.icon} />
            Record
          </NavLink>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
