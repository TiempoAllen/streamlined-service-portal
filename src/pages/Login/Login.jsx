import React from "react";
import loginImage from "../../assets/login-image.png";
import classes from "./Login.module.css";
import { authActions, loginUser } from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />

          <button type="submit">Login</button>
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
