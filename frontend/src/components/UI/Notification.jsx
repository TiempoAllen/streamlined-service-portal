import {React, useState, useRef, useEffect} from "react";
import bellIcon from "../../assets/bell.svg";
import closeIcon from "../../assets/close.svg";
import profileImg from "../../assets/profile.jpg";
import classes from "./Notification.module.css";

const Notification = () => {
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
            <img src={bellIcon} alt="bell" />
            {notificationCount > 0 && (
              <span className={classes.badge}>{notificationCount}</span>
            )}
          </div>
          {showNotification && (
        <div className={classes.notificationContainer}>
            <div className={classes.title}>
                <span className={classes.firstTitle}>Notification</span>
            </div>
            <div className={classes.notificationsRow}>
                <img src={profileImg} className={classes.profileImg} />
                <div className={classes.parentRow}>
                    <p>John Doe <span className={classes.accepted}>accepted</span> your request</p>
                    <div className={classes.childRow}>
                        <span>Fri 10:20 am</span>
                        <span>Aug 05, 2024</span>
                    </div>
                </div>
            </div>
            <div className={classes.notificationsRow}>
                <img src={profileImg} className={classes.profileImg} />
                <div className={classes.parentRow}>
                    <p>John Doe <span className={classes.rejected}>rejected</span> your request</p>
                    <div className={classes.childRow}>
                        <span>Fri 10:20 am</span>
                        <span>Aug 05, 2024</span>
                    </div>
                </div>
            </div>
        </div>
            )}
        </div>
    );
};

export default Notification;