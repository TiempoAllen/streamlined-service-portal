import React from "react";
import classes from "./DropdownPortal.module.css";
import "./DropdownPortal.css";
import logoutIcon from "../../assets/logout.svg";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Form } from "react-router-dom";

const DropdownPortal = () => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
        <DropdownMenu.Item className="DropdownMenuItem">
          <Form action="logout" method="post">
            <div className={classes.itemContent}>
            <img src={logoutIcon} alt="logout-icon" className={classes.icon} />
            <button>Logout</button>
            </div>
          </Form>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
};

export default DropdownPortal;
