import React from "react";
import homepageImage from "../../assets/homepage-image.png";
import classes from "./HomePage.module.css";
import axios from "axios";
import { json, useLoaderData } from "react-router-dom";

const HomePage = () => {
  const data = useLoaderData();
  // const user = data.username;
  console.log("User:", data);
  return (
    <section className={classes.home}>
      <div>
        {/* <h1>Welcome {user}</h1> */}
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <img src={homepageImage} alt="homepage-image" />
    </section>
  );
};

export default HomePage;

export async function loader(request, params) {
  const id = params.id;

  try {
    const response = await axios.get("http://localhost:5000/user/" + id);
    return response;
  } catch (error) {
    throw json({ message: "Could not fetch user." }, { status: 500 });
  }
}
