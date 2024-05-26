import React from "react";
import classes from "./Table.module.css";

const Table = () => {
  return (
    <table className={classes.table}>
      <tr>
        <th>Requestor</th>
        <th>Purpose</th>
        <th>Date and Time</th>
        <th>Location</th>
        <th>Department</th>
      </tr>
      <tr></tr>
    </table>
  );
};

export default Table;
