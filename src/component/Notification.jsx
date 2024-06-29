// component/Notification.js
import React from 'react';

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = {
    color: isError ? 'red' : 'black',
    background: 'lightgrey',
    fontSize: '20px',
    border: 'solid 1px',
    borderColor: isError ? 'red' : 'black',
    padding: '10px',
    marginBottom: '10px',
  };

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
