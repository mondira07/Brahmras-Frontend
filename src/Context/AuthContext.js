import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { domain } from '../Config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userRole: null,
    loading: true,
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setAuthState({ isLoggedIn: false, userRole: null, loading: false });
          return;
        }

        const response = await axios.get(`${domain}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAuthState({
          isLoggedIn: true,
          userRole: response.data.accountType,
          loading: false,
        });
      } catch (error) {
        setAuthState({ isLoggedIn: false, userRole: null, loading: false });
        localStorage.removeItem("authToken");
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userData) => {
    localStorage.setItem('authToken', userData.token); // Save the token in local storage
    setAuthState({
      isLoggedIn: true,
      userRole: userData.role,
      loading: false,
    });
  };

  const logout = async () => {
    try {
      await axios.get(`${domain}/logout`, { withCredentials: true });
      localStorage.removeItem("authToken");
      setAuthState({ isLoggedIn: false, userRole: null, loading: false });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
