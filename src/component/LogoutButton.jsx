// LogoutButton.js
import React from 'react';

const LogoutButton = ({ setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
