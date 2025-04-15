import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client"
import { fetchNotifications, markNotificationAsRead } from "../../redux/reducers/notificationSlice";

const socket = io("http://localhost:9080")
const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { items = [], error, loading } = useSelector((state) => state.notifications);


  console.log(items)
  // Only fetch notifications if user is available
  useEffect(() => {
    socket.connect()
    if (user?.user?.id) {
      dispatch(fetchNotifications(user?.user.id));
    }
    socket.emit("online-user", user?.user.id)
    socket.on("new-notification", (newNotif) => {
      console.log(newNotif);
      dispatch(fetchNotifications(user?.user.id))
    })
    return ()=>{
      socket.off("new-notification")
    }
  }, [user, dispatch]);


  // Handle notification click
  const handleNotificationClick = (notif) => {
    if (!notif.read) {
      dispatch(markNotificationAsRead(notif._id)); // Mark as read
    }
    navigate(`/products/${notif.productId}`); // Navigate to product detail page
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p> // Display error if any
      ) : items.length === 0 ? (
        <p className="text-gray-500">No notifications available.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((notif) => (
            <li
              key={notif._id}
              onClick={() => handleNotificationClick(notif)}
              className={`bg-white shadow-sm border hover:shadow-md transition cursor-pointer p-4 rounded ${!notif.read ? "bg-blue-100" : "bg-gray-100"
                }`} // Style for unread and read notifications
            >
              <p className="text-gray-800">{notif.message}</p>
              <span className="text-sm text-gray-500">
                {new Date(notif.createdAt).toLocaleString()}
              </span>
              {!notif.read && <span className="ml-2 text-xs text-blue-600 font-semibold">New</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;



/**
 * import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, markNotificationAsRead } from "../../redux/reducers/notificationSlice";

const Notifications = () => {
  const dispatch = useDispatch();
  const { items: notifications = [], loading, error } = useSelector((state) => state.notifications);
  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchNotifications(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (!("Notification" in window)) {
      console.warn("This browser does not support notifications.");
      return;
    }

    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.warn("Notification permission denied.");
        }
      });
    }

    notifications.forEach((notif) => {
      if (!notif.read && Notification.permission === "granted") {
        try {
          new Notification("New Notification", {
            body: notif.message,
            icon: "/notification-icon.png", // Add an icon if needed
          });
        } catch (error) {
          console.error("Error displaying notification:", error);
        }
      }
    });
  }, [notifications]);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markNotificationAsRead(notificationId));
  };

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Your Notifications</h1>
      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        notifications.map((notif) => (
          <div 
            key={notif._id} 
            className={`notification ${notif.read ? "read" : "unread"}`}
          >
            <p>{notif.message}</p>
            {!notif.read && (
              <button onClick={() => handleMarkAsRead(notif._id)}>
                Mark as Read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
 */




