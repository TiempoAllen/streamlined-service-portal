import React from "react";
import classes from "./SideNav.module.css";
import homeIcon from "../../assets/dashboard.svg";
import recordIcon5 from "../../assets/record5.svg";
import approvalIcon3 from "../../assets/approval3.svg";
import { NavLink } from "react-router-dom";

const SideNav = ({user_id}) => {
  
  return (
    <nav className={classes.sideNav}>
      <ul className={classes.list}>
      <li>
        <div className={classes.link}>
          <NavLink
            to={`/home/${user_id}`}
            end
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
          <img src={approvalIcon3} alt="approval-icon" className={classes.icon} />
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
          <img src={recordIcon5} alt="records-icon" className={classes.icon} />
            Record
          </NavLink>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
