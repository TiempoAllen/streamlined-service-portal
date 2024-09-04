import {React, useState, useRef, useEffect} from "react";
import classes from "./ChatNotification.module.css";
import closeIcon from "../../assets/close.svg";
import profileImg from "../../assets/profile.jpg";
import inboxImage from "../../assets/chat.svg";

const ChatNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);
  const dropdownRef = useRef(null);

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
    setNotificationCount(0);
  };

  const handleClickOutside = (event) => {
    if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
      setShowNotification(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
  };
},[]);

    return(
        <div className={classes.main} ref={dropdownRef}>
            <div className={classes.badgeContainer} onClick={handleNotificationClick}>
            <img src={inboxImage} alt="inbox" />
            {notificationCount > 0 && (
              <span className={classes.badge}>{notificationCount}</span>
            )}
          </div>
          {showNotification && (
        <div className={classes.notificationContainer}>
        <div className={classes.title}>
            <span className={classes.firstTitle}>Chat</span>
        </div>
        <div className={classes.notificationsRow}>
            <img src={profileImg} className={classes.profileImg} />
            <div className={classes.parentRow}>
                <p>John Doe</p>
                <div className={classes.childRow}>
                    <span className={classes.message}>Hey, heyhedasdasd</span>
                    <span className={classes.chatDuration}>5 mins ago</span>
                </div>
            </div>
        </div>
        <div className={classes.notificationsRow}>
            <img src={profileImg} className={classes.profileImg} />
            <div className={classes.parentRow}>
                <p>John Doe</p>
                <div className={classes.childRow}>
                    <span className={classes.message}>Hey, heyhedasdasd</span>
                    <span className={classes.chatDuration}>5 mins ago</span>
                </div>
            </div>
        </div>
        <div className={classes.notificationsRow}>
            <img src={profileImg} className={classes.profileImg} />
            <div className={classes.parentRow}>
                <p>John Doe</p>
                <div className={classes.childRow}>
                    <span className={classes.message}>Hey, heyhedasdasd</span>
                    <span className={classes.chatDuration}>5 mins ago</span>
                </div>
            </div>
        </div>
        <div className={classes.notificationsRow}>
            <img src={profileImg} className={classes.profileImg} />
            <div className={classes.parentRow}>
                <p>John Doe</p>
                <div className={classes.childRow}>
                    <span className={classes.message}>Hey, heyhedasdasd</span>
                    <span className={classes.chatDuration}>5 mins ago</span>
                </div>
            </div>
        </div>
        <div className={classes.notificationsRow}>
            <img src={profileImg} className={classes.profileImg} />
            <div className={classes.parentRow}>
                <p>John Doe</p>
                <div className={classes.childRow}>
                    <span className={classes.message}>Hey, heyhedasdasd</span>
                    <span className={classes.chatDuration}>5 mins ago</span>
                </div>
            </div>
        </div>
        <div className={classes.notificationsRow}>
            <img src={profileImg} className={classes.profileImg} />
            <div className={classes.parentRow}>
                <p>John Doe</p>
                <div className={classes.childRow}>
                    <span className={classes.message}>Hey, heyhedasdasd</span>
                    <span className={classes.chatDuration}>5 mins ago</span>
                </div>
            </div>
        </div>
        <div className={classes.notificationsRow}>
            <img src={profileImg} className={classes.profileImg} />
            <div className={classes.parentRow}>
                <p>John Doe</p>
                <div className={classes.childRow}>
                    <span className={classes.message}>Hey, heyhedasdasd</span>
                    <span className={classes.chatDuration}>5 mins ago</span>
                </div>
            </div>
        </div>
    </div>
            )}
        </div>
    );
};

export default ChatNotification;