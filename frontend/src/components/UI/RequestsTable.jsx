import React from "react";
import classes from "./RequestsTable.module.css";  
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility"; 

const formatDateTime = (datetime) => {
  const date = new Date(datetime);
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const RequestsTable = ({ requests, onEdit, onView, onDelete }) => {
  return (


    <table className={classes.requestsTable}>
      <thead>
        <tr>
          <th>Request ID</th>
          <th>Purpose</th>
          <th>Date & Time</th>
          <th>Status</th>
          <th>Location</th>
          <th>Department</th>
          <th>User ID</th>
          <th>User First Name</th>
          <th>User Last Name</th>
          <th>Technician</th>
          <th>Attachment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request.request_id}>
            <td>{request.request_id}</td> 
            <td>{request.purpose}</td>
            <td>{formatDateTime(request.datetime)}</td>
            <td>{request.status}</td>
            <td>{request.request_location}</td>
            <td>{request.department}</td>
            <td>{request.user_id}</td>
            <td>{request.user_firstname}</td>
            <td>{request.user_lastname}</td>
            <td>{request.technician}</td>
            <td>{request.attachment}</td>
            <td className={classes.actions}>
              <Tooltip title="Edit Request">
                <IconButton
                  onClick={() => onEdit(request.request_id)}
                  sx={{
                    color: '#28a745',  
                    '&:hover': {
                      backgroundColor: '#218838',
                    }
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="View Request">
                <IconButton
                  onClick={() => onView(request.request_id)}
                  sx={{
                    color: '#17a2b8',  
                    '&:hover': {
                      backgroundColor: '#138496',
                    }
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Request">
                <IconButton
                  onClick={() => onDelete(request.request_id)}
                  sx={{
                    color: '#dc3545',  
                    '&:hover': {
                      backgroundColor: '#c82333',
                    }
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
  );
};

export default RequestsTable;
