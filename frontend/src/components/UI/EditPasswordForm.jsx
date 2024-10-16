import React, { useState } from "react";
import axios from "axios";
import classes from "./EditPasswordForm.module.css";
import { useRouteLoaderData, json } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

const EditPasswordForm = ({ onClose, onSnackbar }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const user = useRouteLoaderData("home");
    console.log(user); // Debugging line
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error messages
    
        if (newPassword !== confirmPassword) {
            setErrorMessage("New password and confirmation do not match.");
            return;
        }
    
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(`http://localhost:8080/user/updatePassword/${user.user_id}`, null, {
                params: {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Use the onSnackbar prop to show success message
            onSnackbar("Password updated successfully!", "success");
            onClose(); // Close the form
    
        } catch (error) {
            const errorMsg = error.response?.data || 'An error occurred';
            setErrorMessage(errorMsg);
            onSnackbar(errorMsg, "error"); // Use the onSnackbar prop for errors
        }
    };
    

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <div className={classes.main}>
            <div className={classes.content}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <div className={classes.rowButton}>
                        <button type="submit" className={classes.saveButton}>
                            Save
                        </button>
                        <button type="button" onClick={onClose} className={classes.closeButton}>
                            Close
                        </button>
                    </div>
                </form>
            </div>

            {/* Snackbar for success and error messages */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default EditPasswordForm;

export async function loader({ params }) {
    const user_id = params.user_id; 
    const token = localStorage.getItem("token");
  
    if (!token) {
      throw new Error("No token found");
    }
  
    try {
      const response = await axios.get(`http://localhost:8080/user/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      const user = response.data;
      if (!user) {
        throw json({ message: "User not found" }, { status: 500 });
      }
  
      return user; 
    } catch (error) {
      throw new Error(`Error fetching user details: ${error.message}`);
    }
}
