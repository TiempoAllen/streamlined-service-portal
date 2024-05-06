import React from "react";
import registerImage from "../../assets/registration-image.png";
import classes from "../Login/Login.module.css";
import { DEPT_DATA } from "./department-data";
import { useDispatch, useSelector } from "react-redux";
import { authActions, registerUser } from "../../store/auth-slice";

const Register = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const password = useSelector((state) => state.auth.password);
  const employee_id = useSelector((state) => state.auth.employee_id);
  const email = useSelector((state) => state.auth.email);
  const department = useSelector((state) => state.auth.department);

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({ username, password, employee_id, email, department })
    );
  };
  return (
    <section className={classes.main}>
      <img src={registerImage} alt="register-image" />
      <div className={classes.login_div}>
        <h1>Create an account</h1>
        <form onSubmit={handelSubmit}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              dispatch(authActions.setUsername(e.target.value));
            }}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              dispatch(authActions.setPassword(e.target.value));
            }}
          />
          <label>Employee ID</label>
          <input
            type="text"
            placeholder="Employee ID"
            value={employee_id}
            onChange={(e) => {
              dispatch(authActions.setEmplyeeID(e.target.value));
            }}
          />
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              dispatch(authActions.setEmail(e.target.value));
            }}
          />
          <label>Department</label>
          <select
            value={department}
            onChange={(e) => {
              dispatch(authActions.setDepartment(e.target.value));
            }}
          >
            <option value="">Choose</option>
            {DEPT_DATA.map((dept, index) => (
              <option key={index} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>

          <button type="submit">Create</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
