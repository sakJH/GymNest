import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Vytvoření kontextu
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const apiAddress =  'http://localhost:3005/api';

// Poskytovatel kontextu
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  const [role, setRole] = useState(localStorage.getItem('userRole'));
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;
      try {
        //const response = await axios.get(`${apiAddress}/api/auth/google`, {
        const response = await axios.get(`http://localhost:3005/api/auth/google`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        setRole(response.data.role);
        localStorage.setItem('userRole', response.data.role);
      } catch (error) {
        console.error("Token verification failed:", error);
        logout()
        setErrorMessage("Vaše přihlášení vypršelo nebo je neplatné. Prosím, přihlaste se znovu.");
      }
    };

    verifyToken();
  }, [token]);

  // Funkce pro přihlášení uživatele
  const login = (newToken, newUser, newRole) => {
    localStorage.setItem('jwtToken', newToken);
    localStorage.setItem('userRole', newRole);
    setToken(newToken);
    setUser(newUser);
    setRole(newRole); // Nastavení role
  };

  // Funkce pro odhlášení uživatele
  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
    setToken(null);
    setUser(null);
    setRole(null);
    setErrorMessage('');
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout, errorMessage, setErrorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};