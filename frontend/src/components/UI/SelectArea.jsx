import React, { useState } from "react";
import classes from "./SelectArea.module.css";

const SelectArea = ({ onFilterChange, header }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <section className={classes.selectArea}>
      <h1>{header}</h1>
      <select value={selectedFilter} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
      </select>
    </section>
  );
};

export default SelectArea;
