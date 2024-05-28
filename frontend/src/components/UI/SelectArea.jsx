import React from "react";
import classes from "./SelectArea.module.css";

const SelectArea = () => {
  return (
    <section className={classes.selectArea}>
      <h1>Requests</h1>
      <select>
        <option>All</option>
      </select>
    </section>
  );
};

export default SelectArea;
