import React from "react";
import classes from "./Table.module.css";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const Table = ({ requests }) => {
  return (
    <table className={classes.table}>
      {/* <thead>
          <tr>
            <th>Purpose</th>
            <th>Date and Time</th>
            <th>Location</th>
            <th>Department</th>
          </tr>
        </thead> */}
      <tbody>
        {requests.map((request, index) => (
          <tr key={index}>
            <td>
              {request.user_firstname} {request.user_lastname}
            </td>
            <td>{request.purpose}</td>
            <td>{request.datetime}</td>
            <td>{request.request_location}</td>
            <td>{request.department}</td>
            <td className={classes.assign}>
              <p>
                <AddIcon /> Assign
              </p>
              <p className={classes.buttons}>
                <CheckIcon />
              </p>
              <p className={classes.buttons}>
                <CloseIcon />
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
