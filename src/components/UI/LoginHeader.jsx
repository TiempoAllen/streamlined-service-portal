import React from "react";
import classes from "./LoginHeader.module.css";
import cituLogo from "../../assets/citu-logo.png";
import { useNavigate } from "react-router-dom";

const LoginHeader = () => {
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={cituLogo} alt="citu-logo" />
        <p>Streamlined Service Portal</p>
      </div>
      <div className={classes.buttons}>
        <button className={classes.btnSignIn} onClick={() => navigate("/")}>
          Sign in
        </button>
        <button
          className={classes.btnSignUp}
          onClick={() => navigate("/register")}
        >
          Sign up
        </button>
      </div>
    </header>
  );
};

export default LoginHeader;
