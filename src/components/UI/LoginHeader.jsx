import React from "react";
import classes from "./LoginHeader.module.css";
import cituLogo from "../../assets/citu-logo.png";

const LoginHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={cituLogo} alt="citu-logo" />
        <p>Streamlined Service Portal</p>
        {/* <ul>
          <li>Home</li>
          <li>Request</li>
        </ul> */}
      </div>
      <div className={classes.buttons}>
        <button className={classes.btnSignIn}>Sign in</button>
        <button className={classes.btnSignUp}>Sign up</button>
      </div>
    </header>
  );
};

export default LoginHeader;
