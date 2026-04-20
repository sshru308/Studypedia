/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('studyPedia_notifications');
    if (saved) return JSON.parse(saved);
    return [];
  });

  useEffect(() => {
    localStorage.setItem('studyPedia_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification) => {
    const now = new Date();
    const newNotification = {
      id: Date.now(),
      ...notification,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      fullDateTime: now.toLocaleString(),
    };
    setNotifications([newNotification, ...notifications]);
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      deleteNotification,
      deleteAllNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};