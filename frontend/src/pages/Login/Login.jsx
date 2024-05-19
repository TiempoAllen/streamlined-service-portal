import React from "react";
import loginImage from "../../assets/login-image.png";
import classes from "./Login.module.css";
import { Form, json, redirect, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  return (
    <section className={classes.main}>
      <img src={loginImage} alt="login-image" />
      <div className={classes.login_div}>
        <h1>Welcome!</h1>
        <Form method="post">
          <label>Username</label>
          <input type="text" placeholder="Username" name="username" required />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />

          <button>Login</button>
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
        </Form>
      </div>
    </section>
  );
};

export default Login;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  try {
    const response = await axios.post("http://localhost:5000/login", authData);

    if (response.status !== 200) {
      throw json({ message: "Could not authenticate user." }, { status: 500 });
    }

    const resData = response.data;
    console.log(resData);
    const token = resData.token;
    const userId = resData.userId;

    localStorage.setItem("token", token);

    // const resData = await response.data;
    // const token = resData.token;
    return redirect(`/home/${userId}`);
  } catch (error) {
    console.error(error);
  }
}
