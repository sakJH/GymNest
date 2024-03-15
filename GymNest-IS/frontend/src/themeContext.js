import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './themes/';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    // Vytvoříme MUI motiv na základě aktuálního stavu
    const muiTheme = theme === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <MUIThemeProvider theme={muiTheme}>{children}</MUIThemeProvider>
        </ThemeContext.Provider>
    );
};

// Hook pro použití kontextu v jiných komponentách
export const useTheme = () => useContext(ThemeContext);
