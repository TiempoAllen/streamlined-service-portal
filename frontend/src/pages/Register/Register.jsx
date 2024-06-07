import React, { useState } from "react";
import registerImage from "../../assets/registration-image.png";
import classes from "../Login/Login.module.css";
import { Form, json, redirect, useActionData } from "react-router-dom";
import axios from "axios";
import RegisterFirstTab from "./RegisterFirstTab";
import RegisterSecondTab from "./RegisterSecondTab";

const Register = () => {
  const errorMessage = useActionData();
  const [currentTab, setCurrentTab] = useState(1);

  const handleNextTab = () => {
    setCurrentTab(2);
  };
  return (
    <section className={classes.main}>
      <img src={registerImage} alt="register" />
      <div className={classes.login_div}>
        <h1>Create an account</h1>
        <Form method="post">
          {currentTab === 1 && (
            <RegisterFirstTab
              errorMessage={errorMessage}
              handleNextTab={handleNextTab}
            />
          )}
          {currentTab === 2 && (
            <RegisterSecondTab errorMessage={errorMessage} />
          )}
        </Form>
        <ul className={classes.pagination}>
          <li
            className={currentTab === 2 ? classes.active : undefined}
            onClick={() => setCurrentTab(1)}
          >
            1
          </li>
          <li
            className={currentTab === 1 ? classes.active : undefined}
            onClick={() => setCurrentTab(2)}
          >
            2
          </li>
        </ul>
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
