import React from "react";
import homepageImage from "../../assets/homepage-image.png";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <section className={classes.home}>
      <img src={homepageImage} alt="homepage-image" />
    </section>
  );
};

export default HomePage;
