import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const apiAddress = 'http://localhost:3001/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setUser(null); // Ensure user is null when there is no token
        return;
      }
      try {
        const response = await axios.post(`${apiAddress}/auth/validate-token`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          // Optionally fetch user details here if not part of the validation response
          console.log('Token verification response:', response.data);
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
          setErrorMessage('');
        } else {
          throw new Error('Token verification failed: Invalid server response');
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        setErrorMessage("Token verification failed");
        logout();
      }
    };
    verifyToken();
  }, [token]);

  const login = (newToken, newUser) => {
    localStorage.setItem('jwtToken', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, errorMessage, setErrorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};