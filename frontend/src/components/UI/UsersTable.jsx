import React, { useState } from "react";
import classes from "./UsersTable.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Tooltip } from "@mui/material";
import * as Dialog from "@radix-ui/react-dialog";
import UserDialogPortal from "../../components/UI/UserDialogPortal";

const UsersTable = ({ users = [], onDelete }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogMode, setDialogMode] = useState("view"); // State to toggle between 'view', 'edit', and 'delete'

  const handleOpenDialog = (user, mode) => {
    setSelectedUser(user);
    setDialogMode(mode);
  };

  const handleDeleteUser = (userId) => {
    // Call onDelete callback with the user ID after confirmation
    if (onDelete) {
      onDelete(userId);
    }
    setSelectedUser(null); // Close the dialog after deletion
  };

  return (
    <>
      <table className={classes.userstable}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Password</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.password}</td>
              <td>{user.employee_id}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td className={classes.actions}>
                <Tooltip title="Edit">
                  <IconButton
                    color="primary"
                    className={classes.editButton}
                    onClick={() => handleOpenDialog(user, "edit")}
                    sx={{
                      color: "#28a745",
                      "&:hover": {
                        backgroundColor: "#218838",
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View">
                  <IconButton
                    color="white"
                    className={classes.viewButton}
                    onClick={() => handleOpenDialog(user, "view")}
                    sx={{
                      color: "#17a2b8",
                      "&:hover": {
                        backgroundColor: "#138496",
                      },
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    className={classes.deleteButton}
                    onClick={() => handleOpenDialog(user, "delete")} // Open dialog in delete mode
                    sx={{
                      color: "#dc3545",
                      "&:hover": {
                        backgroundColor: "#9a212d",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

   
      <Dialog.Root open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        {selectedUser && (
          <UserDialogPortal
            user={selectedUser}
            mode={dialogMode}
            onDelete={handleDeleteUser} 
          />
        )}
      </Dialog.Root>
    </>
  );
};

export default UsersTable;
