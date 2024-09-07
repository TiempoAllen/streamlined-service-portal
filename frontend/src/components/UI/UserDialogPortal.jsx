import React, { useState } from "react";
import classes from "./UserDialogPortal.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { DEPT_DATA } from "../../pages/Register/department-data"; // Import DEPT_DATA

const UserDialogPortal = ({ user = {}, mode, onDelete, onAddUser }) => {
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
  const isDeleteMode = mode === "delete";
  const isAddMode = mode === "add";

  const [newUser, setNewUser] = useState({
    user_id: user.user_id || "",
    username: user.username || "",
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    password: user.password || "",
    employee_id: user.employee_id || "",
    email: user.email || "",
    department: user.department || "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleAddUser = () => {
    if (onAddUser) {
      onAddUser(newUser);
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className={classes.DialogOverlay} />
      <Dialog.Content className={classes.DialogContent}>
        <Dialog.Title className={classes.DialogTitle}>
          {isViewMode && "View User Details"}
          {isEditMode && "Edit User Details"}
          {isDeleteMode && "Delete User"}
          {isAddMode && "Add User"}
        </Dialog.Title>

        {/* User ID */}
        {isAddMode ? null : (
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="user_id">User ID</label>
            <input
              className={classes.Input}
              id="user_id"
              value={newUser.user_id}
              readOnly={true}
            />
          </fieldset>
        )}

        {/* Username */}
        <fieldset className={classes.Fieldset}>
          <label className={classes.Label} htmlFor="username">Username</label>
          <input
            className={classes.Input}
            id="username"
            value={newUser.username}
            onChange={handleInputChange}
            readOnly={isViewMode && !isAddMode}
          />
        </fieldset>

        {/* First Name */}
        <fieldset className={classes.Fieldset}>
          <label className={classes.Label} htmlFor="firstname">First Name</label>
          <input
            className={classes.Input}
            id="firstname"
            value={newUser.firstname}
            onChange={handleInputChange}
            readOnly={isViewMode && !isAddMode}
          />
        </fieldset>

        {/* Last Name */}
        <fieldset className={classes.Fieldset}>
          <label className={classes.Label} htmlFor="lastname">Last Name</label>
          <input
            className={classes.Input}
            id="lastname"
            value={newUser.lastname}
            onChange={handleInputChange}
            readOnly={isViewMode && !isAddMode}
          />
        </fieldset>

        {/* Password */}
        <fieldset className={classes.Fieldset}>
          <label className={classes.Label} htmlFor="password">Password</label>
          <input
            className={classes.Input}
            id="password"
            type="password"
            value={newUser.password}
            onChange={handleInputChange}
            readOnly={isViewMode && !isAddMode}
          />
        </fieldset>

        {/* Employee ID */}
        <fieldset className={classes.Fieldset}>
          <label className={classes.Label} htmlFor="employee_id">Employee ID</label>
          <input
            className={classes.Input}
            id="employee_id"
            value={newUser.employee_id}
            onChange={handleInputChange}
            readOnly={isViewMode && !isAddMode}
          />
        </fieldset>

        {/* Email */}
        <fieldset className={classes.Fieldset}>
          <label className={classes.Label} htmlFor="email">Email</label>
          <input
            className={classes.Input}
            id="email"
            value={newUser.email}
            onChange={handleInputChange}
            readOnly={isViewMode && !isAddMode}
          />
        </fieldset>
       
       {isAddMode ? null : (
        <fieldset className={classes.Fieldset}>
          <label className={classes.Label} htmlFor="department">Department</label>
          <input
            className={classes.Input}
            id="department"
            value={newUser.department}
            onChange={handleInputChange}
            readOnly={isViewMode}
          />
        </fieldset>
  )}
        {/* Department */}
        {isAddMode && (
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="department">Department</label>
            <select
              className={classes.Input}
              id="department"
              value={newUser.department}
              onChange={handleInputChange}
              required
            >
              <option value="">Choose</option>
              {DEPT_DATA.map((dept, index) => (
                <option key={index} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </fieldset>
        )}

        <div className={classes.ButtonGroup}>
          {isEditMode && (
            <button className={classes.SaveButton} onClick={handleAddUser}>
              Save Changes
            </button>
          )}

          {isDeleteMode && (
            <>
              <p className={classes.DeleteConfirmation}>
                Are you sure you want to delete user <strong>{newUser.username}</strong>?
              </p>
              <button className={classes.DeleteButton} onClick={() => onDelete(newUser.user_id)}>
                Confirm Delete
              </button>
              <Dialog.Close asChild>
                <button className={classes.CancelButton}>Cancel</button>
              </Dialog.Close>
            </>
          )}

          {!isDeleteMode && (
            <Dialog.Close asChild>
              <button className={classes.CloseButton}>Close</button>
            </Dialog.Close>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default UserDialogPortal;
