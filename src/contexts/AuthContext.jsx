// AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authenticateUser } from '../services/AuthService';

// Create a context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [logoutTimer, setLogoutTimer] = useState(null);
  

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
      fetchUserInfo(storedToken);
  
      // Start the inactivity timeout when the user is authenticated
      startInactivityTimeout();
    } else {
      // The token is not present, the user is not authenticated.
      setLoggedIn(false);
    }
  }, []);
  

  const startInactivityTimeout = () => {
    // Clear any existing timeout
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    // Set a new timeout for  1 hour (3600000 milliseconds)
    const newLogoutTimer = setTimeout(() => {
      // Log the user out after inactivity
      logout();
    }, 3600000);

    // Save the timeout ID in the state
    setLogoutTimer(newLogoutTimer);
  };

  const resetInactivityTimeout = () => {
    // Reset the inactivity timeout when there is user activity
    startInactivityTimeout();
  };

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch('https://auth-server-f8cr.onrender.com/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        throw new Error('Failed to fetch user information');
      }
    } catch (error) {
      console.error('Error fetching user information:', error.message);
    }
  
    // Reset the inactivity timeout after fetching user information
    resetInactivityTimeout();
  };

  const login = async (email, password) => {
    try {
      const newToken = await authenticateUser(email, password);
      localStorage.setItem('jwtToken', newToken);
      setToken(newToken);
      setLoggedIn(true);
      fetchUserInfo(newToken);
      startInactivityTimeout();
    } catch (error) {
      console.error('Authentication failed:', error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    setLoggedIn(false);
    setUser(null);
    // Clear the inactivity timeout when logging out
    clearTimeout(logoutTimer);
    setLogoutTimer(null);
  };
  

  const contextValue = {
    isLoggedIn,
    login,
    logout,
    token,
    user,
    startInactivityTimeout, 
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};


// Custom hook to consume the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
