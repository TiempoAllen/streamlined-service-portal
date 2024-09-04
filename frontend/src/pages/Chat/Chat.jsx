import React from "react";
import profilePic from "../../assets/profile.jpg";
import classes from "./Chat.module.css";

const Chat = () =>{
    return(
        <section className={classes.main}>
            <div className={classes.chatPeopleContainer}>
                <div className={classes.chatRow}>
                    <ul>
                        <li className={classes.parentRow}>
                            <div className={classes.childRow}>
                                 <img src={profilePic} className={classes.profilePic}/>
                                 <span></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={classes.chatMessages}>

            </div>
        </section>
    );
};

export default Chat;