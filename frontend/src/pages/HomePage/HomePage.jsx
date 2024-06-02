import React from "react";
import homepageImage from "../../assets/homepage-image.png";
import classes from "./HomePage.module.css";
import axios from "axios";
import { json, useRouteLoaderData } from "react-router-dom";

const HomePage = () => {
  const user = useRouteLoaderData("home");
  return (
    <section className={classes.home}>
      <div>
        <h1>Welcome {user.firstname}</h1>
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <img src={homepageImage} alt="homepage" />
    </section>
  );
};

export default HomePage;

export async function loader({ request, params }) {
  const user_id = params.user_id;
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`http://localhost:8080/user/${user_id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });

    const user = response.data;
    console.log("User: ", user);
    if (!user) {
      throw json({ message: "User not found" }, { status: 500 });
    }

    return user;
  } catch (error) {
    throw new Error(`Error fetching user details: ${error.message}`);
  }
}
