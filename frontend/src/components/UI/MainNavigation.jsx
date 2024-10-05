import React, { useState, useEffect } from "react";
import classes from "./LoginHeader.module.css";
import cituLogo from "../../assets/citu-logo.png";
import inboxImage from "../../assets/chat.svg";
import homeIcon from "../../assets/home.svg";
import requestIcon from "../../assets/request.svg";
import bellIcon from "../../assets/bell.svg";
import { NavLink } from "react-router-dom";
import DropdownPortal from "./DropdownPortal";
import axios from "axios"; // Import axios for API requests
import * as Tabs from "@radix-ui/react-tabs";

// Helper function to calculate time difference
const timeDifference = (timestamp) => {
  const now = new Date();
  const notificationTime = new Date(timestamp);
  const diffInMs = now - notificationTime;

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
};

const MainNavigation = ({ user = {} }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]); // Store notifications
  const [notificationCount, setNotificationCount] = useState(0); // Track unread notifications
  const isAdmin = user && user.isadmin;
  const user_id = user && user.user_id;

  const fetchNotifications = async () => {
    try {
      // Fetch the user's notifications from the backend using the user_id
      const response = await axios.get(
        `http://localhost:8080/notifications/${user_id}`
      );
      console.log(response.data);

      setNotifications(response.data);
      const unreadCount = response.data.filter((n) => !n.isRead).length;
      setNotificationCount(unreadCount);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Fetch notifications when component mounts
  useEffect(() => {
    fetchNotifications();
  }, [user_id]);

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
    // Mark notifications as read when opened
    setNotificationCount(0);
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>
          <img src={cituLogo} alt="citu-logo" />
          <p>Streamlined Service Portal</p>
        </div>
        <ul className={classes.list}>
          {!isAdmin ? (
            <>
              <li>
                <NavLink
                  to={`/home/${user_id}`}
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  <img
                    src={homeIcon}
                    alt="home-icon"
                    className={classes.icon}
                  />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/home/${user_id}/request`}
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  <img
                    src={requestIcon}
                    alt="request-icon"
                    className={classes.icon}
                  />
                  Request
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
        <div className={classes.buttons}>
          <div
            className={classes.badgeContainer}
            onClick={handleNotificationClick}
          >
            <img src={bellIcon} alt="bell" />
            {notificationCount > 0 && (
              <span className={classes.badge}>{notificationCount}</span>
            )}
          </div>
          <div
            className={classes.badgeContainer}
            onClick={handleNotificationClick}
          >
            <img src={inboxImage} alt="inbox" />
            {notificationCount > 0 && (
              <span className={classes.badge}>{notificationCount}</span>
            )}
          </div>
          <DropdownPortal />
        </div>
      </header>
      {showNotification && (
        <div className={classes.bellNotification}>
          <header>
            <h3>Notifications</h3>
            <p>Mark all as Read</p>
          </header>
          <Tabs.Root defaultValue="account" className={classes.TabsRoot}>
            <Tabs.List className={classes.TabsList}>
              <Tabs.Trigger value="general" className={classes.TabsTrigger}>
                General
              </Tabs.Trigger>
              <Tabs.Trigger value="inbox" className={classes.TabsTrigger}>
                Inbox
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="inbox" className={classes.TabsContent}>
              <p>Make changes to your account.</p>
            </Tabs.Content>

            <Tabs.Content value="general" className={classes.TabsContent}>
              {notifications.length > 0 ? (
                <ul>
                  {notifications.map((notification) => (
                    <li key={notification.notification_id}>
                      <p className={classes.message}>{notification.message}</p>
                      <p>
                        {timeDifference(notification.timestamp)} •{" "}
                        {notification.isRead ? (
                          <span>Read</span>
                        ) : (
                          <span>Unread</span>
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No notifications</p>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </div>
      )}
    </>
  );
};

export default MainNavigation;
