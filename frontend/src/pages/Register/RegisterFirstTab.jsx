import React from "react";
import classes from "../Login/Login.module.css";

const RegisterFirstTab = ({ errorMessage, handleNextTab }) => {
  return (
    <>
      <div className={classes.row}>
        <div>
          <label id="firstNameLabel">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            required
          />
        </div>
        <div>
          <label id="lastNameLabel">Last Name</label>
          <input type="text" placeholder="Last Name" name="lastname" required />
        </div>
      </div>
      <label id="usernameLabel">Username</label>
      <input type="text" placeholder="Username" name="username" required />
      <div className={classes.row}>
        <div>
          <label id="passwordLabel">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        <div>
          <label id="confirmPasswordLabel">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
          />
        </div>
      </div>
      {errorMessage && <p className={classes.error}>{errorMessage}</p>}
      <button id="nextButton" onClick={handleNextTab}>
        Next
      </button>
    </>
  );
};

export default RegisterFirstTab;
