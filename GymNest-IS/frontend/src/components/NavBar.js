// Navbar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Chip, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AuthForm from "./AuthForm";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [openAuth, setOpenAuth] = useState(false); // Kontrola otevření dialogu

  const handleAuthOpen = () => {
    setOpenAuth(true);
  };

  const handleAuthClose = () => {
    setOpenAuth(false);
  };

  return (
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none' }}>
              GymNest
            </Typography>
            {user && (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
                  <Typography color="inherit">Vítej uživateli {user.username}</Typography>
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
                <Button color="inherit" onClick={handleAuthOpen}>Přihlásit / Registrovat</Button>
            ) : (
                <Button color="inherit" onClick={logout}>Odhlásit</Button>
            )}
          </Box>
        </Toolbar>
        <AuthForm open={openAuth} onClose={handleAuthClose} />
      </AppBar>
  );
}

export default Navbar;
