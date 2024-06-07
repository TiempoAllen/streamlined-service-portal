import React from "react";
import { DEPT_DATA } from "./department-data";
import classes from "../Login/Login.module.css";

const RegisterSecondTab = ({ errorMessage }) => {
  return (
    <>
      <div className={classes.row}>
        <div>
          <label id="employeeIdLabel">Employee ID</label>
          <input
            type="text"
            placeholder="Employee ID"
            name="employee_id"
            required
          />
        </div>
        <div>
          <label id="emailLabel">Email</label>
          <input type="text" placeholder="Email" name="email" required />
        </div>
      </div>
      <label id="departmentLabel">Department</label>
      <select name="department" required>
        <option value="">Choose</option>
        {DEPT_DATA.map((dept, index) => (
          <option key={index} value={dept.name}>
            {dept.name}
          </option>
        ))}
      </select>
      {errorMessage && <p className={classes.error}>{errorMessage}</p>}
      <button type="submit" id="registerButton">
        Create
      </button>
    </>
  );
};

export default RegisterSecondTab;
