import React from "react";
import classes from "./Table.module.css";

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
            <td>{request.purpose}</td>
            <td>{request.datetime}</td>
            <td>{request.request_location}</td>
            <td>{request.department}</td>
            <td className={classes.assign}>
              <p>Assign</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
