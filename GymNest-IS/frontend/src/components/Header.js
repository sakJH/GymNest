import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Ikona pro tmavý motiv
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Ikona pro světlý motiv
import { useTheme } from '../themeContext'; // Importujte hook

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    GymNest-IS
                </Typography>
                <IconButton onClick={toggleTheme} color="inherit">
                    {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
