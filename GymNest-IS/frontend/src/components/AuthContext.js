import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Vytvoření kontextu
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Poskytovatel kontextu
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;
      try {
        const response = await axios.get('http://localhost:8080/verify-token', { //TODO endpoit pro verifikaci tokenu??
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Předpokládáme, že API vrací informace o uživateli, pokud je token platný
        setUser(response.data.user);
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem('jwtToken');
        setToken(null);
        setUser(null);
        setErrorMessage("Vaše přihlášení vypršelo nebo je neplatné. Prosím, přihlaste se znovu.");
      }
    };

    verifyToken();
  }, [token]);

  // Funkce pro přihlášení uživatele
  const login = (newToken, newUser) => {
    localStorage.setItem('jwtToken', newToken);
    setToken(newToken);
    setUser(newUser);
  };

  // Funkce pro odhlášení uživatele
  const logout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, errorMessage, setErrorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};