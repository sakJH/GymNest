// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Chip, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth(); // Destructuring pro získání `logout` funkce

  return (
      <AppBar position="static">
        <Toolbar sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none' }}>
              GymNest
            </Typography>
            {user && (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
                  <Typography color="inherit">Vítej uživateli, {user.name}</Typography>
                  <Chip label={`Kredity: ${user.credits}`} color="secondary" sx={{ ml: 2 }} />
                </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" component={Link} to="/">Domů</Button>
            <Button color="inherit" component={Link} to="/akce">Akce</Button>
            <Button color="inherit" component={Link} to="/clenstvi">Členství</Button>
            <Button color="inherit" component={Link} to="/rozvrhy">Rozvrhy</Button>
            {!user ? (
                <Button color="inherit" component={Link} to="/login">Přihlásit</Button>
            ) : (
                <Button color="inherit" onClick={logout}>Odhlásit</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
  );
}

export default Navbar;
