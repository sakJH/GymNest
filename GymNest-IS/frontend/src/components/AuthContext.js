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
  const [errorMessage, setErrorMessage] = useState('');  // Nový stav pro chybové zprávy

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;
      try {
        // Ověření tokenu na serveru - Token existuje
        const response = await axios.post(`${apiAddress}/auth/validate-token`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200 && response.data) {
          console.log('Token verification response:', response.data);
          setUser(response.data.user); // Předpokládáme, že server vrací objekt uživatele
          localStorage.setItem('user', JSON.stringify(response.data.user)); // Ukládání uživatele do localStorage
          setErrorMessage(''); // Resetování chybové zprávy pokud je verifikace úspěšná
        } else {
          throw new Error('věření tokenu selhalo: Neplatná odpověď ze serveru');
        }
      } catch (error) {
        console.error('Ověření tokenu selhalo:', error);
        setErrorMessage("Verifikace tokenu selhala"); // Nastavení chybové zprávy
        logout(); // Odhlášení pokud verifikace selže
      }
    };
    verifyToken();
  }, [token]);

  // Funkce pro přihlášení uživatele
  const login = (newToken, newUser) => {
    console.log(newToken, newUser);
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
      <AuthContext.Provider value={{ user, token, login, logout, errorMessage, setErrorMessage }}>
        {children}
      </AuthContext.Provider>
  );
};