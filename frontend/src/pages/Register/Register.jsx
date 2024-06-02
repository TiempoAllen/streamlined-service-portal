import React from "react";
import registerImage from "../../assets/registration-image.png";
import classes from "../Login/Login.module.css";
import { DEPT_DATA } from "./department-data";
import { Form, json, redirect, useActionData } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const errorMessage = useActionData();
  return (
    <section className={classes.main}>
      <img src={registerImage} alt="register" />
      <div className={classes.login_div}>
        <h1>Create an account</h1>
        <Form method="post">
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
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                required
              />
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
        </Form>
      </div>
    </section>
  );
};

export default Register;

export const action = async ({ request }) => {
  const data = await request.formData();

  const password = data.get("password");
  const confirmPassword = data.get("confirmPassword");
  const email = data.get("email");

  if (password.length < 8) {
    return json("Your password must be at least 8 characters long.", {
      status: 400,
    });
  }
  if (!/[A-Z]/.test(password)) {
    return json("Your password must include at least one uppercase letter.", {
      status: 400,
    });
  }
  if (!/[a-z]/.test(password)) {
    return json("Your password must include at least one lowercase letter.", {
      status: 400,
    });
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return json(
      "Your password must include at least one special character (e.g., !, @, #, $, %, ^, &, *).",
      { status: 400 }
    );
  }

  if (!email.endsWith("@cit.edu")) {
    return json("Email must end with '@cit.edu'.", { status: 400 });
  }

  if (password !== confirmPassword) {
    return json("Password and Confirm Password do not match.", {
      status: 400,
    });
  }

  const registerData = {
    firstname: data.get("firstname"),
    lastname: data.get("lastname"),
    username: data.get("username"),
    password: data.get("password"),
    employee_id: data.get("employee_id"),
    email: data.get("email"),
    department: data.get("department"),
  };

  try {
    const response = await axios.post(
      "http://localhost:8080/user/add",
      registerData
    );

    if (response.status !== 200) {
      throw json({ message: "Could not register user." }, { status: "500" });
    }

    const resData = response.data;
    console.log(resData);

    return redirect("/");
  } catch (error) {
    console.error("Error: ", error.response.data);
    if (error.response && error.response.data === "Email already exists") {
      return json("Email already exists", { status: 401 });
    }
    return json("Could not register user.", { status: 500 });
  }
};
