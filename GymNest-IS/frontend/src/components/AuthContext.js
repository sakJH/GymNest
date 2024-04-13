// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Vytvoření kontextu
export const AuthContext = createContext();

// Hook pro použití kontextu
export const useAuth = () => useContext(AuthContext);

const apiAddress = 'http://localhost:3001/api';

// Poskytovatel kontextu
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Chyba při parsování uživatele z localStorage:', e);
      return null;
    }
  });

  const [token, setToken] = useState(localStorage.getItem('jwtToken'));

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;
      try {
        const response = await axios.get(`${apiAddress}/auth/google`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Ukládání uživatele do localStorage
      } catch (error) {
        console.error("Token verification failed:", error);
        logout(); // Odhlášení pokud verifikace selže
      }
    };

    verifyToken();
  }, [token]);

  // Funkce pro přihlášení uživatele
  const login = (newToken, newUser) => {
    localStorage.setItem('jwtToken', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  // Funkce pro odhlášení uživatele
  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
      <AuthContext.Provider value={{ user, token, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};