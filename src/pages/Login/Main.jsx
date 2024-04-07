import React from "react";
import loginImage from "../../assets/login-image.png";
import classes from "./Main.module.css";

const Main = () => {
  return (
    <section className={classes.main}>
      <img src={loginImage} alt="login-image" />
      <div>
        <h1>Welcome!</h1>
      </div>
    </section>
  );
};

export default Main;
