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
        Enjoy effortless campus maintenance with our streamlined service, offering swift and professional janitorial, plumbing, and electrical support via an intuitive online portal.
        </p>
      </div>
      <img src={homepageImage} alt="homepage" />
    </section>
  );
};

export default HomePage;

export async function loader({ request, params }) {
  const userId = params.userId;
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`http://localhost:5000/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = response.data[0];
    console.log("User: ", user);
    if (!user) {
      throw json({ message: "User not found" }, { status: 500 });
    }

    return user;
  } catch (error) {
    throw new Error(`Error fetching user details: ${error.message}`);
  }
}
