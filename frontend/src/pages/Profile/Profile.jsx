import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { json, useRouteLoaderData } from "react-router-dom";
import profileImg from "../../assets/profile.svg"; // Fallback image
import EditPasswordForm from "../../components/UI/EditPasswordForm";
import classes from "./Profile.module.css";
import { Snackbar, Alert} from "@mui/material";
import Edit from '@mui/icons-material/Edit'; // Correct import


const Profile = () => {
  const profile = useRouteLoaderData("profile"); // Get the profile data from the loader

  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(profileImg); // Default to the fallback image
  const fileInputRef = useRef(null); // Reference for the file input
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    console.log("Profile Data: ", profile);
    fetchProfilePicture(); // Fetch the profile picture when the component loads
  }, [profile]);

  // Function to fetch the profile picture
  const fetchProfilePicture = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/${profile.user_id}/profile-picture`, {
        responseType: "arraybuffer", // To handle binary data
      });

      // Convert binary data to a URL and update the profile picture state
      const imageUrl = URL.createObjectURL(new Blob([response.data]));
      setProfilePicture(imageUrl);
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  // Check if profile data is not available
  if (!profile) {
    return <p>Loading profile...</p>;
  }

  const censoredPassword = profile.password ? "*".repeat(profile.password.length) : "*******";

  const handleEditPassword = () => {
    setShowForm(true);
  };

  const handleCloseEdit = () => {
    setShowForm(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Preview selected file
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {

    if (!selectedFile) {
      setSnackbarMessage("Please select an image first!");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return; // Prevent further execution if no file is selected
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(`http://localhost:8080/user/uploadProfilePicture/${profile.user_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile picture uploaded successfully:", response.data);
      setSnackbarMessage("Profile picture uploaded successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      fetchProfilePicture(); // Fetch the updated profile picture
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      const errorMsg = error.response?.data || "An error occurred";
      setSnackbarMessage(errorMsg);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Snackbar function for EditPasswordForm
  const handleSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <section className={classes.main}>
      <div className={classes.profileCard}>
        <div className={classes.profileImgWrapper}>
          <img
            src={profilePicture}
            className={classes.profileImg}
            alt="Profile"
            onClick={() => fileInputRef.current.click()} // Trigger file input on image click
          />
          <div className={classes.overlay} onClick={() => fileInputRef.current.click()}>
            <Edit className={classes.editIcon} /> {/* Edit icon */}
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }} // Hide the file input
          accept="image/*"
          onChange={handleFileChange}
        />
        <span>{profile.firstname} {profile.lastname}</span>
        <span>{profile.employee_id}</span>
      </div>
      <div className={classes.columnSection}>
        <div className={classes.buttonGroup}>
          <div className={classes.uploadPicture} onClick={handleUpload}>
                Upload Profile Picture
          </div>
          <div className={classes.editPassword} onClick={handleEditPassword}>
            Edit Password
          </div>
        </div>
        <div className={classes.profileDetails}>
          <div className={classes.name}>
            <span className={classes.itemOne}>Name</span>
            <span className={classes.itemTwo}>:</span>
            <span className={classes.itemThree}>{profile.firstname} {profile.lastname}</span>
          </div>
          <div className={classes.username}>
            <span className={classes.itemOne}>Username</span>
            <span className={classes.itemTwo}>:</span>
            <span className={classes.itemThree}>{profile.username}</span>
          </div>
          <div className={classes.idNumber}>
            <span className={classes.itemOne}>ID Number</span>
            <span className={classes.itemTwo}>:</span>
            <span className={classes.itemThree}>{profile.employee_id}</span>
          </div>
          <div className={classes.password}>
            <span className={classes.itemOne}>Password</span>
            <span className={classes.itemTwo}>:</span>
            <span className={classes.itemThree}>{censoredPassword}</span>
          </div>
          <div className={classes.email}>
            <span className={classes.itemOne}>Email</span>
            <span className={classes.itemTwo}>:</span>
            <span className={classes.itemThree}>{profile.email}</span>
          </div>
          <div className={classes.department}>
            <span className={classes.itemOne}>Department</span>
            <span className={classes.itemTwo}>:</span>
            <span className={classes.itemThree}>{profile.department}</span>
          </div>
        </div>
      </div>
      {showForm && <EditPasswordForm onClose={handleCloseEdit} onSnackbar={handleSnackbar}/>}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default Profile;

export async function loader({ params }) {
  const user_id = params.user_id;
  const token = localStorage.getItem("token");

  if (!token) {
    return json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios.get(`http://localhost:8080/user/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = response.data;

    if (!user) {
      return json({ message: "User not found" }, { status: 404 });
    }

    return user;
  } catch (error) {
    return json({ message: `Error fetching user: ${error.message}` }, { status: 500 });
  }
}
