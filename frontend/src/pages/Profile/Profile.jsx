import React from "react";
import profileImg from "../../assets/profile.jpg";
import classes from "./Profile.module.css";

const Profile = () =>{
    return(
        <section className={classes.main}>
            <div className={classes.profileCard}>
                <img src={profileImg} className={classes.profileImg}/>
                <span>Justine Cabreros</span>
                <span>12-1234-123</span>
            </div>
            <div className={classes.profileDetails}>
                <div className={classes.name}>
                    <span className={classes.itemOne}>Name</span> 
                    <span className={classes.itemTwo}>:</span> 
                    <span className={classes.itemThree}>Justine Cabreros</span>
                </div>
                <div className={classes.username}>
                    <span className={classes.itemOne}>Username</span> 
                    <span className={classes.itemTwo}>:</span> 
                    <span className={classes.itemThree}>justine.cabreros</span>
                </div>
                <div className={classes.idNumber}>
                    <span className={classes.itemOne}>ID Number</span> 
                    <span className={classes.itemTwo}>:</span> 
                    <span className={classes.itemThree}>12-1234-123</span>
                </div>
                <div className={classes.password}>
                    <span className={classes.itemOne}>Password</span> 
                    <span className={classes.itemTwo}>:</span> 
                    <span className={classes.itemThree}>*******</span>
                </div>
                <div className={classes.email}>
                    <span className={classes.itemOne}>Email</span> 
                    <span className={classes.itemTwo}>:</span> 
                    <span className={classes.itemThree}>justine.cabreros@cit.edu</span>
                </div>
                <div className={classes.department}>
                    <span className={classes.itemOne}>Department</span> 
                    <span className={classes.itemTwo}>:</span> 
                    <span className={classes.itemThree}>College of Computer Studies</span>
                </div>
            </div>
        </section>
    );
};

export default Profile;