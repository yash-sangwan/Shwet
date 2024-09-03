// Notification.js

import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  // Automatically close the notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [onClose]);

  // Set the class based on the notification type (success, error, info)
  const getTypeClass = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-700 text-white';
    }
  };

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-4 py-2 rounded shadow-lg z-50 ${getTypeClass()}`}
    >
      {message}
    </div>
  );
};

export default Notification;
