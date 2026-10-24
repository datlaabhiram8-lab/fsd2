import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext(null);

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'New Task Assigned',
    message: 'Sarah assigned you "Implement OAuth 2.0 PKCE Flow"',
    type: 'assignment',
    read: false,
    timestamp: '10m ago',
    link: '/tasks',
  },
  {
    id: 'n2',
    title: 'Submission In Review',
    message: 'Your submission for "API Gateway Rate Limiting" is being evaluated',
    type: 'review',
    read: false,
    timestamp: '1h ago',
    link: '/tasks',
  },
  {
    id: 'n3',
    title: 'Upcoming Deadline',
    message: '"Database Migration Script" is due tomorrow at 5:00 PM',
    type: 'deadline',
    read: true,
    timestamp: '1d ago',
    link: '/tasks',
  },
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
