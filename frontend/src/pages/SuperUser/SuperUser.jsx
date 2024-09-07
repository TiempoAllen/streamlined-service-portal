import React, { useState, useEffect } from "react";
import axios from "axios";
import UsersTable from "../../components/UI/UsersTable";
import RequestsTable from "../../components/UI/RequestsTable";
import classes from "./SuperUser.module.css";
import { Link } from "react-router-dom";
import { Tooltip, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as Dialog from "@radix-ui/react-dialog"; // Import Radix Dialog
import UserDialogPortal from "../../components/UI/UserDialogPortal"; // Import UserDialogPortal

const SuperUser = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isViewingUsers, setIsViewingUsers] = useState(true);
  const [isAddMode, setIsAddMode] = useState(false); // State to handle add user mode
  const [selectedUser, setSelectedUser] = useState(null); // State for dialog user

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/all");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8080/request/all");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleEdit = (id) => {
    console.log(isViewingUsers ? `Edit user with ID: ${id}` : `Edit request with ID: ${id}`);
    // Add logic to handle edit action
  };

  const handleView = (id) => {
    console.log(isViewingUsers ? `View user with ID: ${id}` : `View request with ID: ${id}`);
    // Add logic to handle view action
  };

  const handleDelete = (id) => {
    console.log(isViewingUsers ? `Delete user with ID: ${id}` : `Delete request with ID: ${id}`);
    // Add logic to handle delete action
  };

  const handleAdd = () => {
    setSelectedUser(null); // No user selected, for adding a new one
    setIsAddMode(true); // Set add mode to true
  };

  const handleAddUser = (newUser) => {
    // Add the new user to the users array
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setIsAddMode(false); // Close the dialog after adding
  };

  return (
    <div className={classes.supermain}>
      <div className={classes.header}>
        <div className={classes.navContainer}>
          <nav className={classes.nav}>
            <Link
              to="#"
              className={`${classes.navLink} ${isViewingUsers ? classes.active : ""}`}
              onClick={() => setIsViewingUsers(true)}
            >
              Users
            </Link>
            <Link
              to="#"
              className={`${classes.navLink} ${!isViewingUsers ? classes.active : ""}`}
              onClick={() => setIsViewingUsers(false)}
            >
              Requests
            </Link>
          </nav>
          <Tooltip title={isViewingUsers ? "Add New User" : "Add New Request"} arrow>
            <IconButton
              onClick={handleAdd}
              sx={{
                backgroundColor: "#631C21",
                color: "white",
                "&:hover": {
                  backgroundColor: "#9a212d",
                },
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
        <h1 className={classes.heading}>
          {isViewingUsers ? "Users" : "Requests"} 
        </h1>
      </div>
      {isViewingUsers ? (
        <UsersTable
          users={users}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />
      ) : (
        <RequestsTable
          requests={requests}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />
      )}

      {/* Dialog for Adding a User */}
      <Dialog.Root open={isAddMode} onOpenChange={() => setIsAddMode(false)}>
        {isAddMode && (
          <UserDialogPortal user={{}} mode="add" onAddUser={handleAddUser} />
        )}
      </Dialog.Root>
    </div>
  );
};

export default SuperUser;
