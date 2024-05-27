import React from "react";
import classes from "./Table.module.css";

const Table = ({ requests }) => {
  return (
    <div className={classes.divTable}>
      <table className={classes.table}>
        <thead>
          <tr>
            {/* <th>Requestor</th> */}
            <th>Purpose</th>
            <th>Date and Time</th>
            <th>Location</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request.purpose}</td>
              <td>{request.datetime}</td>
              <td>{request.request_location}</td>
              <td>{request.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
