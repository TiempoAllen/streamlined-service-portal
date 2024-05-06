import React from "react";
import homepageImage from "../../assets/homepage-image.png";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <section className={classes.home}>
      <div>
        <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
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
