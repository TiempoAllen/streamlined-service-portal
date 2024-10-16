import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import classes from "./Record.module.css";
import SelectArea from "../../components/UI/SelectArea";
import { formatDateTime, loadRequestsAndTechnicians } from "../../util/auth";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const Record = () => {
  const { requests, technicians } = useLoaderData();
  const doneRequests = requests.filter((request) => request.status === "Done");
  const { user_id } = useParams();
  const navigate = useNavigate();

  const [filterType, setFilterType] = useState("All"); // Default filter is "All"
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar

  const [colDefs, setColDefs] = useState([
    { field: "RequestID", flex: 1 },
    { field: "Requestor", flex: 1 },
    { field: "Technician Requested", flex: 1 },
    { field: "Title", flex: 1 },
    { field: "Date Requested", flex: 1 },
    { field: "Location", flex: 1 },
    { field: "Department", flex: 1 },
    { field: "Attachment", flex: 1 },
    {
      headerName: "Actions",
      flex: 1,
      cellRenderer: (params) => (
        <p
          className={classes.viewBtn}
          onClick={() =>
            navigate(`/home/${user_id}/record/${params.data.RequestID}`)
          }
        >
          View
        </p>
      ),
    },
  ]);

  // Function to filter requests based on the selected time range
  const filterRequestsByDate = (requests, filterType) => {
    const now = new Date();

    return requests.filter((request) => {
      const requestDate = new Date(request.datetime);
      switch (filterType) {
        case "Today":
          return requestDate.toDateString() === now.toDateString();
        case "Week":
          const startOfWeek = new Date(
            now.setDate(now.getDate() - now.getDay())
          );
          return requestDate >= startOfWeek;
        case "Month":
          return (
            requestDate.getMonth() === now.getMonth() &&
            requestDate.getFullYear() === now.getFullYear()
          );
        case "Year":
          return requestDate.getFullYear() === now.getFullYear();
        case "All":
        default:
          return true;
      }
    });
  };

  const filteredRequests = filterRequestsByDate(doneRequests, filterType);

  const transformedRequests = filteredRequests.map((request) => {
    return {
      RequestID: request.request_id,
      Requestor: `${request.user_firstname} ${request.user_lastname}`,
      "Technician Requested": request.request_technician,
      Title: request.title,
      "Date Requested": formatDateTime(request.datetime),
      Location: request.request_location,
      Department: request.department,
      Attachment:
        request.attachment && request.attachment.trim() !== ""
          ? request.attachment
          : "No Attachment",
    };
  });

  const exportToCSV = () => {
    if (transformedRequests.length === 0) {
      setOpenSnackbar(true); // Show snackbar if no records to export
      return;
    }

    const headers = Object.keys(transformedRequests[0]);
    const csvRows = [
      headers.join(","), // CSV Header
      ...transformedRequests.map((row) =>
        headers.map((header) => `"${row[header] || ""}"`).join(",")
      ), // Rows
    ];

    const csvContent = csvRows.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <section className={classes.record}>
      <div className={classes.recordHeader}>
        <SelectArea header="Records" isRecords={true} />
        <div className={classes.exportArea}>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Today">Today</option>
            <option value="Week">This Week</option>
            <option value="Month">This Month</option>
            <option value="Year">This Year</option>
          </select>
          <button onClick={exportToCSV}>Export</button>
        </div>
      </div>
      <div
        className="ag-theme-quartz"
        style={{ height: "100%", width: "100%", marginTop: "1rem" }}
      >
        <AgGridReact rowData={transformedRequests} columnDefs={colDefs} />
      </div>

      {/* Snackbar component */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
          No records available to export.
        </Alert>
      </Snackbar>
    </section>
  );
};

export default Record;

export const loader = loadRequestsAndTechnicians;
