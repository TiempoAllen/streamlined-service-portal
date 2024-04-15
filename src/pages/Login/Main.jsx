import React, { useState } from "react";
import loginImage from "../../assets/login-image.png";
import classes from "./Main.module.css";
import { authActions, loginUser } from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";

const Main = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const password = useSelector((state) => state.auth.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  const handleUsernameChange = (e) => {
    dispatch(authActions.setUsername(e.target.value));
  };

  const handlePasswordChange = (e) => {
    dispatch(authActions.setPassword(e.target.value));
  };

  return (
    <section className={classes.main}>
      <img src={loginImage} alt="login-image" />
      <div>
        <h1>Welcome!</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />

          <button type="submit">Login</button>
          <p>
            Don't have an account? <span>Sign up</span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Main;
