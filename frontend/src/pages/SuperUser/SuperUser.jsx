import React, { useState, useEffect } from "react";
import axios from "axios";
import UsersTable from "../../components/UI/UsersTable";
import RequestsTable from "../../components/UI/RequestsTable";
import TechniciansTable from "../../components/UI/TechniciansTable"; // Import the TechniciansTable
import classes from "./SuperUser.module.css";
import { Link } from "react-router-dom";
// import RequestTableDialogPortal from "../../components/UI/RequestTableDialogPortal";
import { useRouteLoaderData } from "react-router-dom";

const SuperUser = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [technicians, setTechnicians] = useState([]); // State for technicians
  const [isViewingUsers, setIsViewingUsers] = useState(true);
  const [isViewingRequests, setIsViewingRequests] = useState(false);
  const [isViewingTechnicians, setIsViewingTechnicians] = useState(false);
  const [isAddRequestMode, setIsAddRequestMode] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const user = useRouteLoaderData("home");
  const user_id = user && user.user_id;
  console.log("User ID:", user_id);

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

  const handleDelete = async (id) => {
    try {
      if (isViewingUsers) {
        await axios.delete(`http://localhost:8080/user/${id}`);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.user_id !== id)
        );
      } else if (isViewingRequests) {
        await axios.delete(`http://localhost:8080/request/${id}`);
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.request_id !== id)
        );
      } else if (isViewingTechnicians) {
        await axios.delete(`http://localhost:8080/technician/${id}`);
        setTechnicians((prevTechnicians) =>
          prevTechnicians.filter(
            (technician) => technician.technician_id !== id
          )
        );
      }
      alert("Item deleted successfully.");
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete item.");
    }
  };

  const handleAddRequest = async (newRequest) => {
    try {
      let response;
      if (selectedRequest) {
        response = await axios.put(
          `http://localhost:8080/request/${selectedRequest.request_id}`,
          newRequest
        );
      } else {
        response = await axios.post(
          "http://localhost:8080/request/add",
          newRequest
        );
      }
      if (response && response.status === 200) {
        setRequests((prevRequests) => [...prevRequests, response.data]);
        alert("Request saved successfully.");
      } else {
        throw new Error("Failed to save the request.");
      }
    } catch (error) {
      console.error("Error adding or editing request:", error);
      alert("An error occurred while saving the request.");
    } finally {
      setIsAddRequestMode(false);
    }
  };

  return (
    <div className={classes.supermain}>
      <div className={classes.header}>
        <div className={classes.navContainer}>
          <nav className={classes.nav}>
            <Link
              to="#"
              className={`${classes.navLink} ${
                isViewingUsers ? classes.active : ""
              }`}
              onClick={() => {
                setIsViewingUsers(true);
                setIsViewingRequests(false);
                setIsViewingTechnicians(false);
              }}
            >
              Users
            </Link>
            <Link
              to="#"
              className={`${classes.navLink} ${
                isViewingRequests ? classes.active : ""
              }`}
              onClick={() => {
                setIsViewingUsers(false);
                setIsViewingRequests(true);
                setIsViewingTechnicians(false);
              }}
            >
              Requests
            </Link>
            <Link
              to="#"
              className={`${classes.navLink} ${
                isViewingTechnicians ? classes.active : ""
              }`}
              onClick={() => {
                setIsViewingUsers(false);
                setIsViewingRequests(false);
                setIsViewingTechnicians(true);
              }}
            >
              Technicians
            </Link>
          </nav>
        </div>
      </div>
      <div className={classes.tableContainer}>
        {isViewingUsers && <UsersTable users={users} onDelete={handleDelete} />}
        {isViewingRequests && (
          <>
            <RequestsTable
              requests={requests}
              user_id={user_id}
              onEdit={setSelectedRequest}
              onDelete={handleDelete}
            />
            {/* {isAddRequestMode && (
              <RequestTableDialogPortal
                onClose={() => setIsAddRequestMode(false)}
                onAddRequest={handleAddRequest}
                selectedRequest={selectedRequest}
              />
            )} */}
          </>
        )}
        {isViewingTechnicians && (
          <TechniciansTable technicians={technicians} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default SuperUser;
