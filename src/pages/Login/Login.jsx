import React from "react";
import LoginHeader from "../../components/UI/LoginHeader";
import Main from "./Main";
import classes from "./Login.module.css";

const Login = () => {
  return (
    <section className={classes.login}>
      <LoginHeader />
      <Main />
    </section>
  );
};

export default Login;
