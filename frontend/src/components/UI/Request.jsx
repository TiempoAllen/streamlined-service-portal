import React, { useState, useEffect } from "react";
import axios from "axios";
import RequestsTable from "../../components/UI/RequestsTable"; // Ensure it's the correct RequestsTable
import classes from "./RequestPage.module.css"; // Request page specific CSS
import { Tooltip, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Material-UI Add Icon
import { Link } from "react-router-dom";

const Request = () => {
  const [requests, setRequests] = useState([]);

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

  const handleAction = (requestId) => {
    console.log("Handle action for request with ID:", requestId);
    // Add logic to handle action
  };

  const handleAddRequest = () => {
    console.log("Add new request");
    // Add logic to handle adding a new request
  };

  return (
    <div className={classes.request}>
      <div className={classes.headerRequest}>
        <div className={classes.navContainerRequest}>
          <nav className={classes.navRequest}>
            <Link to="/home" className={classes.navLink}>Home</Link>
          </nav>
          <Tooltip title="Add New Request" arrow> 
            <IconButton
              onClick={handleAddRequest}
              sx={{
                backgroundColor: '#631C21',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#9a212d',
                },
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
        <h1 className={classes.heading}>Requests</h1>
      </div>
      <RequestsTable
        requests={requests}
        onEdit={handleAction}
        onView={handleAction}
        onDelete={handleAction}
      />
    </div>
  );
};

export default Request;
